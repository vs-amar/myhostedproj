import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDocumentComponent } from './add-new-document.component';

describe('AddNewDocumentComponent', () => {
  let component: AddNewDocumentComponent;
  let fixture: ComponentFixture<AddNewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
