import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { ToastsManager } from 'ng2-toastr';

let toastsStub = {
    info: () => Promise.resolve('Okie Dokie'),
    setRootViewContainerRef: () => null
}

describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent],
        providers: [
            { provide: ToastsManager, useFactory: () => toastsStub }
        ]
    }));

    it('should instantiate the AppComponent', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});
