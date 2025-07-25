import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentInscriptionComponent } from './parent-inscription.component';

describe('ParentInscriptionComponent', () => {
  let component: ParentInscriptionComponent;
  let fixture: ComponentFixture<ParentInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
