import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { CountdownComponent } from './countdown.component'
import { CountdownService } from '../services/countdown.service'
import { FitTextDirective } from '../directives/fit-text.directive'

describe('CountdownComponent', () => {
  let component: CountdownComponent
  let fixture: ComponentFixture<CountdownComponent>
  let countdownService: jasmine.SpyObj<CountdownService>

  beforeEach(async () => {
    const countdownServiceSpy = jasmine.createSpyObj('CountdownService', [
      'getCountdown',
      'setEventDetails',
      'getCurrentState',
    ])

    countdownServiceSpy.getCurrentState.and.returnValue({
      eventName: 'Test Event',
      endDate: new Date('2025-02-02'),
    })
    countdownServiceSpy.getCountdown.and.returnValue(of('0 days, 0 h, 0 m, 0 s'))

    await TestBed.configureTestingModule({
      imports: [FormsModule, CountdownComponent, FitTextDirective],
      providers: [{ provide: CountdownService, useValue: countdownServiceSpy }],
    }).compileComponents()

    countdownService = TestBed.inject(CountdownService) as jasmine.SpyObj<CountdownService>
    fixture = TestBed.createComponent(CountdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges() 
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should initialize form state with valid current state', () => {
      expect(component.displayedEventName).toBe('Test Event')
      expect(component.formState.eventName).toBe('Test Event')

      const expectedDate = new Date('2025-02-02').toISOString().split('T')[0]
      expect(component.formState.endDate).toBe(expectedDate)
    })
  })

  describe('saveEventDetails', () => {
    it('should set formSubmitted to true and call setEventDetails when the form is valid', () => {
      const newEventName = 'New Event'
      const newEndDate = new Date().toISOString().split('T')[0]
      component.formState.eventName = newEventName
      component.formState.endDate = newEndDate

      component.saveEventDetails()

      expect(component.formSubmitted).toBeTrue()
      expect(component.displayedEventName).toBe(newEventName)
      expect(countdownService.setEventDetails).toHaveBeenCalledWith(newEventName, jasmine.any(Date))
    })

    it('should set formSubmitted to true and not call setEventDetails if the form is invalid', () => {
      component.formState.eventName = ''
      component.formState.endDate = ''

      component.saveEventDetails()

      expect(component.formSubmitted).toBeTrue()
      expect(countdownService.setEventDetails).not.toHaveBeenCalled()
    })
  })

  describe('countdown$', () => {
    it('should emit the countdown value from the service', (done) => {
      component.countdown$.subscribe(value => {
        expect(value).toBe('0 days, 0 h, 0 m, 0 s')
        done()
      })
    })
  })
})
