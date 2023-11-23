import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/service/loading.service';
import { CoreModule } from '../../core/core.module';

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
    setTimeout(() => { this.loadingService.setLoading(false); }, 1000);

  }


}
