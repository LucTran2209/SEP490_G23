import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MessageResponseService } from '../../services/message-response.service';
import { FormControl } from '@angular/forms';
import { OptionAddress } from '../core/input-address/input-address.component';
import { filter, map, switchMap } from 'rxjs';
import { AddressService } from '../../services/address.service';
declare const goongjs: any;
declare const GoongGeocoder: any;

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrl: './anonymous.component.scss',
})
export class AnonymousComponent
  implements AfterViewInit, AfterViewChecked, OnInit
{
  devices = [
    { id: 1, name: 'Device A', price: 600, location: [105.854, 21.03] },
    { id: 2, name: 'Device B', price: 700, location: [105.87, 20.05] },
    { id: 3, name: 'Device B', price: 800, location: [105.87, 21.04] },
    { id: 4, name: 'Device B', price: 900, location: [104.87, 21.0] },
  ];

  address: FormControl = new FormControl<OptionAddress | null>(null);

  get addressValueForm() {
    return this.address.value;
  }

  // Hàm xử lý khi nhấn nút trong popup
  handlePopupUpdate(index: number) {}
  showSuccess() {
    this.toastMessage.showSuccess('Thành công!');
  }

  showError() {
    this.toastMessage.handleError('', 500);
  }

  showInfo() {
    this.toastMessage.showInfo('Đây là thông báo.');
  }

  ngAfterViewInit(): void {
    // Cài đặt token Goong
    goongjs.accessToken = environment.apiKeyMapGoong;

    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.028], // Tọa độ Hà Nội
      zoom: 4,
    });

    // Thêm Navigation Control
    var nav = new goongjs.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // current location
    var getLocal = new goongjs.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 6000,
      },
      trackUserLocation: true,
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

    // Đợi bản đồ tải xong
    map.on('load', () => {
      // current location user
      getLocal.trigger();
      getLocal.on('error', (e: any) => {
        console.error('Không thể lấy vị trí hiện tại:', e.message);
      });
      getLocal.on('geolocate', (e: any) => {
        const userCoords = [e.coords.longitude, e.coords.latitude];
        // Đặt trung tâm bản đồ tại vị trí người dùng
        map.setCenter(userCoords);
        console.log('>>> line 78', e);
      });
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
                coordinates: [105.83991, 21.028], // Tọa độ Hà Nội
              },
              properties: {
                title: 'Hà Nội',
                description: 'Thủ đô Việt Nam',
              },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [106.6297, 10.8231], // Tọa độ TP. Hồ Chí Minh
              },
              properties: {
                title: 'TP. Hồ Chí Minh',
                description: 'Thành phố lớn nhất Việt Nam',
              },
            },
          ],
        },
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
          'circle-stroke-color': '#FFFFFF', // Màu viền
        },
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

      this.devices.forEach((dev, index) => {
        //marker demo
        var marker = new goongjs.Marker({ color: 'red' }) // Đặt màu cho marker
          .setLngLat(dev.location)
          .setPopup(
            new goongjs.Popup({ className: `my-class-${index}` }).setHTML(`
                 <div>
      <nz-card
        class="mt-4 cursor-pointer rounded-md shadow-md"
        [nzCover]="nzAvatar"
      >
        <nz-card-meta
          nzTitle="${dev.name}"
          nzDescription="GIÁ THUÊ: ${dev.price} VND"
        >
          <ng-template #nzAvatar>
            <div class="image-container">
              <!-- Display the current image from the image list -->
              <img
                style="width: 100%; height: 250px; object-fit: fill"
                src="./assets/images/image.png"
                alt="image.png"
                class="image rounded-t-md"
              />
            </div>
          </ng-template>
        </nz-card-meta>
        <div class="flex justify-start items-center flex-wrap mt-2">
          <nz-avatar-group>
            <nz-avatar
              nzSize="small"
              nzIcon="user"
              nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            ></nz-avatar>
            <nz-avatar
              nzSize="small"
              style="background-color: #f56a00"
              nzText="U"
            ></nz-avatar>
            <nz-avatar
              nzSize="small"
              style="background-color: #fde3cf; color: #f56a00"
              nzText="+2"
            ></nz-avatar>
          </nz-avatar-group>
          <span class="text-sm mx-2 text-[#CCCCCC]">số người thuê</span>
        </div>
        <div class="flex justify-between items-center flex-wrap mt-2">
          <div class="flex justify-between items-center gap-x-3">
            <span
              nz-icon
              nzType="star"
              nzTheme="fill"
              class="text-yellow-300 text-lg"
            ></span>
            <p class="text-sm">20</p>
          </div>

          <div class="flex items-center gap-x-2">
            <button nz-button nzGhost nzType="primary">Chọn thuê</button>
          
          </div>
        </div>
      </nz-card>
    </div>
              `)
          )
          .addTo(map);

        marker.getPopup().on('open', () => {
          const button = document.getElementById(`popup-btn-${index}`);
          if (button) {
            button.addEventListener('click', () =>
              this.handlePopupUpdate(index)
            );
          }
        });
      });
    });
  }

  ngOnInit(): void {
    this.address.valueChanges
      .pipe(
        filter((source) => {
          return source.placeId !== undefined;
        }),
        map((optionChoose: OptionAddress) => optionChoose.placeId),
        switchMap((placeId) => {
          return this.addressService.getAddressDetail(placeId).pipe(
            map((res) => {
              console.log('place detail', res.result.geometry.location);
            })
          );
        })
      )
      .subscribe((res) => {});
  }

  constructor(
    readonly toastMessage: MessageResponseService,
    private addressService: AddressService
  ) {}

  ngAfterViewChecked(): void {}
}
