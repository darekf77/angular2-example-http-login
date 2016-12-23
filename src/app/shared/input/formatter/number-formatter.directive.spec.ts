import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NumberFormatterDirective } from './number-formatter.directive';

describe('NumberFormatterDirective', () => {
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
                NumberFormatterDirective,
                MockFormComponent
            ]
        });

        fixture = TestBed.createComponent(MockFormComponent);
        nativeElement = fixture.debugElement.nativeElement;
        ci = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('Dane wprowadzone w pole input powinny zostać zformatowane', async(() => {
        let num = '123';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('123');
        expect(ci.form.controls['num'].value).toEqual(num);

        num = '1234';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('1 234');
        expect(ci.form.controls['num'].value).toEqual(num);

        num = '12345';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('12 345');
        expect(ci.form.controls['num'].value).toEqual(num);

        num = '123456';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('123 456');
        expect(ci.form.controls['num'].value).toEqual(num);

        num = '1234567';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('1 234 567');
        expect(ci.form.controls['num'].value).toEqual(num);

        num = '';
        ci.form.controls['num'].setValue(num);

        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('input')[0].value).toEqual('');
        expect(ci.form.controls['num'].value).toEqual(num);
    }));
});

@Component({
    selector: 'test-app',
    template: `
    <form [formGroup]="form" *ngIf="form">
        <input type="text" [formControl]="form.controls['num']" number-formatter>
    </form>
  `
})
export class MockFormComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            num: new FormControl(''),
        });
    }
}
