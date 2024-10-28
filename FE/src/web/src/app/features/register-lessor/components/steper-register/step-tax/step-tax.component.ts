// src/app/step-tax/step-tax.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest, Observable } from 'rxjs';
import { StatusProcess } from '../../../../../interfaces/anonymous.interface';
import { Province } from '../../../../../interfaces/province.interface';
import { IRequestRegisterLessor_Step3 } from '../../../../../interfaces/register-lessor.interface';
import { GlobalState } from '../../../../../store/app.state';
import * as ProvinceActions from '../../../../../store/province/province.actions';
import {
  selectDataDistrict,
  selectDataProvince,
  selectDataWard,
  selectStatusDistrict,
  selectStatusProvince,
  selectStatusWard,
} from '../../../../../store/province/province.reducer';
import { stepInfoTax } from '../../../state/register_lessor.actions';
import {
  selectAddress,
  selectBusinessLicense,
  selectDescription,
  selectRentalScale,
  selectTaxNumber,
} from '../../../state/register_lessor.reducer';

@Component({
  selector: 'app-step-tax',
  templateUrl: './step-tax.component.html',
  styleUrls: ['./step-tax.component.scss'], 
})
export class StepTaxComponent implements OnInit {
  // Observables
  getListProvince$?: Observable<Province[]>;
  getListDistrict$?: Observable<Province[]>;
  getListWard$?: Observable<Province[]>;
  statusProvince$?: Observable<StatusProcess>;
  statusDistrict$?: Observable<StatusProcess>;
  statusWard$?: Observable<StatusProcess>;

  // FormGroup definition with strict typing
  formTax: FormGroup<{
    rentalScale: FormControl<string>;
    address_ward: FormControl<object | string>;
    address_district: FormControl<object | string>;
    address_province: FormControl<object | string>;
    taxCode: FormControl<string>;
    description: FormControl<string>;
  }>;

  // File storage
  uploadedFiles: File[] = [];

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  constructor(
    private msg: NzMessageService,
    private store: Store<GlobalState>,
    private formBuilder: FormBuilder
  ) {
    this.formTax = this.createForm();
    this.loadProvinces();
  }

  ngOnInit(): void {
    this.initializeStateSubscriptions();
    this.resetAddressOnChange();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      rentalScale: ['', [Validators.required]],
      address_province: ['', [Validators.required]],
      address_district: ['', [Validators.required]],
      address_ward: ['', [Validators.required]],
      taxCode: ['', [Validators.required]],
      description: [''],
    }) as FormGroup<{
      rentalScale: FormControl<string>;
      address_ward: FormControl<object | string>;
      address_district: FormControl<object | string>;
      address_province: FormControl<object | string>;
      taxCode: FormControl<string>;
      description: FormControl<string>;
    }>;
  }

  initializeStateSubscriptions(): void {
    this.getListProvince$ = this.store.select(selectDataProvince);
    this.getListDistrict$ = this.store.select(selectDataDistrict);
    this.getListWard$ = this.store.select(selectDataWard);
    this.statusProvince$ = this.store.select(selectStatusProvince);
    this.statusDistrict$ = this.store.select(selectStatusDistrict);
    this.statusWard$ = this.store.select(selectStatusWard);

    combineLatest([
      this.store.select(selectAddress),
      this.store.select(selectTaxNumber),
      this.store.select(selectDescription),
      this.store.select(selectBusinessLicense),
      this.store.select(selectRentalScale),
    ]).subscribe(([address, taxNumber, description, businessLicense, rentalScale]) => {
      if (address) {
        this.loadDistricts(address.address_province.id);
        this.loadWards(address.address_district.id);
        this.formTax.patchValue({
          address_province: address.address_province,
          address_district: address.address_district,
          address_ward: address.address_ward,
          taxCode: taxNumber,
          description: description,
          rentalScale: String(rentalScale)
        });
        this.uploadedFiles = businessLicense ? [businessLicense] : [];
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadedFiles = Array.from(input.files);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formTax.invalid || this.uploadedFiles.length === 0) {
      this.validateForm();
      return;
    }

    const { address_district, address_province, address_ward, description, taxCode, rentalScale } = this.formTax.value;
    this.store.dispatch(
      stepInfoTax({
        content: {
          address: { address_district, address_province, address_ward },
          businessLicense: this.uploadedFiles[0],
          description,
          rentalScale,
          taxNumber: taxCode,
        } as IRequestRegisterLessor_Step3,
      })
    );

    this.nextStep.emit();
  }

  goBack(): void {
    this.prevStep.emit();
  }

  compareFn = (o1: any, o2: any) => (o1?.id === o2?.id);

  private loadProvinces(): void {
    this.store.dispatch(ProvinceActions.getProvince());
  }

  private loadDistricts(id: string | number): void {
    this.store.dispatch(ProvinceActions.getDistrict({ id }));
  }

  private loadWards(id: string | number): void {
    this.store.dispatch(ProvinceActions.getWardOrCommume({ id }));
  }

  onProvinceChange(value: string): void {
    this.loadDistricts(value);
  }

  onDistrictChange(value: string): void {
    this.loadWards(value);
  }

  private resetAddressOnChange(): void {
    this.formTax.get('address_province')?.valueChanges.subscribe((province: any) => {
      if (province) {
        this.loadDistricts(province.id);
        this.resetDistrictAndWard();
      }
    });

    this.formTax.get('address_district')?.valueChanges.subscribe((district : any) => {
      if (district) {
        this.loadWards(district.id);
        this.resetWard();
      }
    });
  }

  private resetDistrictAndWard(): void {
    this.formTax.get('address_district')?.enable();
    this.formTax.get('address_district')?.reset();
    this.formTax.get('address_ward')?.disable();
    this.formTax.get('address_ward')?.reset();
  }

  private resetWard(): void {
    this.formTax.get('address_ward')?.enable();
    this.formTax.get('address_ward')?.reset();
  }

  private validateForm(): void {
    Object.values(this.formTax.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
