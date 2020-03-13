import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDocumentsForEmployeeComponent } from "./AllDocumentsForEmployeeComponent";

describe('AllDocumentsComponent', () => {
  let component: AllDocumentsForEmployeeComponent;
  let fixture: ComponentFixture<AllDocumentsForEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDocumentsForEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocumentsForEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
