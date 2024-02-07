import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEstadoComponent } from './catalogo-estado.component';

describe('CatalogoEstadoComponent', () => {
  let component: CatalogoEstadoComponent;
  let fixture: ComponentFixture<CatalogoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
