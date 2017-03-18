import {TestBed} from '@angular/core/testing';

import {AboutComponent} from './about.component';

import {ToastsManager} from "ng2-toastr/ng2-toastr";

describe('AboutComponent', () => {

    let toastrStub = {
        setRootViewContainerRef : () => {},
        error : () => {},
        success : () => {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({ 
            declarations: [AboutComponent],
            providers: [
                {
                    provide: ToastsManager,
                    useValue: toastrStub
                }
            ]
        });
    });

    it('should instantiate the AboutComponent', () => {
        let fixture = TestBed.createComponent(AboutComponent);
        expect(fixture.componentInstance instanceof AboutComponent).toBe(true, 'should create AboutComponent');
    });
});
