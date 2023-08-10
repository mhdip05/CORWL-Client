import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      progressBar:true,
      progressAnimation:'increasing',
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      messageClass: 'custom-toast',
      closeButton: true
    })
  ],
  exports:[
    GridModule,
    CardModule,
    ButtonModule,
    IconModule,
    FormModule,
    FormsModule,
    ToastrModule
  ]
})
export class CustomSharedModule { }
