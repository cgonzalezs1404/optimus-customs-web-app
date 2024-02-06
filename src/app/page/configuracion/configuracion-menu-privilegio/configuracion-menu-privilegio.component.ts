import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MetaData, metaDataLength, newMetaData } from '../../../shared/interface/metadata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MenuPrivilegioService, MenuService, PrivilegioService, SessionService } from '../../../shared/service/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-configuracion-menu-privilegio',
  templateUrl: './configuracion-menu-privilegio.component.html',
  styleUrl: './configuracion-menu-privilegio.component.css'
})
export class ConfiguracionMenuPrivilegioComponent {
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

  public menuSelect: any[] = [];
  public privilegioSelect: any[] = [];

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
    private menuPrivilegioService: MenuPrivilegioService,
    private menuService: MenuService,
    private privilegioService: PrivilegioService
  ) {

  }
  async ngOnInit(): Promise<void> {
    this.initForms();
    this.session = await this.sessionService.getStorageData();
    await this.createList();
  }

  public async ngAfterViewInit(): Promise<void> {
    setTimeout(() => { this._dataObjectLength = this._tableHeaderHead.nativeElement.childElementCount; });
  }

  private async createList() {
    let response = await this.menuService.getData('?page_size=9999&activo=true').then((resp) => resp);
    let usuarioList = response.body.data;

    usuarioList.forEach((element: any) => {
      this.menuSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.privilegioService.getData('?page_size=9999&activo=true').then((resp) => resp);
    let privilegioList = response.body.data;

    privilegioList.forEach((element: any) => {
      this.privilegioSelect.push({ value: element.id, text: element.nombre });
    });

    this.menuSelect = [...this.menuSelect];
    this.privilegioSelect = [...this.privilegioSelect];
  }

  private initForms() {
    this._searchForm = this.builder.group({
      id_menu: [null],
      id_privilegio: [null],
      activo: [true],
      page_descending: [true]
    });

    this._form = this.builder.group({
      id: [null],
      id_menu: [null, Validators.required],
      id_privilegio: [null, Validators.required],
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
    var result = await this.menuPrivilegioService.getData(urlFilters);
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
      id_menu: null,
      id_privilegio: null,
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
        let result = await this.menuPrivilegioService.deleteData(item.id);
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
    if (this.isUpdate) { result = await this.menuPrivilegioService.putData(this._form.value.id, JSON.stringify(this._form.value)); }
    else { result = await this.menuPrivilegioService.postData(JSON.stringify(this._form.value)); }

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

  public catalogValue(name: string, value: any) {
    if (name == 'menu')
      return this.menuSelect.find(t => t.value === value).text;
    if (name == 'privilegio')
      return this.privilegioSelect.find(t => t.value === value).text;
    return '...';
  }
}