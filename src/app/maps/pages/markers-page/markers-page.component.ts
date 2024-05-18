import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

interface markerAndColor{
  color:string;
  marker: mapboxgl.Marker
}

interface PlainMarker {
  color:string;
  langlat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  divMap?: ElementRef;

  public zoom:number =14;
  public map?: mapboxgl.Map;
  public currentCenter: mapboxgl.LngLat = new mapboxgl.LngLat(-103.42390974969136, 20.609427225114203);
  
  markers: markerAndColor[] = []

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

    this.readToLocalStorage();
    // const markerhtml = document.createElement('div');
    // markerhtml.innerHTML = 'Eric'

    // const marker = new mapboxgl.Marker({element:markerhtml})
    // .setLngLat(this.currentCenter)
    // .addTo(this.map);

  }


  createrMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat:mapboxgl.LngLat, color: string){

    if(!this.map) return;

    const marker = new mapboxgl.Marker({
      color:color,
      draggable:true
    }).setLngLat(lngLat).addTo(this.map).on('dragend', () =>{
      this.saveToLocalStorage();

    });

    this.markers.push({marker:marker, color})
    this.saveToLocalStorage();
  }

  deleteMarker(index:number){

    this.markers[index].marker.remove();
    this.markers.splice(index,1)

  }

  flyTo(marker: mapboxgl.Marker){
    this.map?.flyTo({
      zoom:15,
      center: marker.getLngLat()
    })

  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] =  this.markers.map((colorMarker) => {
      return {
        color: colorMarker.color,
        langlat: colorMarker.marker.getLngLat().toArray()
      }
    })
    localStorage.setItem('plainMArker', JSON.stringify(plainMarker));

  }

  readToLocalStorage(){
    const plainMArkerString:string = localStorage.getItem('plainMArker') ?? '[]';
    const plainMArker: PlainMarker[] = JSON.parse(plainMArkerString);
    
    plainMArker.forEach(({color,langlat}) => {

      const [lng, lat]= langlat 
      const cords= new mapboxgl.LngLat(lng, lat); 
      this.addMarker(cords, color);
    })
  }

}
