import { TestBed } from '@angular/core/testing';
import { CountdownService } from './countdown.service';
import { CountdownState } from '../models/countdown.model';
import { take } from 'rxjs/operators';

describe('CountdownService', () => {
  let service: CountdownService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial state from localStorage', () => {
    const mockState: CountdownState = { eventName: 'Test Event', endDate: new Date('2030-01-01T00:00:00Z') };
    localStorage.setItem('countdown_state', JSON.stringify(mockState));
    const serviceInstance = new CountdownService();
    const state = serviceInstance.getCurrentState();
    expect(state.eventName).toBe('Test Event');
    expect(state.endDate.toISOString()).toBe(new Date(mockState.endDate).toISOString());
  });

  it('should set event details and update localStorage', () => {
    const eventName = 'New Event';
    const endDate = new Date('2030-01-01T00:00:00Z');
    service.setEventDetails(eventName, endDate);
    const state = service.getCurrentState();
    expect(state.eventName).toBe(eventName);
    expect(state.endDate.toISOString()).toBe(endDate.toISOString());
    expect(localStorage.getItem('countdown_state')).toContain(eventName);
  });

  it('should calculate time difference correctly', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const timeUnits = service['calculateTimeDifference'](future);
    expect(timeUnits.days).toBe(1);
    expect(timeUnits.hours).toBe(0);
    expect(timeUnits.minutes).toBe(0);
    expect(timeUnits.seconds).toBe(0);
  });

  it('should emit a formatted countdown string', (done) => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
    service.setEventDetails('Event', future);
    service.getCountdown().pipe(take(1)).subscribe(value => {
      expect(value).toMatch(/\d+ days, \d+ h, \d+ m, \d+ s/);
      done();
    });
  });
});
