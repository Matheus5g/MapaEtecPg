import { Component, AfterViewInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class HomePage implements AfterViewInit {
  mapa!: L.Map;

  // Coordenadas exatas da ETEC de Praia Grande
  private etecCoords: L.LatLngTuple = [-24.0058, -46.4124];

  ngAfterViewInit() {
    this.inicializarMapa();
  }

  ionViewDidEnter() {
    if (this.mapa) {
      this.mapa.invalidateSize();
    }
  }

  private inicializarMapa() {
    if (this.mapa) return;

    this.mapa = L.map('mapa').setView(this.etecCoords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);

    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.marker(this.etecCoords, { icon: customIcon })
      .addTo(this.mapa)
      .bindPopup('<b>ETEC de Praia Grande</b><br>Rua Guilherme Penteado de Campos, 117 - Vila Mirim')
      .openPopup();

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 400);
  }
}
