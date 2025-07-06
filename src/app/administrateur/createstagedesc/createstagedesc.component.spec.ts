import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestagedescComponent } from './createstagedesc.component';

describe('CreatestagedescComponent', () => {
  let component: CreatestagedescComponent;
  let fixture: ComponentFixture<CreatestagedescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatestagedescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestagedescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
