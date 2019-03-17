import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialExportsModule } from '../material-exports/material-exports.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialExportsModule,
    FormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  entryComponents: [
    SignInComponent,
    SignUpComponent
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class SharedComponentsModule { }
