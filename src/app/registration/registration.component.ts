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
  submited = false;
  brandlist:any = [];
  unitlist:any = [];
  isGSTFlag:any = false;
  public Editor = ClassicEditor;

  constructor(private router: Router, 
    private api : ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.registrationForm = this.fb.group({
      brandId: ["",Validators.required],
      category: ["",[Validators.required, ]],
      subcategory: ["",[Validators.required]],
      modelNumber:["",[Validators.required]],
      description:["",[Validators.required]],
      itemRemark: ["",Validators.required],
      unit: ["",Validators.required],
      mrpPrice:["",[Validators.required]],
      isGST:["",[Validators.required,]],
      GSTAmount:[""],
      landing: ["",Validators.required],
      make1: ["",Validators.required],
      make2: ["",Validators.required],
      make3: ["",Validators.required],
      make4: ["",Validators.required],
      documents:["",[Validators.required]],
      document_data:["",[Validators.required]],
      pdfFile:["",[Validators.required]],
      pdf_data:["",[Validators.required]],
      type:[""],
    });
    this.getbrandlist();
    this.getunitsMeasurment();
 }
get f() { return this.registrationForm.controls}

  getbrandlist() {
    this.api.fetchData('brand/getAll', {}, "Get").subscribe((res:any) => {
      if(res['status']  == true ) {
        this.brandlist = res['data'];
      }else {
        this.brandlist =[]
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
      this.registrationForm.patchValue({
        documents :data,
        type:type
      })
      }
  }

  onpdffileUpload(event:any){
    let regex  =new RegExp('^.*\.(pdf)$')
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let type:any = event.target.files[0].type;
        // console.log(event.target.files[0])
    let filename:any = event.target.files[0].name;
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

  onDescriptionEditorChange({  editor }: any ) {
    let descriptionData = editor.getData();
    this.registrationForm.get('description').setValue(descriptionData);
    // this.registrationForm.description.setValue(data);
    console.log( this.registrationForm.value );
}

onRemarkChange({  editor }: any ) {
  let itemRemarkData = editor.getData();
  this.registrationForm.get('itemRemark').setValue(itemRemarkData);
  console.log( this.registrationForm.value );
}

}
