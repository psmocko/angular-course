import { NgModule } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router';
import {AuthService} from './user/auth.service';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,    
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index';

import { EventsAppComponent } from './events-app.component'
import {NavBarComponent} from './nav/navbar.component'
import { TOASTR_TOKEN, IToastr } from './common/toastr.service';
import {CollapsableWellComponent} from './common/collapsable-well.component';
import {appRoutes} from './routes'
import { Error404Component } from './errors/404.component'
import { EventRouteActivatorService } from './events/event-details/event-route-activator.service'
import { EventsListResolverService } from './events/events-list-resolver.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

declare let toastr:IToastr;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsableWellComponent,
        DurationPipe      
    ],
    providers: [
        EventService, 
        { provide: TOASTR_TOKEN, useValue: toastr }, 
        //{provide: MinimalLogger, useExisting: Logger}  -- Fascade pattern
        //{provide: Logger, useFactory: factory()}       -- Factory complex objects
        EventRouteActivatorService,        
        EventsListResolverService,
        AuthService,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {
    
}

function checkDirtyState(component:CreateEventComponent){
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true;
}