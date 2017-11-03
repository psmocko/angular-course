import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import {JQ_TOKEN} from './jquery.service';

@Component({
    selector: 'simple-modal', 
    templateUrl: 'app/common/simple-modal.component.html',
    styles: [`
        .modal-body {height: 250px; overflow-y: scroll; }
    `]
})

export class SimpleModalComponent{
    @Input() title:string;
    @Input() elementId: string;
    @Input() closeOnBodyClick: string;
    @ViewChild('modalcontainer') containerEl: ElementRef // gets the dom element for the child view

    constructor(@Inject(JQ_TOKEN) private $:any){

    }

    closeModal(){
        if(this.closeOnBodyClick.toLocaleLowerCase() === 'true')
            this.$(this.containerEl.nativeElement).modal('hide');
    }
}