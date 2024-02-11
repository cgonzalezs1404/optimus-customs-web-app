import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/service/loading.service';
import { FacturaService } from '../../shared/service/factura.service';
import { OperacionService } from '../../shared/service/operacion.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public facturasMes: any[] = [];
  public _totalFacturasMes: number = 0;
  public _totalFacturasActivasMes: number = 0;
  public _totalFacturasPendientesMes: number = 0;
  public _totalFacturasPagadasMes: number = 0;


  constructor(
    private facturaService: FacturaService,
    private operacionService: OperacionService
  ) {

  }
  async ngOnInit() {
    var facturasResult = await this.facturaService.getData(`?page_size=9999`);
    if (facturasResult.status !== 200) {
      return;
    }

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.facturasMes = facturasResult.body.data.filter((x: any) => new Date(x.fecha_emision) >= new Date(firstDay) && new Date(x.fecha_emision) <= new Date(lastDay) && x.activo === true);
    this._totalFacturasMes = this.facturasMes.length;
    this._totalFacturasPendientesMes = this.facturasMes.filter((x: any) => x.pagado === false && x.aprobado === false && x.activo === true).length;
    this._totalFacturasActivasMes = this.facturasMes.filter((x: any) => x.pagado === false && x.aprobado === true && x.activo === true).length;
    this._totalFacturasPagadasMes = this.facturasMes.filter((x: any) => x.pagado === true && x.aprobado === true && x.activo === true).length;

  }


}
