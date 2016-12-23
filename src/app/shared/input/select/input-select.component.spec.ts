import { Component } from '@angular/core';
import { TestBed, inject, async } from '@angular/core/testing';
import { InputSelectComponent } from './input-select.component';
import { FormControl, ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { InputSelectOption } from './input-select-option.interface';
import { CommonModule } from '@angular/common';
import { TranslateMock } from '../../testing/translate/translate-mock';

import { EnCRMComponentsModule } from 'ng2-encrm-components';

let options: InputSelectOption[] = [{id: 1, value: 'opt 1'}, {id: 2, value: 'opt 2'}];

describe('InputSelectComponent', () => {
    let control: FormControl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InputSelectComponent
            ]
        });

        control = new FormControl(1);
    });

    it('Test metody handlerChange()', inject([InputSelectComponent], (component) => {
        component.control = control;

        spyOn(component.changed, 'emit');
        component.handlerChange();
        expect(component.changed.emit).toHaveBeenCalled();
    }));
});

describe('InputSelectComponent - UI', () => {
    let fixture;
    let nativeElement;
    let ci;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateMock.get(),
                EnCRMComponentsModule
            ],
            declarations: [
                InputSelectComponent,
                MockComponent
            ]
        });

        fixture = TestBed.createComponent(MockComponent);
        nativeElement = fixture.debugElement.nativeElement;
        ci = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('Komponent powinien osadzić w elemencie nadrzędnym pole select', async(() => {
        expect(nativeElement.querySelectorAll('select').length).toEqual(1);
        expect(nativeElement.querySelectorAll('option').length).toEqual(2);
    }));
});

@Component({
    selector: 'test-app',
    template: `
    <form [formGroup]="form" *ngIf="form">
        <ecrm-input-select [control]="form.controls['type']" [options]="options"></ecrm-input-select>
    </form>
  `
})
export class MockComponent {
    form: FormGroup;
    control: FormControl;
    options: InputSelectOption[];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            type: new FormControl(1)
        });
        this.options = options;
    }
}
