import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingScheduleDetailsComponent } from './meeting-schedule-details.component';

describe('MeetingScheduleDetailsComponent', () => {
  let component: MeetingScheduleDetailsComponent;
  let fixture: ComponentFixture<MeetingScheduleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingScheduleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
