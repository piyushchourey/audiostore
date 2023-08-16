import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {
  form: any;
  title: string | undefined;
  CategoryList:any = [];
  SubCategoryList:any = [];
  loading = false;
  submitted = false;
  isModalOpen: boolean = false;
  selectedCategory:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = 'Sub Category List';
    this.getCategoryList();
    this.getSubCategoryList();
    this.form = this.formBuilder.group({
      categoryId: [null, [Validators.required]],
      name: ['', [Validators.required]]
    });

   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true
    };
  }

  get f() { return this.form.controls; }

  getCategoryList() {
    this.api.fetchData('category/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.CategoryList = res['data'];
      }else {
        this.CategoryList =[]
      }
    })
  }

  getSubCategoryList() {
    this.api.fetchData('subcategory/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.SubCategoryList = res['data'];
        console.log(this.SubCategoryList)
        this.dtTrigger.next(void 0);
      }else {
        this.SubCategoryList =[]
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) { return; }
  
    this.loading = true;
    this.api.postData('subcategory/add',{name: this.f.name.value,categoryId: this.f.categoryId.value},'post').subscribe((res) => {
      if(res['status']) {
        this.api.loader('stop')
        this.submitted = false;
        this.api.showNotification('success', res['message']);
        this.isModalOpen = false;
        document.getElementById('close-brand')?.click();
        window.location.reload();
      }else{      
        this.api.showNotification('error', res.message);
        this.api.loader('stop');
      }
    },
    (error) => {
      this.api.showNotification('error', error.message);
      this.api.loader('stop');
    })
  }

  deleteSubCategory(id:any) {
    this.api.deleteData('subcategory/remove/'+id, {}, "DELETE").subscribe((res:any) => {
      if(res['status'] == true) {
        this.getSubCategoryList()
        this.api.showNotification('success','Sub Category deleted successfully.');
        document.getElementById('close-user')?.click();
      }else {
        // this.userlist
        this.api.showNotification('error',res['message'])
      }
    })
  
}

  openModal() {
    this.isModalOpen = true;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}