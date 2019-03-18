import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ErrorHandlingService, JwtService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        AuthService,
        ErrorHandlingService,
        JwtService,
        { provide: Window, useValue: window }
      ]
    }
  }
}
