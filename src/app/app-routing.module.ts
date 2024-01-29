import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PacientesComponent } from './views/dashboard/Pacientes/pacientes.component';
import { CreaPacienteComponent } from './views/dashboard/crea-paciente/crea-paciente.component';
import { HistorialComponent } from './views/dashboard/Historial-atenciones/historial.component';
import HomeAdminComponent from './views/home-admin/home-admin.component';
import { DoctoresComponent } from './views/dashboard/doctores/doctores.component';
import { DatosPacienteComponent } from './views/dashboard/full-calendar/datos-paciente.component';
import { StadisticsComponent } from './components/dashboard/stadistics/stadistics.component';
import { ListaCitasComponent } from './views/dashboard/lista-citas/lista-citas.component';

const routes: Routes = [

  {
    path: '' ,//TODO: http://localhost:4200/ <--- /login
    // loadChildren: ()=> import(`./modules/home/home.module`).then(m => m.HomeModule)
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login' ,//TODO: http://localhost:4200/ <--- /login
    component: LoginComponent,
  },
  {
    path: 'home' ,//TODO: http://localhost:4200/ <--- /home
    component: HomeAdminComponent
  },
  // {
  //   path: '**' ,//TODO: cualquier ruta redirijirá al home
  //   redirectTo: 'home' , pathMatch: 'full'
  // },
  // {
  //   path: 'dashboard' ,//TODO: http://localhost:4200/ <--- /home
  //   loadChildren: ()=> import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
  // },
  {
    path: 'dashboard' ,//TODO: http://localhost:4200/ <--- /home
    component: DashboardComponent,
    children:[
      {
        path:'' ,
        component: StadisticsComponent,
      },
      {
        path:'doctores' ,
        component: DoctoresComponent,
      },
      {
        path:'pacientes' ,
        component: PacientesComponent,
      },
      {
        path:'datos-del-paciente' ,
        component: DatosPacienteComponent,
      },
      {
        path:'crear-paciente' ,
        component: CreaPacienteComponent,
      },
      {
        path:'lista-citas' ,
        component: ListaCitasComponent,
      },
      {
        path:'historial' ,
        component: HistorialComponent,
      
      },

    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
