import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { CitasService } from 'src/app/services/citas/citas.service';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateCitaComponent } from '../../../components/create-cita/create-cita/create-cita.component';

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
  edit = false;

  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    eventClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: INITIAL_EVENTS,
    titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }, // formato personalizado
  };

  constructor(
    public dialog: MatDialog,
    private citasService: CitasService,
    private cdr: ChangeDetectorRef
  ) {
    this.getCitas();
  }

  ngOnInit(): void {
    // Tu código de inicialización aquí si es necesario
  }

  handleDateClick(arg: any) {
    this.edit = true;

    const fechaHoraCita = new Date(arg.dateStr).toLocaleString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const detallesCita = `
      <div style="text-align: left;">
        --------------------------------------------------------------------------------<br>
        <strong>Fecha y Hora de Cita:</strong> ${fechaHoraCita}<br>
        <strong>Nombre Paciente:</strong> Lucas Vega<br>
        <strong>Sexo:</strong> Masculino<br>
        <strong>Fecha de Nacimiento:</strong> 31/03/1987<br>
        <strong>Número de contacto:</strong> 999 999 999<br>
        <strong>Correo:</strong> ejemplo@ejemplo.com<br>
        <strong>Dirección:</strong> midireccion<br>
        <strong>Tratamiento:</strong> Botox<br>
        <strong>Estado:</strong> Pending/ Cancelado/ Confirmado
      </div>
    `;

    Swal.fire({
      title: 'Detalles de la Cita',
      icon: 'info',
      html: detallesCita,
      showCloseButton: true,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: 'Thumbs up, great!',
      customClass: {
        confirmButton: 'celeste-button', // Agrega una clase personalizada al botón OK
      },
    });
  }

  async getCitas() {
    INITIAL_EVENTS = [];
    const result = await firstValueFrom(this.citasService.getCitas());
    console.log('Citas obtenidas:', result);

    for (let index = 0; index < result.length; index++) {
      const fechaFormateada = moment(result[index].fecha).format(
        'YYYY-MM-DDTHH:mm:ss'
      );

      const event = {
        id: createEventId(),
        title: result[index].motivo,
        start: fechaFormateada,
      };

      INITIAL_EVENTS.push(event);
    }

    // Forzar la actualización del calendario después de agregar las citas
    this.calendarOptions.events = [...INITIAL_EVENTS];
    this.cdr.detectChanges();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCitaComponent, {
      width: '950px', // ajusta el ancho según tus necesidades
      data: {}, // puedes pasar datos al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró', result);
      // Puedes realizar acciones después de que se cierre el diálogo si es necesario
    });
  }
}
