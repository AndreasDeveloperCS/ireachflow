import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
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
import { AuthenticationDialogComponent } from './dialogs/authentication-dialog/authentication-dialog.component';
import { SwitcherComponent } from './components/elements/switcher/switcher.component';
import { ClipComponent } from './components/elements/clip/clip.component';
import { CloseButtonComponent } from './components/elements/close-button/close-button.component';
import { ProgressBarComponent } from './components/elements/progress-bar/progress-bar.component';
import { ReportComponent } from './components/report/report.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportChartComponent } from './components/report-chart/report-chart.component';
import { TargetBaseComponent } from './components/target-base/target-base.component';


@NgModule({
  declarations: [
    AppComponent,
    MailPreparationComponent,
    MainPageComponent,
    ValidationDialogComponent,
    AuthenticationDialogComponent,
    SwitcherComponent,
    ClipComponent,
    CloseButtonComponent,
    ProgressBarComponent,
    ReportComponent,
    ReportTableComponent,
    ReportChartComponent,
    TargetBaseComponent
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
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
