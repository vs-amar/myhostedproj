import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateDocumentsComponent } from './private-documents.component';

describe('PrivateDocumentsComponent', () => {
  let component: PrivateDocumentsComponent;
  let fixture: ComponentFixture<PrivateDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
