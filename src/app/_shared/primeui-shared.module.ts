import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DefaultGridComponent } from '../_template/grid/default-grid/default-grid.component';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { HasRoleDirective } from 'src/app/_directives/has-role.directive';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ResetComponent } from '../_template/utility/reset/reset.component';
import { ConfirmationDialogComponent } from '../_template/modal/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DefaultToastComponent } from '../_template/default-toast/default-toast.component';
import { ToggleComponent } from '../_template/utility/toggle/toggle.component';
import { DropdownModule } from 'primeng/dropdown';
import { CountryDropdownComponent } from '../_template/dropdown/countrylist/countryDropdown.component';
import { ErrorModalComponent } from '../_template/modal/error-modal/error-modal.component';
import { CityDropdownComponent } from '../_template/dropdown/citylist/cityDropdown.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ErrorValidationComponent } from '../_template/error-validation/error-validation.component';
import { CurrencyDropdownComponent } from '../_template/dropdown/currency-dropdown/currency-dropdown.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ValidationResetComponent } from '../_template/utility/validation-reset/validation-reset.component';
import { ContentHelpComponent } from '../_template/utility/content-help/content-help.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModalComponent } from '../_template/modal/dialog-modal/dialog-modal.component';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { BackComponent } from '../_template/utility/back/back.component';

@NgModule({
  declarations: [
    DefaultGridComponent,
    HasRoleDirective,
    ResetComponent,
    DefaultToastComponent,
    ToggleComponent,
    CountryDropdownComponent,
    ErrorModalComponent,
    ConfirmationDialogComponent,
    CityDropdownComponent,
    ErrorValidationComponent,
    CurrencyDropdownComponent,
    ValidationResetComponent,
    ContentHelpComponent,
    DialogModalComponent,
    BackComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    RippleModule,
    TooltipModule,
    OverlayPanelModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    CascadeSelectModule,
    PanelModule,
    InputTextareaModule,
    InputSwitchModule,
    InputNumberModule,
    AccordionModule,
    MenubarModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    PaginatorModule,
    DefaultGridComponent,
    ResetComponent,
    InputTextModule,
    RippleModule,
    HasRoleDirective,
    TooltipModule,
    OverlayPanelModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    DefaultToastComponent,
    ToggleComponent,
    DropdownModule,
    CountryDropdownComponent,
    ConfirmationDialogComponent,
    CityDropdownComponent,
    CurrencyDropdownComponent,
    ErrorValidationComponent,
    PanelModule,
    InputTextareaModule,
    InputSwitchModule,
    ValidationResetComponent,
    ContentHelpComponent,
    InputNumberModule,
    DialogModalComponent,
    AccordionModule,
    MenubarModule,
    BackComponent
  ],
  providers: [ConfirmationService, MessageService],
})
export class PrimeuiSharedModule {}
