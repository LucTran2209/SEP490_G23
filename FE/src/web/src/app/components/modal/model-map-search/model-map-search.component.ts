import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { environment } from '../../../../environments/environment.development';
declare const goongjs: any;
declare const GoongGeocoder: any;

@Component({
  selector: 'app-model-map-search',
  templateUrl: './model-map-search.component.html',
  styleUrl: './model-map-search.component.scss',
})
export class ModelMapSearchComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  private map: any;
  private markers: any[] = [];
  private circles: any[] = [];
  private shops: any[] = [];
  array10 = Array.from({ length: 10 });
  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngAfterViewChecked(): void {}

  initMap() {
    // Cài đặt token Goong
    goongjs.accessToken = environment.apiKeyMapGoong;

    this.map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.028], // Tọa độ Hà Nội
      zoom: 10,
    });

    this.addControlMap(this.map);

    // Trigger
    this.triggerCurrentLocation(this.map);
  }


  triggerCurrentLocation(map: any) {
    const getLocal = new goongjs.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 6000,
      },
      trackUserLocation: false,
      showUserLocation: true,
    });
  
    map.addControl(getLocal, 'bottom-right');
  
    // Tự động trigger lấy vị trí
    map.on('load', () => {
      getLocal.trigger();
    });
  
    // Xử lý khi lấy được vị trí
    getLocal.on('geolocate', (e: any) => {
      const userCoords = [e.coords.longitude, e.coords.latitude];
      this.clearMarkersAndCircles();
      this.addCircleLayer([userCoords[0], userCoords[1]], 1000); // Vẽ vòng tròn bán kính 1km
      this.loadNearbyShops([userCoords[0], userCoords[1]]);
    });
  }
  
  addControlMap(map: any) {
    const nav = new goongjs.NavigationControl();
    map.addControl(nav, 'bottom-right');
  
    // Geocoder
    const geocoder = new GoongGeocoder({
      accessToken: environment.apiKeyGoong,
      goongjs: goongjs,
    });
  
    map.addControl(geocoder);
  
    // Xử lý khi người dùng tìm kiếm
    geocoder.on('result', (e: any) => {
      const searchCoords = e.result.result.geometry.location;
      this.clearMarkersAndCircles();
      this.addCircleLayer([searchCoords.lng, searchCoords.lat], 5000); // Vẽ vòng tròn bán kính 5km
      this.loadNearbyShops([searchCoords.lng, searchCoords.lat]);
    });
  }
  
  addCircleLayer(center: [number, number], radiusInMeters: number) {
    const circleGeoJSON = this.createCircleGeoJSON(center, radiusInMeters);
  
    // Thêm nguồn GeoJSON cho vòng tròn
    this.map.addSource('circle-layer', {
      type: 'geojson',
      data: circleGeoJSON,
    });
  
    // Thêm layer hiển thị vòng tròn
    this.map.addLayer({
      id: 'circle-layer',
      type: 'fill',
      source: 'circle-layer',
      paint: {
        'fill-color': '#A5A4A4',
        'fill-opacity': 0.3,
      },
    });
  }
  
  clearMarkersAndCircles() {
    // Xóa tất cả markers
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  
    // Xóa layer và source của vòng tròn
    if (this.map.getLayer('circle-layer')) this.map.removeLayer('circle-layer');
    if (this.map.getSource('circle-layer')) this.map.removeSource('circle-layer');
  }
  

  loadNearbyShops(coords: [number, number]) {
    // Dữ liệu mẫu cho các shop lân cận
    this.shops = [
      { id: 1, name: 'Shop A', coords: [coords[0] + 0.01, coords[1] + 0.01] },
      { id: 2, name: 'Shop B', coords: [coords[0] - 0.01, coords[1] - 0.01] },
      { id: 3, name: 'Shop C', coords: [coords[0] + 0.02, coords[1] + 0.02] },
    ];

    // Hiển thị các shop trên bản đồ
    this.shops.forEach((shop) => {
      const marker = new goongjs.Marker({ color: 'red' })
        .setLngLat(shop.coords)
        .setPopup(
          new goongjs.Popup({ offset: 25 }).setHTML(
            `<div><h3>${shop.name}</h3><p>Thông tin chi tiết...</p></div>`
          )
        )
        .addTo(this.map);
    });
  }


  createCircleGeoJSON(center: [number, number], radiusInMeters: number) {
    const points = 64; // Số điểm trên vòng tròn
    const coords = [];
    const earthRadius = 6371000; // Bán kính Trái Đất tính bằng mét
    const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);
    const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

    const [longitude, latitude] = center;
    const angularDistance = radiusInMeters / earthRadius;

    for (let i = 0; i <= points; i++) {
      const bearing = (i * 360) / points;
      const bearingInRadians = degreesToRadians(bearing);

      const lat = Math.asin(
        Math.sin(degreesToRadians(latitude)) * Math.cos(angularDistance) +
          Math.cos(degreesToRadians(latitude)) *
            Math.sin(angularDistance) *
            Math.cos(bearingInRadians)
      );

      const lng =
        degreesToRadians(longitude) +
        Math.atan2(
          Math.sin(bearingInRadians) *
            Math.sin(angularDistance) *
            Math.cos(degreesToRadians(latitude)),
          Math.cos(angularDistance) -
            Math.sin(degreesToRadians(latitude)) * Math.sin(lat)
        );

      coords.push([radiansToDegrees(lng), radiansToDegrees(lat)]);
    }

    coords.push(coords[0]); // Đóng vòng tròn

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords],
      },
    };
  }
}
