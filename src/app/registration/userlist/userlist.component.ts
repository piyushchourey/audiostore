import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  title: string | undefined;
  // userlist:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  productlist:any = [];
  selectedUser:any;
  bulkUpload:any;
  showerror:boolean = false;

  // persons: Person[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productDetails: any = {};
  constructor(private route: ActivatedRoute,private api: ApiService, private router:Router) { }

 
  ngOnInit(): void {
    // this.title = this.route.snapshot.url[0].path;
    this.title = 'Product List';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true
    };
    this.getProductList();
  }
  
  getProductList() {
    this.api.fetchData('product/getAll', {}, "Get").subscribe((res:any) => {
      console.log( res['data']);
      if(res['status']  == true ) {
        // this.dtOptions.destroy();
        this.productlist = res['data'];
        console.log( this.productlist);
        this.dtTrigger.next(void 0);
      }else {
        this.productlist =[]
      }
    })
  }

  viewuserlist(id:any) {

  }

  deleteproductlist(id:any) {
      this.api.deleteData('product/remove/'+id, {}, "DELETE").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.userlist = res['data'];
          this.getProductList()
          this.api.showNotification('success','user deleted successfully.')
          document.getElementById('close-user')?.click();
        }else {
          // this.userlist
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

  // edituserlist(id:any) {
  //   let url = 'resi/view/'+id;
  //   this.router.navigate([url]);
  // }
  Onselectfile(event:any) {
    // console.log(event.target.files[0]);
    let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let type:any = event.target.files[0].type;
        // console.log(event.target.files[0])
    let filename:any = event.target.files[0].name;
    //  let file:any = event.target.files[0];
    this.bulkUpload =  event.target.files[0];
  }
   
  onsubmitBulkUpload(){
       if(!this.bulkUpload) {
         this.showerror = true
       }
       const formData: FormData = new FormData();
       
       console.log( this.bulkUpload)
       formData.append('importFile', this.bulkUpload);
       this.api.loader('start')
       
       this.api.postData('product/import',formData,"POST").subscribe(res => {
         if(res['status'] == true) {
           this.api.loader('stop')
           
           this.api.showNotification('success', res['message']);
           this.showerror = false;
           this.bulkUpload = undefined;
         }else {
           this.api.showNotification('error', res['message']);
           this.api.loader('stop')
           this.showerror = false;
         }
       })
  }

  viewDetails(product:any) {
    this.productDetails = product;
    console.log(this.productDetails)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
