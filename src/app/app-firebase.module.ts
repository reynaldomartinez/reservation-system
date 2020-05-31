import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from './../environments/environment';

import { AngularFireModule } from '@angular/fire';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class AppFirebaseModule { }
