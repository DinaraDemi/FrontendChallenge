import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { CountdownService } from '../services/countdown.service'
import { FitTextDirective } from '../directives/fit-text.directive'
import { FormState } from '../models/countdown.model'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule, FitTextDirective],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent implements OnInit {
  formSubmitted = false

  formState: FormState = {
    eventName: '',
    endDate: '',
  }

  readonly FORM_CONSTRAINTS = {
    titleMaxLength: 50,
    minDate: new Date().toISOString().split('T')[0],
  }

  countdown$ = this.countdownService.getCountdown()
  displayedEventName = ''

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    const currentState = this.countdownService.getCurrentState()
    const { eventName, endDate } = currentState
    this.displayedEventName = eventName || 'Event name'
    this.formState = {
      eventName,
      endDate: endDate ? endDate.toISOString().split('T')[0] : '',
    }
  }

  saveEventDetails(): void {
    this.formSubmitted = true
    if (!this.formState.eventName || !this.formState.endDate) return

    this.displayedEventName = this.formState.eventName
    this.countdownService.setEventDetails(
      this.formState.eventName,
      new Date(this.formState.endDate),
    )
  }
}
