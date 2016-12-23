import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ecrm-input-datepicker',
    templateUrl: './input-datepicker.component.html',
    styles: [require('./input-datepicker.component.scss')]
})

export class InputDatePickerComponent  {
    @Input() formControlDate: FormControl;
    @Input() placeholder: string = 'Date';
    @Input() disabled: boolean = false;
    @Input() dateFormat: string = 'yyyy/MM/dd';

    ngOnInit() {

    }

    onChange(event): void {
        this.formControlDate.setValue((new Date(event)).getTime());
    }
}
