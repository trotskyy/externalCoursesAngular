import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { MaterialExportsModule } from '../material-exports/material-exports.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialExportsModule
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class AuthModule { }
