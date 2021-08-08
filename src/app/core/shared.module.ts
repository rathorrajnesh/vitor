import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SafePipe],
})
export class SharedModule { }
