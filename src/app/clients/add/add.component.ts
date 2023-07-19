import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddClientComponent implements OnInit {
  title: string | undefined;
  registrationForm:any;
  submited = false;
  brandlist:any = [];
  statelist:any = [];
  citylist:any =[];

  constructor(private router: Router, 
    private api : ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.registrationForm = this.fb.group({
      name: ["",Validators.required],
      projectType: ["",[Validators.required, ]],
      date: ["",[Validators.required]],
      state:["",[Validators.required]],
      city:["",[Validators.required]],
      approxCost:["",[Validators.required,Validators.pattern("^[0-9]+$")]],
      refNumber: ["",[Validators.required,Validators.pattern('^[0-9]+$')]],
      refBy:["",[Validators.required]],
      contactNumber:["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    this.getAllStates();
 }
get f() { return this.registrationForm.controls}

  getbrandlist() {
    this.api.fetchData('brand/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.brandlist = res['data'];
        console.log(this.brandlist);
      }else {
        this.brandlist =[]
      }
    })
  }

  getAllStates() {
    this.api.fetchData('client/getStates', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.statelist = res['data'];
      }else {
        this.statelist =[]
      }
    })
  }

  getCityByState(event:any) {
    let state_id = event.target.value;
    this.api.fetchData('client/getCities/'+state_id, {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.citylist = res['data'];
      }else {
        this.citylist =[]
      }
    })
  }

 register(){
  this.submited = true;
  if (this.registrationForm.invalid) {
    //  this.submited = false;
     return;
  }
  this.api.loader('start')

  let obj = JSON.parse(JSON.stringify(this.registrationForm.value));
  console.log(obj);
  this.api.postData('client/add',obj,'post').subscribe(res => {
    console.log(res);
    if(res['status'] == true) {
      this.api.loader('stop')
      this.submited = false;
      this.api.showNotification('success', res['message']);
      this.router.navigate(['clients']);
    }else{      
      this.api.showNotification('error', res['message']);
      this.api.loader('stop')

      // this.updateFormdata({})
      
    }
    })

 }

 onfileUpload(event:any){
 // console.log(event.target.files[0]);
 let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
 const reader = new FileReader();
 reader.readAsDataURL(event.target.files[0]);
 let type:any = event.target.files[0].type;
     // console.log(event.target.files[0])
 let filename:any = event.target.files[0].name;

     reader.onload = (event:any) => {
 
     let data =  event.target['result'];
     console.log('type',type)
     console.log('bs64',data)
     this.registrationForm.patchValue({
      documents :data,
      type:type
     })
     }
 }

}