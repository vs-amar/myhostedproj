import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMeetingsComponent } from './scheduled-meetings.component';

describe('ScheduledMeetingsComponent', () => {
  let component: ScheduledMeetingsComponent;
  let fixture: ComponentFixture<ScheduledMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
