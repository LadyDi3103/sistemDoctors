import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fadeInAnimation } from './fade-in.animation';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  animations: [fadeInAnimation],
})
export default class HomeAdminComponent implements OnInit {

cols = 3;
rowHeight = '300px';

constructor(private responsive: BreakpointObserver){

}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.responsive.observe([
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape,
  ])
    .subscribe(result =>{
      this.cols = 3;
      this.rowHeight = '300px';

      const breakpoints = result.breakpoints;
      if(breakpoints[Breakpoints.TabletLandscape]){
        this.cols = 3;
      }else if (breakpoints[Breakpoints.TabletPortrait]){
        this.cols = 2;
      }else if (breakpoints[Breakpoints.HandsetLandscape]){
        this.cols = 2;
      }else if (breakpoints[Breakpoints.HandsetPortrait]){
        this.cols = 1;
        this.rowHeight = '250px';
      }
    })
}






  servicios = [
    {
      titulo: 'BOTOX',
      imagen: '../../../assets/servicios/botox.jpg',
      descripcion: 'Descripción del Servicio 1'
    },
    {
      titulo: 'FILLERS',
      imagen: '../../../assets/servicios/filler-estetica.png',
      descripcion: 'Descripción del Servicio 2'
    },
    {
      titulo: 'LÁSER',
      imagen: '../../../assets/servicios/laserl.jpg',
      descripcion: 'Descripción del Servicio 3'
    }
  ];

}