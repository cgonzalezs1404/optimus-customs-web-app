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

  }


  public async searchData() {

  }

  public async initCreateForm() {

  }
}
