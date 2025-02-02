import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, timer } from 'rxjs'
import { map, distinctUntilChanged, share } from 'rxjs/operators'
import { CountdownState, TimeUnits } from '../models/countdown.model'

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private readonly STORAGE_KEY = 'countdown_state'
  private readonly INITIAL_STATE: CountdownState = {
    eventName: '',
    endDate: new Date(),
  }

  private state$ = new BehaviorSubject<CountdownState>(this.loadInitialState())

  private loadInitialState(): CountdownState {
    const savedState = localStorage.getItem(this.STORAGE_KEY)
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        return {
          ...this.INITIAL_STATE,
          ...parsedState,
          endDate: new Date(parsedState.endDate),
        }
      } catch (error) {
        console.error('Error parsing saved countdown state:', error)
      }
    }
    return this.INITIAL_STATE
  }

  setEventDetails(eventName: string, endDate: Date): void {
    const newState: CountdownState = { eventName, endDate }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newState))
    this.state$.next(newState)
  }

  getCountdown(): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        const timeUnits = this.calculateTimeDifference(this.state$.value.endDate)
        return this.formatTimeUnits(timeUnits)
      }),
      distinctUntilChanged(),
      share(),
    )
  }

  private calculateTimeDifference(endDate: Date): TimeUnits {
    const now = Date.now()
    const distance = endDate.getTime() - now

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    }
  }

  private formatTimeUnits({ days, hours, minutes, seconds }: TimeUnits): string {
    return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }

  getCurrentState(): CountdownState {
    return this.state$.value
  }
}
