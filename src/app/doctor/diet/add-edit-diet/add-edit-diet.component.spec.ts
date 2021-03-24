import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDietComponent } from './add-edit-diet.component';

describe('AddEditDietComponent', () => {
  let component: AddEditDietComponent;
  let fixture: ComponentFixture<AddEditDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
