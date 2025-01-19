import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrackComponent } from './progress-track.component';

describe('ProgressTrackComponent', () => {
  let component: ProgressTrackComponent;
  let fixture: ComponentFixture<ProgressTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
