import { NgModule } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {AuthService} from './user/auth.service';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,    
    CreateSessionComponent,
    SessionListComponent,
    UpvoteComponent,
    DurationPipe,
    VoterService,
    LocationValidator,
    EventResolverService    
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import {NavBarComponent} from './nav/navbar.component';
import { JQ_TOKEN, TOASTR_TOKEN, IToastr, CollapsableWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index';
import {appRoutes} from './routes';
import { Error404Component } from './errors/404.component';
import { EventsListResolverService } from './events/events-list-resolver.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

declare let toastr:IToastr;
declare let jQuery:Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
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
        ModalTriggerDirective,
        DurationPipe,
        SimpleModalComponent,
        UpvoteComponent,
        LocationValidator     
    ],
    providers: [
        EventService, 
        { provide: TOASTR_TOKEN, useValue: toastr }, 
        { provide: JQ_TOKEN, useValue: jQuery }, 
        //{provide: MinimalLogger, useExisting: Logger}  -- Fascade pattern
        //{provide: Logger, useFactory: factory()}       -- Factory complex objects
        EventResolverService,        
        EventsListResolverService,
        AuthService,
        VoterService,
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