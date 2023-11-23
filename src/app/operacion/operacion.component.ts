import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/service/service.index';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

  constructor(private loadingService: LoadingService) {

  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    setTimeout(() => { this.loadingService.setLoading(false); }, 500);
  }
}
