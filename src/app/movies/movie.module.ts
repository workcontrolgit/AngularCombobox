import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbTooltipModule,
    MovieRoutingModule],
  declarations: [MovieComponent],
})
export class MovieModule {}
