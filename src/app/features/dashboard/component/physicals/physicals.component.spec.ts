import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalsComponent } from './physicals.component';

describe('PhysicalsComponent', () => {
  let component: PhysicalsComponent;
  let fixture: ComponentFixture<PhysicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhysicalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
