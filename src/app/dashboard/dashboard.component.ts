import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bardata:any;
  graph:any;
  constructor(@Inject(DOCUMENT) private document: Document,
  private route: ActivatedRoute,
  private router: Router, 
  private api : ApiService, private fb: FormBuilder) {
   // this.getbardata()
    //this.getGraph()
  }

  ngOnInit(): void {
    //this.document.body.classList.add('test');
  }

}
