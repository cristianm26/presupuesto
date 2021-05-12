import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textoIncorrecto: string;

  constructor(private presupuestoService : PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textoIncorrecto = ''
  }

  ngOnInit(): void {
  }
  agregarGasto() {

    if (this.cantidad> this.presupuestoService.restante) {
      this.formularioIncorrecto=true;
      this.textoIncorrecto='Cantidad ingresada al mayor restante';
      return 
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
    } else {
      //Creamos el Objeto
      const Gasto = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }
      //Enviamos el objetos a los subscriptores via subject
      this.presupuestoService.agregarGasto(Gasto)
      //Reiniciar Formulario
      

      this.formularioIncorrecto = false;
      this.nombreGasto='';
      this.cantidad=0
    }
  }
}
