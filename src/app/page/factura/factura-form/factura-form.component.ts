import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrl: './factura-form.component.css'
})
export class FacturaFormComponent implements OnInit {

  public _form: FormGroup | any;

  constructor(private builder: FormBuilder) {

  }
  ngOnInit(): void {
    this.initForms();
    this.addFactura();
  }

  private initForms() {
    this._form = this.builder.group({
      facturas: this.builder.array([])
    });
  }

  public get facturas() {
    return this._form.controls["facturas"];
  }

  public addFactura() {
    const facturaForm = this.builder.group({
      id_operacion: [null],
      id_estado: [null],
      tipo: [null],
      folio: [null],
      rfc: [null],
      serie: [null],
      razon_social: [null],
      precio: [null],
      fecha_emision: [null],
      fecha_cierre: [null],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: [null]
    });

    this.facturas.push(facturaForm);
  }

  public deleteFactura(facturaIndex: number) {
    this.facturas.removeAt(facturaIndex);
  }

  public async importFile(event: any, index: number): Promise<void> {

    console.log(event);
    let xmlFile: File = event.target.files[0];

    if (!xmlFile) { return; }

    console.log(xmlFile);
    
    const xmlString = await this.readXmlAsync(xmlFile);
    var xmlData = new DOMParser().parseFromString(xmlString, 'text/xml');
    const emisorRazonSocial = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Nombre');
    const emisorRfc = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Rfc');
    const folio = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Folio');
    const serie = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Serie');
    const total = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Total');
    const fecha = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Fecha');

    var factura = {
      id_operacion: 0,
      id_estado: 0,
      tipo: '',
      folio: folio,
      rfc: emisorRfc,
      serie: serie,
      razon_social: emisorRazonSocial,
      precio: total,
      fecha_emision: fecha,
      fecha_cierre: null,
      creado_por: null,
      fecha_creacion: new Date(),
      actualizado_por: null,
      fecha_actualizacion: new Date(),
      activo: true
    };

    this.facturas.at(index).patchValue(factura);
  }

  public readXmlAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  public async readFileAsync(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
