import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
 

  @Input () lngLat?:[number, number]
  @ViewChild('map')
  divMap?: ElementRef;
  
  public map?: mapboxgl.Map;

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw 'Map div not found';
    if(!this.lngLat) throw "lnlat canot be null"

    this.map = new mapboxgl.Map({
      //container: 'map', // container ID
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom,
      dragPan:true,
      // interactive: false
    });

     new mapboxgl.Marker().setLngLat(this.lngLat).addTo(this.map).addTo(this.map);
  }
}
