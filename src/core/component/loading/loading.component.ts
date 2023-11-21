import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../service/service.index';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) {

  }

  ngOnInit(): void {

  }
}
