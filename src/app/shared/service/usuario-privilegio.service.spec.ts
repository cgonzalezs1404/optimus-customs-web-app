import { TestBed } from '@angular/core/testing';

import { UsuarioPrivilegioService } from './usuario-privilegio.service';

describe('UsuarioPrivilegioService', () => {
  let service: UsuarioPrivilegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioPrivilegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
