import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-pages',
  templateUrl: './zoom-pages.component.html',
  styleUrl: './zoom-pages.component.css'
})
export class ZoomPagesComponent implements AfterViewInit, OnDestroy {
  

  @ViewChild('map')
  divMap?: ElementRef;

  public zoom:number =15;
  public map?: mapboxgl.Map;
  public currentCenter: mapboxgl.LngLat = new mapboxgl.LngLat(-103.42390974969136, 20.609427225114203);

  ngAfterViewInit(): void {

    if(!this.divMap){
      return
    }

    this.map = new mapboxgl.Map({
      //container: 'map', // container ID
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if(!this.map) throw 'mapa no existe';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom()<18) return;

      this.map?.zoomTo(18);
      this.zoom = this.map!.getZoom();
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
    })

  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChange(change: string){

    this.zoom = Number(change);
    this.map?.zoomTo(this.zoom);
  }

}
