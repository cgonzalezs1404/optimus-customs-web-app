import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as localService from '../../service/service.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../shared/service/session.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MetaData } from '../../shared/interface/metadata';


@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

  @ViewChild('modalView', { read: TemplateRef }) _modalView: TemplateRef<any> | any;
  @ViewChild('tableHeaderHead') _tableHeaderHead: ElementRef<HTMLInputElement> | any;
  public _modalRef?: BsModalRef;
  public _dtData: MetaData = { data: [], meta: { totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false, nextPageUrl: '', previousPageUrl: '' } };
  public _dataObjectLength = 0;

  public giroSelect: any[] = [];
  public estadoSelect: any[] = [];
  public consumidorSelect: any[] = [];

  public modalConfig: any = {
    backdrop: true,
    keyboard: true,
    ignoreBackdropClick: true,
    animated: true,
    class: 'modal-lg'
  };

  public _form: FormGroup | any;
  public _searchForm: FormGroup | any;
  public formSubmitted: boolean = false;
  public session: any;


  constructor(
    private modalService: BsModalService,
    private loadingService: NgxSpinnerService,
    private giroService: localService.GiroService,
    private estadoService: localService.EstadoService,
    private consumidorService: localService.ConsumidorService,
    private operacionService: localService.OperacionService,
    private sessionService: SessionService,
    private builder: FormBuilder,
  ) {
    
  }

  public async ngOnInit(): Promise<void> {
    this.loadingService.show();
    this.initForms();
    this.session = await this.sessionService.getStorageData();
    await this.createList();
    
    this.loadingService.hide();
  }

  public async ngAfterViewInit(): Promise<void> {
    setTimeout(() => { this._dataObjectLength = this._tableHeaderHead.nativeElement.childElementCount; });
  }

  private async createList() {
    let response = await this.giroService.get('').then((resp) => resp);
    let giroList = response.body.data;

    giroList.forEach((element: any) => {
      this.giroSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.estadoService.get('').then((resp) => resp);
    let estadoList = response.body.data;

    estadoList.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.consumidorService.get('').then((resp) => resp);
    let consumidorList = response.body.data;

    consumidorList.forEach((element: any) => {
      this.consumidorSelect.push({ value: element.id, text: element.razon_social });
    });
    this.giroSelect = [...this.giroSelect];
    this.estadoSelect = [...this.estadoSelect];
    this.consumidorSelect = [...this.consumidorSelect];
  }

  private initForms() {
    console.log('hola');
    this._searchForm = this.builder.group({
      id_giro: [null],
      id_estado: [null],
      id_consumidor: [null],
      codigo: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
      descending: [null]
    });

    this._form = this.builder.group({
      id: [null],
      id_giro: [null, Validators.required],
      id_estado: [null, Validators.required],
      id_consumidor: [null, Validators.required],
      codigo: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: [null]
    });
  }

  public async searchData() {
    let urlFilters: string = `?page_number=1&page_size=100`
    for(var key in this._searchForm.value){
      console.log(`Key->${key} Value->${this._searchForm.value[key]}`);
      urlFilters+= this._searchForm.value[key] ? `&${key}=${this._searchForm.value[key]}` : '';
    }
    console.log(urlFilters);
    var result = await this.operacionService.getData(urlFilters);
    if(result.status === 200){
      this._dtData = result.body;
    }
    console.log(result);

  }

  public async submitForm() {
    this.formSubmitted = true;
    this._form.patchValue({
      id: 0,
      codigo: null,
      fecha_inicio: new Date(),
      fecha_fin: null,
      creado_por: this.session.username,
      fecha_creacion: new Date(),
      actualizado_por: this.session.username,
      fecha_actualizacion: new Date(),
      activo: true
    });
    if (this._form.invalid) {
      return;
    }

    var result = await this.operacionService.postData(JSON.stringify(this._form.value));
    if (result.status !== 200) {
      return;
    }

    this._modalRef?.hide();
    Swal.fire({
      title: "Resultado",
      text: "Registro creado",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
    });
    await this.searchData();
  }

  public modalShow(template: TemplateRef<void>): void {
    this._modalRef = this.modalService.show(template, this.modalConfig);
  }
}
