import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ErrorHandlingService, JwtService, CurrentUserInitializingService } from './services';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './interceptors';
import { AdminGuard } from './guards/admin.guard';

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
        AdminGuard,
        CurrentUserInitializingService,
        { provide: Window, useValue: window },
        {
           provide: HTTP_INTERCEPTORS,
           useClass: TokenInterceptor,
           multi: true
        },
        { 
          provide: APP_INITIALIZER, 
          useFactory: loadCurrentUser, 
          deps: [CurrentUserInitializingService], 
          multi: true 
        } 
      ]
    }
  }
}

function loadCurrentUser(currentUserService: CurrentUserInitializingService): () => Promise<boolean> {
  return () => currentUserService.loadCurrentUser();
}
