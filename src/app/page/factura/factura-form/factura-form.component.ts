import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../../shared/service/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrl: './factura-form.component.css'
})
export class FacturaFormComponent implements OnInit {

  public _form: FormGroup | any;

  public operacionSelect: any[] = [];
  public estadoSelect: any[] = [];

  public isOpSelected: boolean = false;
  public formSubmitted: boolean = false;

  public session: any;


  constructor(
    private builder: FormBuilder,
    private sessionService: service.SessionService,
    private operacionService: service.OperacionService,
    private facturaService: service.FacturaService,
    private estadoService: service.EstadoService) {

  }
  async ngOnInit(): Promise<void> {
    this.initForms();
    await this.createList();
    this.session = await this.sessionService.getStorageData();
  }

  private async createList() {
    let response = await this.operacionService.getData('?page_size=9999&activo=true').then((resp) => resp);
    let operacionList = response.body.data;

    operacionList.forEach((element: any) => {
      this.operacionSelect.push({ value: element.id, text: element.codigo });
    });

    response = await this.estadoService.get('').then((resp) => resp);
    let estadoList = response.body.data;

    estadoList.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });

    this.operacionSelect = [...this.operacionSelect];
    this.estadoSelect = [...this.estadoSelect];
  }

  private initForms() {
    this._form = this.builder.group({
      id_operacion: [null, Validators.required],
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
      archivo_xml: [null],
      archivo_pdf: [null],
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

  public async operacionSelected(event: any) {
    if (!this.isOpSelected) {
      this.addFactura();
    }
    this.isOpSelected = true;
  }

  public async importFile(event: any, index: number): Promise<void> {

    let file: File = event.target.files[0];
    console.log(file);
    if (!file) { return; }

    if (file.type !== 'text/xml' && file.type !== 'application/pdf') {
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
      Toast.fire({ icon: 'warning', title: 'Archivo no soportado' });
      return;
    }

    if (file.type === 'text/xml') {
      const xmlString = await this.readXmlAsync(file);
      var xmlData = new DOMParser().parseFromString(xmlString, 'text/xml');
      const emisorRazonSocial = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Nombre');
      const emisorRfc = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Rfc');
      const folio = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Folio');
      const serie = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Serie');
      const total = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Total');
      const fecha = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Fecha');

      var fecha_emision = new Date(fecha ? fecha : '');
      var fecha_cierre = fecha_emision.setDate(fecha_emision.getDate() + 10);
      var factura = {
        id_operacion: this._form.value.id_operacion,
        id_estado: 1,
        tipo: emisorRfc == 'LCO220224HN3' ? 'EMISOR' : 'RECEPTOR',
        folio: folio,
        rfc: emisorRfc,
        serie: serie,
        razon_social: emisorRazonSocial,
        precio: total,
        fecha_emision: fecha_emision,
        fecha_cierre: fecha_emision,
        creado_por: this.session.username,
        fecha_creacion: new Date(),
        actualizado_por: this.session.username,
        fecha_actualizacion: new Date(),
        activo: true
      };

      this.facturas.at(index).patchValue(factura);
      //this.facturas.at(index).patchValue({ archivo_xml: { name: file.name, file } });
    }

    if (file.type === 'application/pdf') {
      //this.facturas.at(index).patchValue({ archivo_pdf: { name: file.name, file } });
    }

    console.log(this.facturas.at(index).value);
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

  public async submitForm() {
    this.formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    var payload = this.facturas.value;
    console.log(payload);
    var result = await this.facturaService.postDataBulk(JSON.stringify(payload));
    console.log(result);
  }
}
