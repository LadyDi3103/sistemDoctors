import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { CitasService } from 'src/app/services/citas/citas.service';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es'
let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

export let INITIAL_EVENTS: EventInput[] = [];

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css'],
})
export class DatosPacienteComponent implements OnInit {
  constructor(private citasService: CitasService,private cdr: ChangeDetectorRef) {
    
    this.getCitas()
  }
  ngOnInit(): void {
  }
  edit = false;

  calendarOptions: CalendarOptions = {
    locale:esLocale,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    eventClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: INITIAL_EVENTS,
    titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' } // formato personalizado
};

  handleDateClick(arg: any) {
    console.log(this, 'THIS DENTRO');

    this.edit = true;
    console.log(this.edit, 'EDIT');
    alert('date click! ' + arg.dateStr);
  }
  async getCitas() {
    INITIAL_EVENTS= [];
    const result = await firstValueFrom(this.citasService.getCitas());
    console.log('Citas obtenidas:', result);

    for (let index = 0; index < result.length; index++) {
      const fechaFormateada = moment(result[index].fecha).format("YYYY-MM-DDTHH:mm:ss");

      const event = {
        id: createEventId(),
        title: result[index].motivo,
        start:fechaFormateada,
        // end: TODAY_STR + 'T15:00:00',
      };

      INITIAL_EVENTS.push(event);
      console.log(INITIAL_EVENTS);
    }
    // Forzar la actualización del calendario después de agregar las citas
    this.calendarOptions.events = [...INITIAL_EVENTS];
    this.cdr.detectChanges();
  }
}
