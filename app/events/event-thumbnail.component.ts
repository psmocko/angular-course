import { Component, Input } from '@angular/core';
import { IEvent } from './shared/index'

@Component({
    selector: 'event-thumbnail',
    templateUrl: 'app/events/event-thumbnail.component.html',
    styles:[`
        .green { color: #003300 !important; }
        .bold { font-weight: bold; }
        .thumbnail {min-height: 210px;}
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
    `]
})
export class EventThumbnailComponent{
    @Input() event:IEvent;  
    getStartTimeClass(){
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return {green: isEarlyStart, bold: isEarlyStart};

        /* if (this.event && this.event.time === '8:00 am')
            return ['green', 'bold'];
        return []; */
    }   
    
    getStartTimeStyle():any{
        if (this.event && this.event.time === '8:00 am')
            return {color: 'green', 'font-weight': 'bold'};
        return {};
    }
}
