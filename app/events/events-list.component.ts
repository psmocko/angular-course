import {Component, OnInit} from '@angular/core'
import {EventService} from './shared/event.service'
import {IEvent} from './shared/index'

@Component({    
    templateUrl: 'app/events/events-list.component.html'
})
export class EventsListComponent implements OnInit{
  events:IEvent[];
  constructor(private eventService: EventService){           
  } 
 
  ngOnInit(){
    this.eventService.getEvents().subscribe(events => {this.events = events});
  }
}