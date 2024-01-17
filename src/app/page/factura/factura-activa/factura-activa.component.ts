import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-factura-activa',
  templateUrl: './factura-activa.component.html',
  styleUrl: './factura-activa.component.css'
})
export class FacturaActivaComponent implements OnInit {

  public _searchForm: FormGroup | any;

  public operacionSelect: any[] = [];
  public estadoSelect: any[] = [];

  constructor(
    private builder: FormBuilder,
    private router: Router) {

  }
  ngOnInit(): void {
    this.initForms();
  }

  private initForms() {
    this._searchForm = this.builder.group({
      id_operacion: [null],
      id_estado: [null],
      tipo: [null],
      razon_social: [null],
      rfc: [null],
      serie: [null],
      folio: [null],
      total: [null],
      fecha_emision: [null],
      fecha_cierre: [null],
      descendente: [true],
    });
  }

  public async searchData() {

  }

  public async initCreateForm(){
    this.router.navigate(['/factura/new'])
  }
}