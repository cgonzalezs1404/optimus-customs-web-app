import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoConsumidorComponent } from './catalogo-consumidor.component';

describe('CatalogoConsumidorComponent', () => {
  let component: CatalogoConsumidorComponent;
  let fixture: ComponentFixture<CatalogoConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoConsumidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
