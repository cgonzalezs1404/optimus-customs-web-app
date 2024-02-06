import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPrivilegioComponent } from './configuracion-privilegio.component';

describe('ConfiguracionPrivilegioComponent', () => {
  let component: ConfiguracionPrivilegioComponent;
  let fixture: ComponentFixture<ConfiguracionPrivilegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionPrivilegioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
