import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedetailComponent } from './stagedetail.component';

describe('StagedetailComponent', () => {
  let component: StagedetailComponent;
  let fixture: ComponentFixture<StagedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagedetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
