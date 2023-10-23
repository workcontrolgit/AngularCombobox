import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { MovieComponent } from './movie.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
    { path: '', component: MovieComponent, data: { title: marker('Movie') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MovieRoutingModule {}
