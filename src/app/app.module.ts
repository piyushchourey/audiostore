import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { TextTransformPipe } from './custom-pipes/text-transform.pipe';
import { DecimalHandlerPipe } from './custom-pipes/decimal-handler.pipe';
import { ScriptService } from './_services/scriptService';
import { NotifierModule,NotifierOptions } from 'angular-notifier';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { UserlistComponent } from './registration/userlist/userlist.component';
// import { Select2Module } from 'ng2-select2';

import { RouteReuseStrategy  } from '@angular/router';
import {CustomRouteReuseStrategy}from './routerstatragi';
import { BrandsComponent } from './brands/brands.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add/add.component';
import { RateCalculationComponent } from './rate-calculation/rate-calculation.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    TextTransformPipe,
    DecimalHandlerPipe,
    UserlistComponent,
    BrandsComponent,
    ClientsComponent,
    AddClientComponent,
    RateCalculationComponent,
    CategoryComponent,
    SubcategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxUiLoaderModule,
    DataTablesModule,
    NgSelectModule,
    CKEditorModule
    // NgSelect2Module
    // Select2Module
  ],
  providers: [
    ScriptService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
