import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  title: string | undefined;
  registrationForm:any;
  CategoryList:any = [];
  SubCategoryList:any = [];
  submited = false;
  brandlist:any = [];
  modelNumberList:any = [];
  unitlist:any = [];
  isGSTFlag:any = false;
  filename1:any="";
  filename2:any="";
  public Editor = ClassicEditor;
  filename3: any;
  productId: any;
  productData: any;

  constructor(private router: Router, 
    private api : ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.productId = this.route.snapshot.params['id'];
    this.registrationForm = this.fb.group({
      brandId: [null,Validators.required],
      categoryId: [null,[Validators.required ]],
      subcategoryId: [null,[Validators.required]],
      modelNumber:["",[Validators.required]],
      description:["",[Validators.required]],
      itemRemark: ["",Validators.required],
      productUSP:[""],
      OEMcriteria:[""],
      unit: ["",Validators.required],
      mrpPrice:["",[Validators.required]],
      isGST:["",[Validators.required]],
      GSTAmount:[""],
      landing: ["",Validators.required],
      make1: [null,Validators.required],
      make2: [null,Validators.required],
      make3: [null,Validators.required],
      make4: [null,Validators.required],
      modelNumber_ref1:[null],
      modelNumber_ref2:[null],
      modelNumber_ref3:[null],
      modelNumber_ref4:[null],
      documents:[""],
      bannerImg:[""],
      document_data:[""],
      pdfFile:[""],
      pdf_data:[""],
      type:[""],
      productId:[""],
    });
    this.getbrandlist();
    this.getCategoryList();
    this.getSubCategoryList();
    this.getunitsMeasurment();
    this.getAllModelNumber();
    if(this.productId){
      this.getEditProductData();
    }
 }
get f() { return this.registrationForm.controls}

  getAllModelNumber(){
    this.api.fetchData('brand/getAllModelNumber', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.modelNumberList = res['data'];
      }else {
        this.modelNumberList =[]
      }
    })
  }

  getbrandlist() {
    this.api.fetchData('brand/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.brandlist = res['data'];
      }else {
        this.brandlist =[]
      }
    })
  }

  getCategoryList() {
    this.api.fetchData('category/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.CategoryList = res['data'];
      }else {
        this.CategoryList =[]
      }
    })
  }

  getEditProductData() {
    if (this.productId) {
      // edit mode
      this.title = 'Edit Product';
      this.api.fetchData('product/getAll/'+this.productId, {}, "Get").subscribe((res:any) => {
        if(res['status']  == true ) {
          this.productData = res['data'][0];
          this.registrationForm.get('brandId').setValue(this.productData.brandId);
          this.registrationForm.get('brandId').setValue(this.productData.brandId);
          this.registrationForm.get('categoryId').setValue(this.productData.categoryId);
          this.registrationForm.get('subcategoryId').setValue(this.productData.subcategoryId);
          this.registrationForm.get('modelNumber').setValue(this.productData.modelNumber);
          this.registrationForm.get('description').setValue(this.productData.description);
          this.registrationForm.get('itemRemark').setValue(this.productData.itemRemark);
          this.registrationForm.get('productUSP').setValue(this.productData.productUSP);
          this.registrationForm.get('OEMcriteria').setValue(this.productData.OEMcriteria);
          this.registrationForm.get('unit').setValue(this.productData.unit);
          this.registrationForm.get('mrpPrice').setValue(this.productData.mrpPrice);
          this.registrationForm.get('isGST').setValue(this.productData.isGST);
          this.registrationForm.get('GSTAmount').setValue(this.productData.GSTAmount);
          this.registrationForm.get('landing').setValue(this.productData.landing);
          this.registrationForm.get('make1').setValue(+this.productData.make1);
          this.registrationForm.get('make2').setValue(+this.productData.make2);
          this.registrationForm.get('make3').setValue(+this.productData.make3);
          this.registrationForm.get('make4').setValue(+this.productData.make4);
          this.registrationForm.get('modelNumber_ref1').setValue(this.productData.modelNumber_ref1);
          this.registrationForm.get('modelNumber_ref2').setValue(this.productData.modelNumber_ref2);
          this.registrationForm.get('modelNumber_ref3').setValue(this.productData.modelNumber_ref3);
          this.registrationForm.get('modelNumber_ref4').setValue(this.productData.modelNumber_ref4);
          this.filename1= this.productData.documents;
          this.filename2= this.productData.pdfFile;
          this.filename3= this.productData.bannerImg;
          this.registrationForm.get('productId').setValue(this.productData.id);
        }else {
          this.productData =[]
        }
      })
  }
  }

  changeCategoryEvent($event:any){
    console.log($event);
    this.getSubCategoryList($event.id);
  }

  getSubCategoryList(id:any = 0) {
    let url = 'subcategory/getAll';
    if(id > 0){
      url+='/'+id; 
    }
    this.api.fetchData(url, {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.SubCategoryList = res['data'];
        console.log(this.SubCategoryList);
      }else {
        this.SubCategoryList =[]
      }
    })
  }

  getunitsMeasurment(){
    this.api.fetchData('brand/getAllUnits', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.unitlist = res['data'];
      }else {
        this.unitlist =[]
      }
    })
  }

  register(){
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.invalid);
    this.submited = true;
    if (this.registrationForm.invalid) {
      //  this.submited = false;
      return;
    }
    this.api.loader('start')

    let obj = JSON.parse(JSON.stringify(this.registrationForm.value));
    delete obj['document_data']; delete obj['pdf_data'];
    delete obj['type'];
    //  obj['role'] = 'admin';
    //  obj['mobile_number'] = parseInt(obj['mobile_number']);
    //  obj['aadhar_number'] = parseInt(obj['aadhar_number']);
    this.api.postData('product/add',obj,'post').subscribe(res => {
      if(res['status'] == 1) {
        this.api.loader('stop')
        this.submited = false;
        this.api.showNotification('success', res['message']);
        this.router.navigate(['products'])
      }else{      
        this.api.showNotification('error', res['message']);
        this.api.loader('stop')

        // this.updateFormdata({})
        
      }
    })

  }

  onfileUpload(event:any,filedName:string){
  // console.log(event.target.files[0]);
  let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  let type:any = event.target.files[0].type;
    // console.log(event.target.files[0])
    if(filedName=="bannerImg"){
      this.filename2 = event.target.files[0].name;
      reader.onload = (event:any) => {
        let data =  event.target['result'];
        this.registrationForm.patchValue({
          bannerImg :data,
          type:type
        })
      }
    }
    else{
      this.filename1 = event.target.files[0].name;
      reader.onload = (event:any) => {
        let data =  event.target['result'];
        this.registrationForm.patchValue({
          documents :data,
          type:type
        })
      }
    }
      
    
    
  }

  onpdffileUpload(event:any){
    let regex  =new RegExp('^.*\.(pdf)$')
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let type:any = event.target.files[0].type;
        // console.log(event.target.files[0])
    this.filename3 = event.target.files[0].name;
    reader.onload = (event:any) => {
      let data =  event.target['result'];
        this.registrationForm.patchValue({
          pdfFile :data,
          type:type
        })
      }
  }

  onGSTChange(event:any){
    if(event.target.value == "yes"){
      this.isGSTFlag = true;
    }else{
      this.isGSTFlag = false;
    }
  }

  onDescriptionEditorChange({  editor }: any, fieldname:string ) {
    let descriptionData = editor.getData();
    this.registrationForm.get(fieldname).setValue(descriptionData);
    // this.registrationForm.description.setValue(data);
    console.log( this.registrationForm.value );
}

onRemarkChange({  editor }: any ) {
  let itemRemarkData = editor.getData();
  this.registrationForm.get('itemRemark').setValue(itemRemarkData);
  console.log( this.registrationForm.value );
}

}
