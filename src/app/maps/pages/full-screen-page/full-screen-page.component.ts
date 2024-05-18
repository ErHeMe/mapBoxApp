import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
// mapboxgl.accessToken = 'pk.eyJ1IjoiaGVybWVkIiwiYSI6ImNrbzV4c284bzB1cncyb3M3azZxcG9xZXkifQ.gjMutFlRHhR7r3QEIv8Axw';
// movido a appModule

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
  divMap?: ElementRef;

  ngAfterViewInit(): void {

    if(!this.divMap){
      return
    }

    const map = new mapboxgl.Map({
      //container: 'map', // container ID
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-103.42390974969136, 20.609427225114203], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}