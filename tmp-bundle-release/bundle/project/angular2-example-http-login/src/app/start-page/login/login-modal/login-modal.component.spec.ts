import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import { TranslateModule, TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';


import { LoginModalComponent } from './login-modal.component';

export function LoginModalSpecs() {


    describe('LoginModal (inline template)', () => {

        let comp: LoginModalComponent;
        let fixture: ComponentFixture<LoginModalComponent>;
        let de: DebugElement;
        let el: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [LoginModalComponent,], // declare the test component
                imports: [FormsModule]
            });

            fixture = TestBed.createComponent(LoginModalComponent);
            comp = fixture.componentInstance; // BannerComponent test instance
        });

        it('should display error message when incorrect credentials', () => {
            comp.modal.incorrectCredentials = true;
            de = fixture.debugElement.query(By.css('.error-message'));
            el = de.nativeElement;
            fixture.detectChanges();
            expect(el.textContent).toContain('Failed to sign in! Please check your credentials and try again.');
        });
    });

}