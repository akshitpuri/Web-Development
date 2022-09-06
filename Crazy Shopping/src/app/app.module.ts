import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import{FormsModule} from '@angular/forms'
import{HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminComponent } from './admin/admin.component';
import { ManagecatComponent } from './managecat/managecat.component';
import { ProductsComponent } from './products/products.component';
import { ManagesubcatComponent } from './managesubcat/managesubcat.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { AccountComponent } from './account/account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressdetailsComponent } from './addressdetails/addressdetails.component';
import { SelectaddressComponent } from './selectaddress/selectaddress.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { SellerheaderComponent } from './sellerheader/sellerheader.component';
import { SellerordersComponent } from './sellerorders/sellerorders.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OffersComponent } from './offers/offers.component';
import { TrendingproductsComponent } from './trendingproducts/trendingproducts.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { MostsellingproductsComponent } from './mostsellingproducts/mostsellingproducts.component';
import { LowstockComponent } from './lowstock/lowstock.component';
import { SelleroffersComponent } from './selleroffers/selleroffers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    MemberlistComponent,
    SearchuserComponent,
    LogoutComponent,
    ChangepasswordComponent,
    AdminComponent,
    ManagecatComponent,
    ProductsComponent,
    ManagesubcatComponent,
    ShowcatComponent,
    ShowsubcatComponent,
    ShowproductComponent,
    ProductdetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrderhistoryComponent,
    OrdersummaryComponent,
    AllproductsComponent,
    AccountComponent,
    AddressesComponent,
    AddressdetailsComponent,
    SelectaddressComponent,
    OrderdetailsComponent,
    AdminheaderComponent,
    SellerheaderComponent,
    SellerordersComponent,
    FaqsComponent,
    ContactusComponent,
    FeedbackComponent,
    AboutusComponent,
    OffersComponent,
    TrendingproductsComponent,
    ErrorpageComponent,
    MostsellingproductsComponent,
    LowstockComponent,
    SelleroffersComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
