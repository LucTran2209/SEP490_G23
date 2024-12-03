import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject } from 'rxjs';
import { StatusProcess } from '../../../../../interfaces/anonymous.interface';
import { Province } from '../../../../../interfaces/province.interface';
import { IRequestRegisterLessor_Step3 } from '../../../../../interfaces/register-lessor.interface';
import { GlobalState } from '../../../../../store/app.state';
import { stepInfoTax } from '../../../state/register_lessor.actions';

@Component({
  selector: 'app-step-tax',
  templateUrl: './step-tax.component.html',
  styleUrls: ['./step-tax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTaxComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  getListProvince$?: Observable<Province[]>;
  getListDistrict$?: Observable<Province[]>;
  getListWard$?: Observable<Province[]>;
  statusProvince$?: Observable<StatusProcess>;
  statusDistrict$?: Observable<StatusProcess>;
  statusWard$?: Observable<StatusProcess>;

  formTax: FormGroup<{
    rentalScale: FormControl<string>;
    address: FormControl<object | string>;
    taxCode: FormControl<string>;
    description: FormControl<string>;
  }>;

  uploadedFiles: File[] = [];

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  constructor(
    private msg: NzMessageService,
    private store: Store<GlobalState>,
    private formBuilder: FormBuilder
  ) {
    this.formTax = this.createForm();
  }

  ngOnInit(): void {
    this.initializeStateSubscriptions();
    this.resetAddressOnChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      rentalScale: ['', [Validators.required]],
      address: ['', [Validators.required]],
      taxCode: ['', [Validators.required]],
      description: [''],
    }) as FormGroup<{
      rentalScale: FormControl<string>;
      address: FormControl<object | string>;
      taxCode: FormControl<string>;
      description: FormControl<string>;
    }>;
  }

  initializeStateSubscriptions(): void {
    // this.getListProvince$ = this.store.select(selectDataProvince);
    // this.getListDistrict$ = this.store.select(selectDataDistrict);
    // this.getListWard$ = this.store.select(selectDataWard);
    // this.statusProvince$ = this.store.select(selectStatusProvince);
    // this.statusDistrict$ = this.store.select(selectStatusDistrict);
    // this.statusWard$ = this.store.select(selectStatusWard);
    // combineLatest([
    //   this.store.select(selectAddress),
    //   this.store.select(selectTaxNumber),
    //   this.store.select(selectDescription),
    //   this.store.select(selectBusinessLicense),
    //   this.store.select(selectRentalScale),
    // ])
    //   .pipe(takeUntil(this.destroy$)) // Clean up on component destroy
    //   .subscribe(([address, taxNumber, description, businessLicense, rentalScale]) => {
    //     if (address) {
    //       this.formTax.patchValue({
    //         address_province: address.address_province,
    //         address_district: address.address_district,
    //         address_ward: address.address_ward,
    //         taxCode: taxNumber,
    //         description: description,
    //         rentalScale: String(rentalScale),
    //       }, { emitEvent: false }); // Prevent triggering valueChanges
    //       this.uploadedFiles = businessLicense ? [businessLicense] : [];
    //     }
    //   });
  }
  goBack(): void {
    this.prevStep.emit();
  }
  onSubmit(): void {
    if (this.formTax.invalid) {
      this.validateForm();
      return;
    }
    const { address, description, taxCode, rentalScale } = this.formTax.value;
    this.store.dispatch(
      stepInfoTax({
        content: {
          address,
          businessLicense: this.uploadedFiles[0] || null,
          description,
          rentalScale,
          taxNumber: taxCode,
        } as IRequestRegisterLessor_Step3,
      })
    );

    this.nextStep.emit();
  }

  onSelectedFile(files: File[]) {
    this.uploadedFiles.push(...files);
  }

  onRemoveAFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  get isDisableBtnFinal(){
    if(!this.isChooseRentalScalePersonal){
      return this.formTax.invalid || this.uploadedFiles.length === 0;
    }else{
      return this.formTax.invalid;
    }
  }

  private resetAddressOnChange(): void {}

  private validateForm(): void {
    Object.values(this.formTax.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  get isChooseRentalScalePersonal() {
    let rentalScale = this.formTax.get('rentalScale')?.value;
    return rentalScale === '1';
  }
}
