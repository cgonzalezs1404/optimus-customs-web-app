import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MetaData, metaDataLength, newMetaData } from '../../../shared/interface/metadata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { SessionService } from '../../../shared/service/session.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrl: './configuracion-usuario.component.css'
})
export class ConfiguracionUsuarioComponent implements OnInit {

  @ViewChild('modalView', { read: TemplateRef }) _modalView: TemplateRef<any> | any;
  @ViewChild('tableHeaderHead') _tableHeaderHead: ElementRef<HTMLInputElement> | any;
  public _modalRef?: BsModalRef;
  public _dtData: MetaData = newMetaData;
  public _dataPageLength: number[] = metaDataLength;
  public _dataObjectLength = 0;

  public _form: FormGroup | any;
  public _searchForm: FormGroup | any;
  public formSubmitted: boolean = false;
  public isUpdate: boolean = false;
  public session: any;

  public modalConfig: any = {
    backdrop: true,
    keyboard: true,
    ignoreBackdropClick: true,
    animated: true,
    class: 'modal-xl'
  };

  constructor(
    private modalService: BsModalService,
    private builder: FormBuilder,
    private sessionService: SessionService,
    private usuarioService: UsuarioService) {

  }
  async ngOnInit(): Promise<void> {
    this.initForms();
    this.session = await this.sessionService.getStorageData();
  }

  public async ngAfterViewInit(): Promise<void> {
    setTimeout(() => { this._dataObjectLength = this._tableHeaderHead.nativeElement.childElementCount; });
  }

  private initForms() {
    this._searchForm = this.builder.group({
      nombres: [null],
      apellido_paterno: [null],
      apellido_materno: [null],
      correo_electronico: [null],
      activo: [true],
      page_descending: [true]
    });

    this._form = this.builder.group({
      id: [null],
      nombres: [null, Validators.required],
      apellido_paterno: [null, Validators.required],
      apellido_materno: [null, Validators.required],
      correo_electronico: [null, Validators.required],
      creado_por: [null],
      fecha_creacion: [null],
      actualizado_por: [null],
      fecha_actualizacion: [null],
      activo: [null]
    });
  }

  public async searchData() {
    let urlFilters: string = '';
    urlFilters += `?page_number=${(this._dtData.metadata.currentPage !== 0) ? this._dtData.metadata.currentPage : 1}`
    urlFilters += `&page_size=${(this._dtData.metadata.pageSize !== 0) ? this._dtData.metadata.pageSize : 10}`
    for (var key in this._searchForm.value) {
      urlFilters += this._searchForm.value[key] !== null ? `&${key}=${this._searchForm.value[key]}` : '';
    }
    var result = await this.usuarioService.getData(urlFilters);
    if (result.status === 200) {
      this._dtData = result.body;
    }
  }

  public async initCreateForm() {
    this.isUpdate = false;
    this.formSubmitted = false;
    this._form.reset();
    this._form.patchValue({
      id: 0,
      nombres: null,
      apellido_paterno: null,
      apellido_materno: null,
      correo_electronico: null,
      creado_por: this.session.username,
      fecha_creacion: new Date(),
      actualizado_por: this.session.username,
      fecha_actualizacion: new Date(),
      activo: true
    });
    this.modalShow(this._modalView);
  }

  public async initEditForm(item: any) {
    this.isUpdate = true;
    this._form.reset();
    this._form.patchValue(item);
    this.modalShow(this._modalView);
  }

  public async initDeleteForm(item: any) {
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
        let result = await this.usuarioService.deleteData(item.id);
        if (result.status === 200) {
          const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
          Toast.fire({ icon: 'success', title: 'Borrado Correcto' });
          await this.searchData();
        }
      }
    });
  }

  public async submitForm() {
    this.formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    let result: any;
    if (this.isUpdate) { result = await this.usuarioService.putData(this._form.value.id, JSON.stringify(this._form.value)); }
    else { result = await this.usuarioService.postData(JSON.stringify(this._form.value)); }

    if (result.status !== 200) {
      return;
    }

    this._modalRef?.hide();
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } });
    Toast.fire({ icon: 'success', title: this.isUpdate ? 'Actualizacion Correcto' : 'Creación Correcto' });
    await this.searchData();
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
}
