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
} from '../../../../../store/province/province.reducer';
import { Observable } from 'rxjs';
import { Province } from '../../../../../interfaces/province.interface';

@Component({
  selector: 'app-step-tax',
  templateUrl: './step-tax.component.html',
  styleUrl: './step-tax.component.scss',
})
export class StepTaxComponent {
  selectProvince?: string;
  getListProvince$?: Observable<Province[]>;
  getListDistrict$?: Observable<Province[]>;
  getListWard$?: Observable<Province[]>;
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
    this.store.dispatch(ProvinceAddress.getDistrict({ id }));
  }

  ngOnInit(): void {
    this.getListProvince$ = this.store.select(selectDataProvince);
    this.getListDistrict$ = this.store.select(selectDataDistrict);
    this.getListWard$ = this.store.select(selectDataWard);
  }
}
