import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

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
