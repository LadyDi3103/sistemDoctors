import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().slice(0, 10); // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++);
}

export const INITIAL_EVENTS: EventInput[] = [
 
];

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css'],
})
export class DatosPacienteComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const pacientes = [
      {
        id: createEventId(),
        title: 'All-day event',
        start: TODAY_STR,
      },
      {
        id: createEventId(),
        title: 'Timed event',
        start: TODAY_STR + 'T00:00:00',
        end: TODAY_STR + 'T03:00:00',
      },
      {
        id: createEventId(),
        title: 'Timed event',
        start: TODAY_STR + 'T12:00:00',
        end: TODAY_STR + 'T15:00:00',
      },
    ]
    INITIAL_EVENTS.push(...pacientes)
  }
  edit = false;

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    eventClick:this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: INITIAL_EVENTS,
  };
  handleDateClick(arg: any) {
    console.log(this,"THIS DENTRO");
    
    this.edit = true;
    console.log(this.edit, 'EDIT');
    alert('date click! ' + arg.dateStr);
  }
  
}
