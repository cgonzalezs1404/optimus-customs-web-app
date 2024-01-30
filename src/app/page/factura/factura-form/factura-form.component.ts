import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../../shared/service/service.index';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Router } from '@angular/router';

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

  public flatPickerOpt = {
    placeholder: 'dd/mm/yyyy',
    altFormat: 'd/m/Y',
    dateFormat: 'Y-m-d',
    altInput: true,
    enableTime: false,
    mode: 'single',
    locale: {}
  };

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private sessionService: service.SessionService,
    private operacionService: service.OperacionService,
    private facturaService: service.FacturaService,
    private facturaArchivoService: service.FacturaArchivoService,
    private estadoService: service.EstadoService,
    public fileService: service.FileService) {

  }
  async ngOnInit(): Promise<void> {
    this.initForms();
    await this.createList();
    this.session = await this.sessionService.getStorageData();
  }

  private async createList() {
    let response = await this.operacionService.getData('?page_size=9999&activo=true&finalizado=false').then((resp) => resp);
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
      codigo: [null],
      tipo: [null],
      folio: [null],
      rfc: [null],
      serie: [null],
      razon_social: [null],
      precio: [null],
      aprobado: [null],
      pagado: [null],
      descripcion: [null],
      fecha_emision: [null],
      fecha_cierre: [null],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: [null],
      archivo_xml: [null],
      archivo_pdf: [null]
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
    if (!file) { return; }

    if (file.type !== 'text/xml' && file.type !== 'application/pdf') {
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
      Toast.fire({ icon: 'warning', title: 'Archivo no soportado' });
      return;
    }

    if (file.type === 'text/xml') {


      const fileDataStr = await this.fileService.readFileAsync(file);
      const xmlString = await this.fileService.readXmlAsync(file);

      var xmlData = new DOMParser().parseFromString(xmlString, 'text/xml');
      const emisorRazonSocial = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Nombre');
      const emisorRfc = xmlData.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Rfc');
      const folio = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Folio');
      const serie = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Serie');
      const total = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Total');
      const fecha = xmlData.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Fecha');
      const descripcion = xmlData.getElementsByTagName('cfdi:Conceptos')[0].children;
      let conceptos: any = '';

      if (descripcion.length > 1) {
        for (var concepto of descripcion) {
          conceptos += `${concepto.getAttribute('Descripcion')}|`;
        }
      } else {
        conceptos = descripcion[0].getAttribute('Descripcion');
      }


      var emision = moment(fecha ? fecha : '').toDate();
      var cierre = moment(fecha ? fecha : '').add(10, 'd').toDate()
      var factura = {
        id_operacion: this._form.value.id_operacion,
        id_estado: 1,
        codigo: '',
        tipo: emisorRfc == 'LCO220224HN3' ? 'EMISOR' : 'RECEPTOR',
        folio: folio,
        rfc: emisorRfc,
        serie: serie,
        razon_social: emisorRazonSocial,
        precio: total,
        descripcion: conceptos,
        aprobado: false,
        pagado: false,
        fecha_emision: emision,
        fecha_cierre: cierre,
        creado_por: this.session.username,
        fecha_creacion: new Date(),
        actualizado_por: this.session.username,
        fecha_actualizacion: new Date(),
        activo: true,
        archivo_xml: { name: file.name, url: fileDataStr, file }
      };

      this.facturas.at(index).patchValue(factura);
    }

    if (file.type === 'application/pdf') {
      var fileDataStr = await this.fileService.readFileAsync(file);
      this.facturas.at(index).patchValue({ archivo_pdf: { name: file.name, url: fileDataStr, file } });
    }
  }

  public async submitForm() {
    this.formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    for (let factura of this.facturas.value) {
      var result = await this.facturaService.postData(factura);
      if (result.status === 200) {

        var xmlFormData: FormData = new FormData();
        xmlFormData.append('payload', JSON.stringify({
          id: 0,
          id_factura: result.body.data.id,
          nombre: factura.archivo_xml.name,
          url: '',
          creado_por: this.session.username,
          fecha_creacion: new Date(),
          actualizado_por: this.session.username,
          fecha_actualizacion: new Date(),
          activo: true
        }));
        xmlFormData.append(factura.archivo_xml.name, factura.archivo_xml.file);
        this.facturaArchivoService.postData(xmlFormData);

        var pdfFormData: FormData = new FormData();
        pdfFormData.append('payload', JSON.stringify({
          id: 0,
          id_factura: result.body.data.id,
          nombre: factura.archivo_pdf.name,
          url: '',
          creado_por: this.session.username,
          fecha_creacion: new Date(),
          actualizado_por: this.session.username,
          fecha_actualizacion: new Date(),
          activo: true
        }));
        pdfFormData.append(factura.archivo_pdf.name, factura.archivo_pdf.file);
        this.facturaArchivoService.postData(pdfFormData);
      }
    }
    setTimeout(() => {
      this.router.navigate(['/factura'])
    }, 500);
  }
}
