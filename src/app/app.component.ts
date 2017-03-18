import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import '../css/main.less';

@Component({
    selector: 'my-app',
    template: require('./app.component.html')
})

export class AppComponent {
    constructor(
        toastr: ToastsManager,
        vcRef: ViewContainerRef) {
        
        toastr.setRootViewContainerRef(vcRef);

    }

}
