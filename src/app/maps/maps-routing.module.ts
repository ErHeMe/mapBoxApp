import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { ZoomPagesComponent } from './pages/zoom-pages/zoom-pages.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPagesComponent } from './pages/properties-pages/properties-pages.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children:[
      {
        path: 'fullscreen',
        component: FullScreenPageComponent,
      },
      {
        path: 'zoom-ranges',
        component: ZoomPagesComponent,
      },
      {
        path: 'markers',
        component: MarkersPageComponent,
      },
      {
        path: 'properties',
        component: PropertiesPagesComponent,
      },
      {
        path: '**',
        redirectTo: 'fullscreen'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
