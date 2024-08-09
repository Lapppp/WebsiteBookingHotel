import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

// Components
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {CommentComponent} from "./comment/comment.component";
// Modules
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {HotelModule} from './hotel/hotel.module';
import {LoginModule} from './login/login.module';
import {PayModule} from './pay/pay.module'; // Import PayModule
// Services
import {AuthService} from './services/auth.service';

// Interceptors
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {CommentModule} from "./comment/comment.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ResetpasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ToastrModule.forRoot(),
    ToastrModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    HotelModule,
    LoginModule,
    PayModule,



    CommentModule,
    NgbModule,

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
