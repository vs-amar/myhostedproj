import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerticularDocumentComponent } from './perticular-document.component';

describe('PerticularDocumentComponent', () => {
  let component: PerticularDocumentComponent;
  let fixture: ComponentFixture<PerticularDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerticularDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerticularDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
