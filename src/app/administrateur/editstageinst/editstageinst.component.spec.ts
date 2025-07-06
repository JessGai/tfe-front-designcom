import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstageinstComponent } from './editstageinst.component';

describe('EditstageinstComponent', () => {
  let component: EditstageinstComponent;
  let fixture: ComponentFixture<EditstageinstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditstageinstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstageinstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
