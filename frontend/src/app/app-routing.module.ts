import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailPreparationComponent } from './components/mail-preparation/mail-preparation.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'main', component: MainPageComponent
  },
  {
    path: 'email', 
    component: MailPreparationComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'report', component: ReportComponent
  },
  {
    path: 'send-email', 
    component: MailPreparationComponent,
    //canActivate: [AuthGuardService],
  },
  { path: '',   redirectTo: 'main', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: MainPageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
