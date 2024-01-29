import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionActivaComponent } from './operacion-activa.component';

describe('OperacionActivaComponent', () => {
  let component: OperacionActivaComponent;
  let fixture: ComponentFixture<OperacionActivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperacionActivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperacionActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
