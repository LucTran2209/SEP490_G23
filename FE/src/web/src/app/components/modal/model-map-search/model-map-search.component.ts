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

  array10 = Array.from({length: 10})
  initMap() {
    // Cài đặt token Goong
    goongjs.accessToken = 'uAwYO4ZojSaI4wKUBHd1nnbg80n1sLKAhw3OjiJU';

    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.028], // Tọa độ Hà Nội
      zoom: 4,
    });

    this.addControlMap(map);
  }

  addControlMap(map: any) {
    // Thêm Navigation Control
    var nav = new goongjs.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // current location
    var getLocal = new goongjs.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: false,
        timeout: 6000,
      },
      trackUserLocation: false,
      showUserLocation: true,
    });
    map.addControl(getLocal, 'bottom-right');

    // add search goong geocoder
    map.addControl(
      new GoongGeocoder({
        accessToken: environment.apiKeyGoong,
        goongjs: goongjs,
      })
    );
  }

  constructor(private modalRef: NzModalRef) {}

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {}
}
