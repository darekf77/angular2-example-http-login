import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

export function HeaderSpecs() {


    describe('HeaderComponent (inline template)', () => {

        let comp: HeaderComponent;
        let fixture: ComponentFixture<HeaderComponent>;
        let de: DebugElement;
        let el: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderComponent], // declare the test component
            });

            fixture = TestBed.createComponent(HeaderComponent);
            comp = fixture.componentInstance; // BannerComponent test instance            
        });

        it('should display original title', () => {
            de = fixture.debugElement.query(By.css('a.navbar-brand'));
            el = de.nativeElement;
            fixture.detectChanges();
            expect(el.textContent).toContain(comp.name);
        });

        it('should display signin button', () => {
            de = fixture.debugElement.query(By.css('ul'));
            el = de.nativeElement;
            fixture.detectChanges();
            expect(el.textContent).toContain('sign in');
        });
        

        it('should display logout button', () => {
            comp.isLoggedIn = true;
            de = fixture.debugElement.query(By.css('ul'));
            el = de.nativeElement;
            fixture.detectChanges();
            expect(el.textContent).toContain('logout');
        });

    });

}