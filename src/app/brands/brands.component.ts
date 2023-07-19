import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  form: any;
  title: string | undefined;
  brandlist:any = [];
  loading = false;
  submitted = false;
  isModalOpen: boolean = false;
  selectedBrand:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = 'Brand List';
    this.getbrandlist();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true
    };
  }

  get f() { return this.form.controls; }

  getbrandlist() {

    this.api.fetchData('brand/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.brandlist = res['data'];
        this.dtTrigger.next(void 0);
      }else {
        this.brandlist =[]
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
  
    this.loading = true;
    this.api.postData('brand/add',{name: this.f.name.value},'post').subscribe(res => {
      if(res['status'] == true) {
        this.api.loader('stop')
        this.submitted = false;
        this.api.showNotification('success', res['message']);
        this.isModalOpen = false;
        document.getElementById('close-brand')?.click();
        window.location.reload();
      }else{      
        this.api.showNotification('error', res['message']);
        this.api.loader('stop')
      }
    })
  }

  deleteBrand(id:any) {
    this.api.deleteData('brand/remove/'+id, {}, "DELETE").subscribe((res:any) => {
      if(res['status'] == true) {
        this.getbrandlist()
        this.api.showNotification('success','Brand deleted successfully.');
        document.getElementById('close-user')?.click();
      }else {
        // this.userlist
        this.api.showNotification('error',res['message'])
      }
    })
  
}

  openModal() {
    console.log('sdsfd344')
    this.isModalOpen = true;
    console.log(this.isModalOpen)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
