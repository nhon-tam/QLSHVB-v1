import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraCuuComponent } from './tra-cuu/tra-cuu.component';
import { TraCuuRoutingModule } from './tra-cuu-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TraCuuComponent],
  imports: [
    TraCuuRoutingModule,
    CommonModule,
    NgSelect2Module,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class TraCuuModule { }
