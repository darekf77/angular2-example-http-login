import { Directive, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[number-formatter]',
    providers: []
})

export class NumberFormatterDirective implements AfterViewInit {

    constructor(private control: NgControl) {
    }

    ngAfterViewInit(): void {

        this.control.valueChanges.subscribe((res) => {
            this.process(res);
        });

        setTimeout(() => this.process(this.control.value), 1000);
    }

    process(value: string) {
        if (value) {
            value = value.toString();
            value = value.replace(/-|\s/g, '');
            value = this.format(value);

            this.control.viewToModelUpdate(value);
            this.control.valueAccessor.writeValue(value);
        }
    }

    format(n) {
        return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
    }
}
