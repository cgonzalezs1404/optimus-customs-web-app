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
  selector: 'app-factura-activa',
  templateUrl: './factura-activa.component.html',
  styleUrl: './factura-activa.component.css'
})
export class FacturaActivaComponent {
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

  public isUpdate: boolean = false;
  public formSubmitted: boolean = false;
  public isReject: boolean = false;

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
    private session: service.SessionService) {
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

    let response = await this.estadoService.get('?page_size=9999&activo=true').then((resp) => resp);
    let estadoList = response.body.data;

    estadoList.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.operacionService.getData('?page_size=9999&activo=true&finalizado=false').then((resp) => resp);
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
      pagado: [false],
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
      pagado: [null],
      fecha_emision: [null],
      fecha_cierre: [null],
      comentarios: [null],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: true
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
      console.log(this._dtData);
    }
  }

  public async initCreateForm() {
    this.router.navigate(['/factura/new'])
  }

  public async initEditForm(item: any) {
    this.formSubmitted = false;
    this.isReject = false;
    this.isUpdate = true;
    this._form.disable();
    this._form.reset();
    this._form.patchValue(item);
    this._form.controls.comentarios.setValidators(null);
    this._form.controls.comentarios.updateValueAndValidity();
    this.modalShow(this._modalView);
  }

  public async initDeleteForm(item: any) {
    this.formSubmitted = false;
    this.isReject = true;
    this.isUpdate = true;
    this._form.enable();
    this._form.reset();
    this._form.patchValue(item);
    this._form.controls.comentarios.setValidators([Validators.required]);
    this._form.controls.comentarios.updateValueAndValidity();
    this.modalShow(this._modalView);
  }

  public async submitForm(item: any) {
    this.formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    if (this.isReject) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: 'Esto no podrá revertirse',
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "!Sí, borralo!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          let facturasFile = await this.facturaArchivoService.getData(`?id_factura=${item.value.id}`);
          if (facturasFile.status !== 200) {
            return;
          }
          if (facturasFile.body.data.length !== 0) {
            for (let archivo of facturasFile.body.data) {
              archivo.id_drive;
              await this.facturaArchivoService.deleteData(archivo.id);
            }
          }
          item.patchValue({
            aprobado: false,
            pagado: false,
            activo: false
          });

          let result = await this.facturaService.putData(item.value.id, item.value);
          if (result.status === 200) {
            this._modalRef?.hide();
            const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
            Toast.fire({ icon: 'success', title: 'Borrado Correcto' });
            await this.searchData();
          }
        }
      });
    } else {
      item.patchValue({
        pagado: true,
        fecha_actualizacion: new Date(),
        actualizado_por: this._session.username
      });
      let result = await this.facturaService.putData(item.value.id, item.value);
      if (result.status === 200) {
        this._modalRef?.hide();
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
        Toast.fire({ icon: 'success', title: 'Aprobado Correcto' });
        await this.searchData();
      }
    }
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
