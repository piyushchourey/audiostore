import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-rate-calculation',
  templateUrl: './rate-calculation.component.html',
  styleUrls: ['./rate-calculation.component.css']
})
export class RateCalculationComponent implements OnInit {
  title: string | undefined;
  rateCalculationForm: any;
  submitted:boolean = false;
  clientList:any = [];
  productList:any = [];
  staticProductRateListByIndex: any = [];
  tabActiveStatus:number = 1;
  step2RAProductsListArr :any = [];
  loading = false;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = "Rate Calculation"
    this.rateCalculationForm = this.formBuilder.group({
      isRARequired:['', [Validators.required]],
      clientName: ['', [Validators.required]],
      totalPrice: [''],
      productsArr: this.formBuilder.array([]) ,
    });
    this.getClients();
    this.getproductList("");
  } 

  products() : FormArray {
    return this.rateCalculationForm.get("productsArr") as FormArray
  }

  newProducts(): FormGroup {
    return this.formBuilder.group({
      product: this.productList,
      description:'',
      uom: '',
      qty:1,
      rate:'',
      mark_plus: 0,
      mark_minus:0,
      total_price:0,
    });
  }

  addProducts() {
    this.submitted = true;
    this.products().push(this.newProducts());
  }
   
  removeProducts(i:number) {
    console.log('test2')

    this.submitted = this.products().length <=1 ? false : true;
    this.products().removeAt(i);
  }

  getClients() {
    this.api.fetchData('client/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  ==true ) {
        this.clientList = res['data'];
        console.log(this.clientList);
      }else {
        this.clientList =[]
      }
    })
  }

  getproductList(productId:any){
    let url = 'product/getAll';
    if(productId){
      url+='/'+productId;
    }
    this.api.fetchData(url, {}, "Get").subscribe((res:any) => {
      if(res['status']  ==true ) {
        if(productId){
          return res['data'];
        }else{
          this.productList = res['data'];
        }
      }else {
        this.productList =[]
      }
    })
  }

  onProductChange(selectedProduct: any,row:number){
    // let productMetaData = this.getproductList(selectedProduct);
    console.log(selectedProduct.id);
    let url = 'product/getAll';
    if(selectedProduct){
      url+='/'+selectedProduct.id;
      this.api.fetchData(url, {}, "Get").subscribe((res:any) => {
        if(res['status']  ==true ) {
          if (typeof this.staticProductRateListByIndex[row] !== 'undefined') {
            this.staticProductRateListByIndex[row].rate = res['data'][0].mrpPrice;
          }
          else {
            this.staticProductRateListByIndex.push({ row: 'row_'+row, rate:res['data'][0].mrpPrice});
          }
          
          const myForm = (<FormArray>this.rateCalculationForm.get("productsArr")).at(row);
          myForm.patchValue({
            uom :  res['data'][0].unit,
            rate: res['data'][0].mrpPrice,
            total_price: myForm.value.qty * res['data'][0].mrpPrice,
            description: res['data'][0].description
          });
        }else {
        }
      })
    }
    return false;
  }

  onQtyChange(event:any,index:number){
    const myForm = (<FormArray>this.rateCalculationForm.get("productsArr")).at(index);
    // console.log(this.staticProductRateListByIndex[index].rate)
    // console.log(myForm)
    let total_price;
    if(myForm.value.mark_plus > 0)
      total_price = ((parseFloat(this.staticProductRateListByIndex[index].rate) + (((parseFloat(this.staticProductRateListByIndex[index].rate)*parseInt(myForm.value.mark_plus)))/100)) *  myForm.value.qty );
    else if(myForm.value.mark_minus > 0)
      total_price = ((parseFloat(this.staticProductRateListByIndex[index].rate) - (((parseFloat(this.staticProductRateListByIndex[index].rate)*parseInt(myForm.value.mark_minus)))/100)) *  myForm.value.qty )
    else
    total_price = (+this.staticProductRateListByIndex[index].rate *  +myForm.value.qty ).toFixed(2);

    console.log(total_price)
    myForm.patchValue({
      total_price: total_price
    });
  }

  onMarkChange(event:any,index:number,type:any){
    const myForm = (<FormArray>this.rateCalculationForm.get("productsArr")).at(index);
    if(isNaN((parseInt(event.target.value))))
      event.target.value = 0;
    
    let total_price:any;
    if(type=='plus')
      total_price  = ((parseFloat(myForm.value.rate) + (((parseFloat(myForm.value.rate)*parseInt(event.target.value)))/100)) * parseInt(myForm.value.qty));
    else 
      total_price  = ((parseFloat(myForm.value.rate) - (((parseFloat(myForm.value.rate)*parseInt(event.target.value)))/100)) * parseInt(myForm.value.qty));

    myForm.patchValue({
      total_price: parseFloat(total_price).toFixed(2)
    });
  }

  totalPrice() {
    const myForm = (<FormArray>this.rateCalculationForm.get("productsArr"));
    let total :any = 0;
    for(let data of myForm.value){
      total += parseFloat(data.total_price);
    }
    return parseFloat(total).toFixed(2);
  }

  onSubmit() {
    let totalAmount = this.rateCalculationForm.value.productsArr.reduce((n: any, {total_price}: any) => n + parseFloat(total_price), 0);
    this.rateCalculationForm.value.totalPrice = parseFloat(totalAmount).toFixed(2);
    console.log(this.rateCalculationForm.value);
    this.api.postData('ratecalculation/add',this.rateCalculationForm.value,'post').subscribe(res => {
      if(res['status'] == true) { 
        this.api.loader('stop')
        this.api.showNotification('success', res['message']);
        this.tabActiveStatus = 2;
        this.step2RAProductsListArr = res['data'];
      }else{      
        this.api.showNotification('error', res['message']);
        this.api.loader('stop')
      }
      })
  }

  exportStep2() {
    console.log(this.step2RAProductsListArr);
    this.loading = true;
    this.api.postData('ratecalculation/excelExport',this.step2RAProductsListArr,'post').subscribe(res => {
      if(res['status'] == true) {
        console.log(res['path']);
        this.api.loader('stop')
        this.api.showNotification('success','RA & Schedule Excel file genrated.');
        setTimeout(() => {
          window.open(res['path'],'_blank');
        }, 1000);
        // this.tabActiveStatus = 2;
        // this.step2RAProductsListArr = res['data'];
      }else{      
        // this.api.showNotification('error', res['message']);
        // this.api.loader('stop')
      }
      })
  }
}
