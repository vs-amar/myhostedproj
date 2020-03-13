import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocshareListComponent } from './docshare-list.component';

describe('DocshareListComponent', () => {
  let component: DocshareListComponent;
  let fixture: ComponentFixture<DocshareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocshareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocshareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
