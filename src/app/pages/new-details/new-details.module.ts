import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewDetailsPage } from './new-details.page';
import { SharedModule } from '../../core/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NewDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewDetailsPage]
})
export class NewDetailsPageModule {}
