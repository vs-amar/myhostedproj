import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerticularDocumentForEmployeeComponent } from './perticular-documentForEmployee.component';

describe('PerticularDocumentComponent', () => {
  let component: PerticularDocumentForEmployeeComponent;
  let fixture: ComponentFixture<PerticularDocumentForEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerticularDocumentForEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerticularDocumentForEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
