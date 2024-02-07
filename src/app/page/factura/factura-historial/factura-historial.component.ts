import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MetaData, metaDataLength, newMetaData } from '../../../shared/interface/metadata';
import * as service from '../../../shared/service/service.index';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-factura-historial',
  templateUrl: './factura-historial.component.html',
  styleUrl: './factura-historial.component.css'
})
export class FacturaHistorialComponent {
  @ViewChild('modalView', { read: TemplateRef }) _modalView: TemplateRef<any> | any;
  @ViewChild('tableHeaderHead') _tableHeaderHead: ElementRef<HTMLInputElement> | any;
  public _modalRef?: BsModalRef;

  public _searchForm: FormGroup | any;
  public _form: FormGroup | any;

  public _dtData: MetaData = newMetaData;
  public _dataPageLength: number[] = metaDataLength;
  public _dataObjectLength = 0;

  public operacionSelect: any[] = [];
  public estadoSelect: any[] = [];
  public aprobadoSelect: any[] = [{ value: true, text: 'SI' }, { value: false, text: 'NO' }]

  public isUpdate: boolean = false;
  public formSubmitted: boolean = false;

  public _session: any = null;

  public modalConfig: any = {
    backdrop: true,
    keyboard: true,
    ignoreBackdropClick: true,
    animated: true,
    class: 'modal-xl modal-dialog-centered'
  };

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
    private modalService: BsModalService,
    private builder: FormBuilder,
    private router: Router,
    private facturaService: service.FacturaService,
    private facturaArchivoService: service.FacturaArchivoService,
    private estadoService: service.EstadoService,
    private operacionService: service.OperacionService,
    private session: service.SessionService,
    public fileService: service.FileService) {
    moment.locale("es");
  }
  async ngOnInit(): Promise<void> {
    this.initForms();
    this._session = await this.session.getStorageData();
    await this.createList();
  }

  public async ngAfterViewInit(): Promise<void> {
    setTimeout(() => { this._dataObjectLength = this._tableHeaderHead.nativeElement.childElementCount; });
  }

  private async createList() {

    let response = await this.estadoService.getData('?page_size=9999&activo=true').then((resp) => resp);
    let estadoList = response.body.data;

    estadoList.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.operacionService.getData('?page_size=9999&activo=true').then((resp) => resp);
    let operacionList = response.body.data;

    operacionList.forEach((element: any) => {
      this.operacionSelect.push({ value: element.id, text: element.codigo });
    });

    this.estadoSelect = [...this.estadoSelect];
    this.operacionSelect = [...this.operacionSelect];
  }

  private initForms() {
    this._searchForm = this.builder.group({
      id_operacion: [null],
      id_estado: [null],
      codigo: [null],
      tipo: [null],
      razon_social: [null],
      rfc: [null],
      serie: [null],
      folio: [null],
      precio: [null],
      aprobado: [true],
      pagado: [true],
      fecha_emision: [null],
      fecha_cierre: [null],
      page_descending: [true],
      activo: [true],
    });

    this._form = this.builder.group({
      id: [null, Validators.required],
      id_operacion: [null, Validators.required],
      id_estado: [null, Validators.required],
      codigo: [null],
      tipo: [null],
      razon_social: [null],
      rfc: [null],
      serie: [null],
      folio: [null],
      precio: [null],
      descripcion: [null],
      aprobado: [null],
      rechazado: [null],
      pagado: [null],
      fecha_emision: [null],
      fecha_cierre: [null],
      comentarios: [null],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: true,
      archivo_xml: [null],
      archivo_pdf: [null],
    });
  }

  public async searchData() {
    let urlFilters: string = '';
    urlFilters += `?page_number=${(this._dtData.metadata.currentPage !== 0) ? this._dtData.metadata.currentPage : 1}`
    urlFilters += `&page_size=${(this._dtData.metadata.pageSize !== 0) ? this._dtData.metadata.pageSize : 10}`;

    for (var key in this._searchForm.value) {
      urlFilters += this._searchForm.value[key] !== null ? `&${key}=${this._searchForm.value[key]}` : '';
    }

    var result = await this.facturaService.getData(urlFilters);
    if (result.status === 200) {
      this._dtData = result.body;
    }
  }

  public async initCreateForm() {
    this.router.navigate(['/factura/new'])
  }

  public async initEditForm(item: any) {
    this.formSubmitted = false;
    this.isUpdate = true;
    this._form.disable();
    this._form.reset();
    var response = await this.facturaArchivoService.getData(`?page_size=9999&activo=true&id_factura=${item.id}&`);
    if (response.status === 200) {
      for (let file of response.body.data) {
        if (file.nombre.includes('.xml')) {
          item.archivo_xml = file;
        }
        else if (file.nombre.includes('.pdf')) {
          item.archivo_pdf = file;
        }
      }
    }
    this._form.patchValue(item);

    this.modalShow(this._modalView);
  }

  public modalShow(template: TemplateRef<void>): void {
    this._modalRef = this.modalService.show(template, this.modalConfig);
  }

  /* Data table */
  public async onChangeDataLength(event: any): Promise<void> {
    if (this._dtData.metadata) this._dtData.metadata.pageSize = event;
    await this.searchData();
  }

  public async pageChanged(event: PageChangedEvent): Promise<void> {
    if (this._dtData.metadata) this._dtData.metadata.currentPage = event.page;
    await await this.searchData();
  }

  public catalogValue(name: string, value: any) {
    if (name == 'operacion')
      return this.operacionSelect.find(t => t.value === value).text;
    if (name == 'estado')
      return this.estadoSelect.find(t => t.value === value).text;
    return '...';
  }
}
