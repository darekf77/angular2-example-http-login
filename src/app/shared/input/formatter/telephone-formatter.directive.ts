import { Directive, AfterViewInit, Input } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Phone } from './shared/interface/phone.interface';

@Directive({
    selector: '[telephone-formatter]'
})

export class TelephoneFormatterDirective implements AfterViewInit {
    @Input() typeAddress: NgModel; // PL / Abroad
    @Input() kind: NgModel; // tel mobile, tel, fax, tel/fax
    @Input() maskOnlyPrefix: boolean = false;

    private foreignCompany: number = 2; // enum ...
    private kindMobile: number = 2; // enum ...

    constructor(private control: NgControl) {
    }

    ngAfterViewInit(): void {

        this.control.valueChanges.subscribe((res) => {
            this.process(res);
        });

        if (this.typeAddress) {
            this.typeAddress.valueChanges.subscribe((value: any) => {
                this.process(this.control.value);
            });
        }

        if (this.kind) {
            this.kind.valueChanges.subscribe((value: any) => {
                this.process(this.control.value);
            });
        }

        setTimeout(() => this.process(this.control.value), 1000);
    }

    process(value: string) {
        if (value) {
            let phone: Phone = this.phoneSplit(value.replace(/-|\s/g, ''));

            if (!this.maskOnlyPrefix) {
                this.addMask(phone);
            }

            let val: string = (phone.prefix !== '') ? phone.prefix + ' ' + phone.number : phone.number;

            this.control.viewToModelUpdate(val);
            this.control.valueAccessor.writeValue(val);
        }
    }

    protected phoneSplit(phone: string): Phone {
        let prefix: string = '';

        if (!this.isForeignCompany()) {
            if (/^22/.test(phone)) {
                phone = phone.replace(/^22/g, '');
                prefix = '22';
            }

            if (/^\+48/.test(phone)) {
                phone = phone.replace(/^\+48/g, '');
                prefix = '+48';
            }

            if (/^\+\(48\)/.test(phone)) {
                phone = phone.replace(/^\+\(48\)/g, '');
                prefix = '+(48)';
            }
        }

        return {prefix: prefix, number: phone};
    }

    protected addMask(phone: Phone): void {
        let size: number = phone.number.length;

        switch (size) {
            case 4:
                phone.number = phone.number.replace(/^(\d{2})(\d{2})/, '$1 $2');
                break;
            case 5:
                phone.number = phone.number.replace(/^(\d{3})(\d{2})/, '$1 $2');
                break;
            case 6:
                phone.number = phone.number.replace(/^(\d{3})(\d{3})/, '$1 $2');
                break;
            case 7:
                phone.number = phone.number.replace(/^(\d{3})(\d{3})(\d{1})/, '$1 $2 $3');
                break;
            case 8:
                phone.number = phone.number.replace(/^(\d{3})(\d{3})(\d{2})/, '$1 $2 $3');
                break;
            case 9:
                if (this.isMobile() || this.isInfoLine(phone.number)) {
                    phone.number = phone.number.replace(/^(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                } else {
                    phone.number = phone.number.replace(/^(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                }
                break;
            default:
                break;
        }
    }

    isInfoLine(phone: string): boolean {
        let resp: boolean = false;
        let infoline: string[] = ['800', '801'];

        for (let num of infoline) {
            if (phone.match(new RegExp("^" + num, "g"))) {
                resp = true;
            }
        }

        return resp;
    }

    isForeignCompany(): boolean {
        return (this.typeAddress && parseInt(this.typeAddress.value, 10) === this.foreignCompany) ? true : false;
    }

    isMobile(): boolean {
        return (this.kind && parseInt(this.kind.value, 10) === this.kindMobile) ? true : false;
    }
}
