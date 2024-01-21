import { TestBed } from '@angular/core/testing';

import { FacturaArchivoService } from './factura-archivo.service';

describe('FacturaArchivoService', () => {
  let service: FacturaArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
