import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ManagecatComponent } from './managecat/managecat.component';
import { ProductsComponent } from './products/products.component';
import { ManagesubcatComponent } from './managesubcat/managesubcat.component';
import { AdminComponent } from './admin/admin.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { AccountComponent } from './account/account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressdetailsComponent } from './addressdetails/addressdetails.component';
import { SelectaddressComponent } from './selectaddress/selectaddress.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
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
// import { homedir } from 'os';

const routes: Routes = [
  // {
  //   path:"",
  //   redirectTo:"sitehome",
  //   PathMatch:"full"
  // },

  {
    path:"errorpage",
    component:ErrorpageComponent
  },
  {
    path:"",
    redirectTo:"sitehome",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"sellerorders",
    component:SellerordersComponent
  },
  {
    path:"faqs",
    component:FaqsComponent
  },
  {
    path:"contactus",
    component:ContactusComponent
  },
  {
    path:"feedback",
    component:FeedbackComponent
  },
  {
    path:"aboutus",
    component:AboutusComponent
  },
  {
    path:"offers",
    component:OffersComponent
  },
  {
    path:"trendingproducts",
    component:TrendingproductsComponent
  },
  {
    path:"errorpage",
    component:ErrorpageComponent
  },
  {
    path:"allproducts",
    component:AllproductsComponent
  },
  {
    path:"account",
    component:AccountComponent
  },
  {
    path:"addresses",
    component:AddressesComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"sitehome",
    component:HomeComponent
  },
  {
    path:"selectaddress",
    component:SelectaddressComponent
  },
  {
    path:"orderdetails",
    component:OrderdetailsComponent
  },
  {
    path:"searchuser",
    component:SearchuserComponent
  },
  {
    path:"memberlist",
    component:MemberlistComponent
  },
  
  {
    path:"changepassword",
    component:ChangepasswordComponent
  },
  {
    path:"managecat",
    component:ManagecatComponent
  },
{
  path:"managesubcat",
  component:ManagesubcatComponent
},
{
  path:"manageproducts",
  component:ProductsComponent
},
{
  path:"adminhome",
  component:AdminComponent
},
{
  path:"ordersummary",
  component:OrdersummaryComponent
},
{
  path:"orderhistory",
  component:OrderhistoryComponent
},
{
  path:"showcat",
  component:ShowcatComponent
},
{
  path:"showsubcat",
  component:ShowsubcatComponent
},
{
  path:"showproducts",
  component:ShowproductComponent
},
{
  path:"productdetails",
  component:ProductdetailsComponent
},
{
  path:"cart",
  component:CartComponent
},
{
  path:"addressdetails",
  component:AddressdetailsComponent
},
{
  path:"checkout",
  component:CheckoutComponent
},
{
  path:"mostsellingproducts",
  component:MostsellingproductsComponent
},
{
  path:"lowstock",
  component:LowstockComponent
},
{
  path:"selleroffers",
  component:SelleroffersComponent
},

{
  path:"**",
  redirectTo:"errorpage",
  pathMatch:"full"

}
];
//for navigate to same url but from different id like in footer component fashion and electronics are of same component
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
