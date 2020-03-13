import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermationDilogComponent } from './confermation-dilog.component';

describe('ConfermationDilogComponent', () => {
  let component: ConfermationDilogComponent;
  let fixture: ComponentFixture<ConfermationDilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfermationDilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfermationDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
