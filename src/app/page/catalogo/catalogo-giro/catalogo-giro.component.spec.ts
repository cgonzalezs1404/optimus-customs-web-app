import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoGiroComponent } from './catalogo-giro.component';

describe('CatalogoGiroComponent', () => {
  let component: CatalogoGiroComponent;
  let fixture: ComponentFixture<CatalogoGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoGiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
