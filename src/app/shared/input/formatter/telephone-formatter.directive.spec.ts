import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { TelephoneFormatterDirective } from './telephone-formatter.directive';
import { CommonModule } from '@angular/common';

describe('TelephoneFormatterDirective', () => {
    let fixture;
    let nativeElement;
    let ci;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule
            ],
            declarations: [
                TelephoneFormatterDirective,
                MockFormComponent
            ]
        });

        fixture = TestBed.createComponent(MockFormComponent);
        nativeElement = fixture.debugElement.nativeElement;
        ci = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('Dane wprowadzone w pole input powinny zostać zformatowane - brak prefixu', async(() => {
        let phone = '111222333';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('11 122 23 33');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '11122233';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('111 222 33');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '1112223';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('111 222 3');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '111222';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('111 222');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '11122';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('111 22');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '1112';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('11 12');
        expect(ci.form.controls['phone'].value).toEqual(phone);

        phone = '441112223';
        ci.form.controls['phone'].setValue(phone);
        ci.form.controls['typeAddress'].setValue(2);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('44 111 22 23');
        expect(ci.form.controls['phone'].value).toEqual(phone);
    }));

    it('Dane wprowadzone w pole input powinny zostać zformatowane - prefix 22', async(() => {
        let phone = '22111222333';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('22 11 122 23 33');
        expect(ci.form.controls['phone'].value).toEqual(phone);
    }));

    it('Dane wprowadzone w pole input powinny zostać zformatowane - prefix +48', async(() => {
        let phone = '+48111222333';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('+48 11 122 23 33');
        expect(ci.form.controls['phone'].value).toEqual(phone);
    }));

    it('Dane wprowadzone w pole input powinny zostać zformatowane - prefix +(48)', async(() => {
        let phone = '+(48)111222333';
        ci.form.controls['phone'].setValue(phone);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('+(48) 11 122 23 33');
        expect(ci.form.controls['phone'].value).toEqual(phone);
    }));

});

@Component({
    selector: 'test-app',
    template: `
    <form [formGroup]="form" *ngIf="form">
        <input type="text" 
          [formControl]="form.controls['phone']" telephone-formatter [typeAddress]="form.controls[typeAddress]">
    </form>
  `
})
export class MockFormComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            phone: new FormControl(''),
            typeAddress: new FormControl(1)
        });
    }
}
