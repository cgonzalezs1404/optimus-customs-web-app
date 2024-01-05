import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoadingService } from '../../shared/service/loading.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

  //@ViewChild('modalView', { read: TemplateRef }) _modalView: TemplateRef<any> | any;
  public _modalRef?: BsModalRef;

  public people: any[] = [
    { id: 1, name: 'papa' }
  ]

  constructor(
    private loadingService: LoadingService,
    private modalService: BsModalService,
  ) {

  }
  ngOnInit(): void {

  }

  public modalShow(template: TemplateRef<void>): void {
    this._modalRef = this.modalService.show(template);
  }
}
