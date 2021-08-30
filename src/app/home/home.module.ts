import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home.routing";
import { IndexComponent } from './index/index.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class HomeModule { }
