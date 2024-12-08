import { AfterViewInit, Component } from '@angular/core';
import { MessageResponseService } from '../../services/message-response.service';
declare const goongjs: any;
@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrl: './anonymous.component.scss',
})
export class AnonymousComponent implements AfterViewInit {
  constructor(readonly toastMessage: MessageResponseService) {}

  ngAfterViewInit(): void {
    // Cài đặt token Goong
    goongjs.accessToken = 'uAwYO4ZojSaI4wKUBHd1nnbg80n1sLKAhw3OjiJU';
  
    const map = new goongjs.Map({
      container: 'map', 
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800], // Tọa độ Hà Nội
      zoom: 4,
    });
  
    // Thêm Navigation Control
    var nav = new goongjs.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // current location
    var getLocal = new goongjs.GeolocateControl(
      {
        positionOptions: {
          enableHighAccuracy:false,
          timeout:6000
        },
        trackUserLocation: false,
        showUserLocation: true
      })
      map.addControl(getLocal)

  
    // Đợi bản đồ tải xong
    map.on('load', () => {
      // Thêm nguồn GeoJSON
      map.addSource('myGeoJsonSource', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [105.83991, 21.02800] // Tọa độ Hà Nội
              },
              properties: {
                title: 'Hà Nội',
                description: 'Thủ đô Việt Nam'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [106.6297, 10.8231] // Tọa độ TP. Hồ Chí Minh
              },
              properties: {
                title: 'TP. Hồ Chí Minh',
                description: 'Thành phố lớn nhất Việt Nam'
              }
            }
          ]
        }
      });
  
      // Thêm layer để hiển thị dữ liệu từ nguồn
      map.addLayer({
        id: 'points-layer',
        type: 'circle', // Loại layer
        source: 'myGeoJsonSource', // Tên nguồn GeoJSON
        paint: {
          'circle-radius': 8, // Kích thước vòng tròn
          'circle-color': '#FF5733', // Màu sắc
          'circle-stroke-width': 2, // Viền vòng tròn
          'circle-stroke-color': '#FFFFFF' // Màu viền
        }
      });
  
      // Thêm popup hiển thị thông tin khi click vào điểm
      map.on('click', 'points-layer', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const description = e.features[0].properties.description;
  
        // Hiển thị Popup
        new goongjs.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong>${title}</strong><p>${description}</p>`)
          .addTo(map);
      });
  
      // Thay đổi con trỏ chuột khi hover vào điểm
      map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
      });
    });
  }
  

  showSuccess() {
    this.toastMessage.showSuccess('Thành công!');
  }

  showError() {
    this.toastMessage.handleError('',500);
  }

  showInfo() {
    this.toastMessage.showInfo('Đây là thông báo.');
  }
}
