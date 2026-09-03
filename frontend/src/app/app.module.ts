import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxEditorModule } from 'ngx-editor';
import { NgxSpinnerModule } from "ngx-spinner";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MailPreparationComponent } from './components/mail-preparation/mail-preparation.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidationDialogComponent } from './dialogs/validation-dialog/validation-dialog.component';
import { SwitcherComponent } from './components/elements/switcher/switcher.component';
import { ClipComponent } from './components/elements/clip/clip.component';
import { CloseButtonComponent } from './components/elements/close-button/close-button.component';
import { ProgressBarComponent } from './components/elements/progress-bar/progress-bar.component';
import { ReportComponent } from './components/report/report.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportChartComponent } from './components/report-chart/report-chart.component';
import { TargetBaseComponent } from './components/target-base/target-base.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { DashboardComponent } from './components/app-shell/dashboard/dashboard.component';
import { SettingsComponent } from './components/app-shell/settings/settings.component';
import { MarketingShellComponent } from './components/marketing/marketing-shell/marketing-shell.component';
import { PricingComponent } from './components/marketing/pricing/pricing.component';
import { SeoLandingPageComponent } from './components/marketing/seo-landing-page/seo-landing-page.component';
import { ComparisonPageComponent } from './components/marketing/comparison-page/comparison-page.component';
import { FaqComponent } from './components/marketing/faq/faq.component';
import { BlogListComponent } from './components/marketing/blog-list/blog-list.component';
import { BlogPostComponent } from './components/marketing/blog-post/blog-post.component';

import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { AuthService } from './services/auth.service';

function initializeAuth(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    MailPreparationComponent,
    MainPageComponent,
    ValidationDialogComponent,
    SwitcherComponent,
    ClipComponent,
    CloseButtonComponent,
    ProgressBarComponent,
    ReportComponent,
    ReportTableComponent,
    ReportChartComponent,
    TargetBaseComponent,
    LoginComponent,
    RegisterComponent,
    AppShellComponent,
    DashboardComponent,
    SettingsComponent,
    MarketingShellComponent,
    PricingComponent,
    SeoLandingPageComponent,
    ComparisonPageComponent,
    FaqComponent,
    BlogListComponent,
    BlogPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule,
    TextFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    DragDropModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
