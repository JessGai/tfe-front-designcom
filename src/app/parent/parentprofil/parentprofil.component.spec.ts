import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentprofilComponent } from './parentprofil.component';

describe('ParentprofilComponent', () => {
  let component: ParentprofilComponent;
  let fixture: ComponentFixture<ParentprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentprofilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
