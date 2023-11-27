import { TestBed } from '@angular/core/testing';

import { UsuarioTokenService } from './usuario-token.service';

describe('UsuarioTokenService', () => {
  let service: UsuarioTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
