import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestageinstComponent } from './createstageinst.component';

describe('CreatestageinstComponent', () => {
  let component: CreatestageinstComponent;
  let fixture: ComponentFixture<CreatestageinstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatestageinstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestageinstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
