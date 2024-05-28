import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { RouterLink } from '@angular/router';


interface MenuItem {
  name:string,
  route:string,
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

  public MenuItem: MenuItem[] =[
    {
      name:'Full Screen',
      route: '/maps/fullscreen'
    },
    {
      name:'Zoom',
      route: '/maps/zoom-ranges'
    },
    {
      name:'Markers',
      route: '/maps/markers'
    },
    {
      name:'Houses',
      route: '/maps/properties'
    },
    {
      name:'alone',
      route: '/alone'
    }
  ]

}
