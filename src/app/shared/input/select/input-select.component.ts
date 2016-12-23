import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { InputSelectOption } from './input-select-option.interface';

@Component({
    selector: 'ecrm-input-select',
    templateUrl: 'input-select.component.html'
})

export class InputSelectComponent {
    @Input() loadingId: string = 'county';
    @Input() label: string;
    @Input() control: FormControl;
    @Input() value: any;
    @Input() options: InputSelectOption[];
    @Input() isDisabled: boolean = false;
    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    handlerChange(e) {
        this.changed.emit(this.value ? this.value : this.control.value);
    }
}
