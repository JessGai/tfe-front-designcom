import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchildtostageComponent } from './addchildtostage.component';

describe('AddchildtostageComponent', () => {
  let component: AddchildtostageComponent;
  let fixture: ComponentFixture<AddchildtostageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddchildtostageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddchildtostageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
