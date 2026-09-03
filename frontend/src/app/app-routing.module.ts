import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailPreparationComponent } from './components/mail-preparation/mail-preparation.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReportComponent } from './components/report/report.component';
import { TargetBaseComponent } from './components/target-base/target-base.component';
import { MarketingShellComponent } from './components/marketing/marketing-shell/marketing-shell.component';
import { PricingComponent } from './components/marketing/pricing/pricing.component';
import { SeoLandingPageComponent } from './components/marketing/seo-landing-page/seo-landing-page.component';
import { ComparisonPageComponent } from './components/marketing/comparison-page/comparison-page.component';
import { FaqComponent } from './components/marketing/faq/faq.component';
import { BlogListComponent } from './components/marketing/blog-list/blog-list.component';
import { BlogPostComponent } from './components/marketing/blog-post/blog-post.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { DashboardComponent } from './components/app-shell/dashboard/dashboard.component';
import { SettingsComponent } from './components/app-shell/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LANDING_PAGES } from './content/landing-pages.data';

const landingPageRoutes: Routes = LANDING_PAGES.map((page) => ({
  path: page.slug,
  component: SeoLandingPageComponent,
  data: { slug: page.slug },
}));

const routes: Routes = [
  {
    path: '',
    component: MarketingShellComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'blog', component: BlogListComponent },
      { path: 'blog/:slug', component: BlogPostComponent },
      { path: 'compare/:competitor', component: ComparisonPageComponent },
      ...landingPageRoutes,
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'app',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contacts', component: TargetBaseComponent },
      { path: 'campaigns', component: MailPreparationComponent },
      { path: 'analytics', component: ReportComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  // Legacy paths kept as redirects so old bookmarks/links still resolve.
  { path: 'main', redirectTo: '', pathMatch: 'full' },
  { path: 'email', redirectTo: 'app/campaigns', pathMatch: 'full' },
  { path: 'send-email', redirectTo: 'app/campaigns', pathMatch: 'full' },
  { path: 'report', redirectTo: 'app/analytics', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
