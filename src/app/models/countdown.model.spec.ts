import { CountdownState, TimeUnits, FormState } from './countdown.model';

describe('Countdown Models', () => {

  describe('CountdownState', () => {
    it('should create a valid CountdownState object', () => {
      const now = new Date();
      const state: CountdownState = { eventName: 'Test Event', endDate: now };
      
      expect(state).toEqual({ eventName: 'Test Event', endDate: now });
      
      expect(state.eventName).toBe('Test Event');
      expect(state.endDate).toBe(now);
    });
  });

  describe('TimeUnits', () => {
    it('should create a valid TimeUnits object', () => {
      const timeUnits: TimeUnits = { days: 1, hours: 2, minutes: 30, seconds: 45 };

      expect(timeUnits).toEqual({ days: 1, hours: 2, minutes: 30, seconds: 45 });

      expect(timeUnits.days).toBe(1);
      expect(timeUnits.hours).toBe(2);
      expect(timeUnits.minutes).toBe(30);
      expect(timeUnits.seconds).toBe(45);
    });
  });

  describe('FormState', () => {
    it('should create a valid FormState object with string values', () => {
      const formState: FormState = { eventName: 'Test Event', endDate: '2023-12-31' };

      expect(formState).toEqual({ eventName: 'Test Event', endDate: '2023-12-31' });

      expect(formState.eventName).toBe('Test Event');
      expect(formState.endDate).toBe('2023-12-31');
    });
  });

});
