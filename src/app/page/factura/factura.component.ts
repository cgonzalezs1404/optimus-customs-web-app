import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {

  public _searchForm: FormGroup | any;

  public operacionSelect: any[] = [];
  public estadoSelect: any[] = [];

  constructor(private builder: FormBuilder) {

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
    
  }
}
