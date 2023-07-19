import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  title: string | undefined;
  // userlist:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  clientList:any = [];
  selectedClient:any;
  bulkUpload:any;
  showerror:boolean = false;
  // persons: Person[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private route: ActivatedRoute,private api: ApiService, private router:Router) { }

 
  ngOnInit(): void {
    this.title = 'Client List';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true
    };
    this.getClientList()
  }
  getClientList() {
    this.api.fetchData('client/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  ==1 ) {
        this.clientList = res['data'];
        this.dtTrigger.next(null);
      }else {
        this.clientList =[]
      }
    })
  }

  deleteclientList(id:any) {
      this.api.deleteData('client/remove/'+id, {}, "DELETE").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.userlist = res['data'];
          this.getClientList();
          this.api.showNotification('success','Client deleted successfully.')
          document.getElementById('close-user')?.click();
        }else {
          // this.userlist
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
