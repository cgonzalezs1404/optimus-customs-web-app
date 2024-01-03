import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/service/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private loadingService: LoadingService) {

  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
  }


}
