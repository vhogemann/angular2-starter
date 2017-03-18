import {Component} from '@angular/core';
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Component({
    selector: 'about',
    template: require('./about.component.html')
})
export class AboutComponent {

    static allowedRoles(): Array<string>{
        return ['systemAdmin','defaultUser', 'customer'];
    }

    error : string;

    constructor( private toastr : ToastsManager ) { }

    
}
