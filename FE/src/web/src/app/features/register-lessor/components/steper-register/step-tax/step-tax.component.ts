import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { GlobalState } from '../../../../../store/app.state';
import * as ProvinceAddress from '../../../../../store/province/province.actions';
import {
  selectDataDistrict,
  selectDataProvince,
  selectDataWard,
  selectStatusDistrict,
  selectStatusProvince,
  selectStatusWard,
} from '../../../../../store/province/province.reducer';
import { Observable } from 'rxjs';
import { Province } from '../../../../../interfaces/province.interface';
import { StatusProcess } from '../../../../../interfaces/anonymous.interface';

@Component({
  selector: 'app-step-tax',
  templateUrl: './step-tax.component.html',
  styleUrl: './step-tax.component.scss',
})
export class StepTaxComponent {
  selectProvince?: string;
  selectDistrict?: string;
  selectWard?: string;
  getListProvince$?: Observable<Province[]>;
  getListDistrict$?: Observable<Province[]>;
  getListWard$?: Observable<Province[]>;
  statusProvince$?: Observable<StatusProcess>;
  statusDistrict$?: Observable<StatusProcess>;
  statusWard$?: Observable<StatusProcess>;
  constructor(
    private msg: NzMessageService,
    private store: Store<GlobalState>
  ) {
    this.loadAddressProvice();
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  loadAddressProvice() {
    this.store.dispatch(ProvinceAddress.getProvince());
  }
  loadAddressDistrict(id: string | number) {
    this.store.dispatch(ProvinceAddress.getDistrict({ id }));
  }
  loadAddressDataWard(id: string | number) {
    this.store.dispatch(ProvinceAddress.getWardOrCommume({ id }));
  }

  ngOnInit(): void {
    this.getListProvince$ = this.store.select(selectDataProvince);
    this.getListDistrict$ = this.store.select(selectDataDistrict);
    this.getListWard$ = this.store.select(selectDataWard);
    this.statusProvince$ = this.store.select(selectStatusProvince);
    this.statusDistrict$ = this.store.select(selectStatusDistrict);
    this.statusWard$ = this.store.select(selectStatusWard);

  onProvinceChange(value: string) {
    this.loadAddressDistrict(value);
    if (!this.selectProvince) {
      this.selectDistrict = '';
      this.selectWard = '';
    }
  }
  onDistrictChange(value: string) {
    this.loadAddressDataWard(value);
    if (!this.selectDistrict) {
      this.selectWard = '';
    }
  }
  ontWardChange(value: string) {}
}
