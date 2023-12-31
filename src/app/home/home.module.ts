import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
