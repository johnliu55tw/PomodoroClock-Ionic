export const DatetimeWidgetState = {
  time: 'time',
  date: 'date',
  day: 'day',
  none: 'none'
}

export function DatetimeWidget (datetimeState) {
  if (datetimeState) {
    this.state = datetimeState
  } else {
    this.state = DatetimeWidgetState.time
  }

  this.nextState = () => {
    switch (this.state) {
      case DatetimeWidgetState.time:
        this.state = DatetimeWidgetState.date
        break
      case DatetimeWidgetState.date:
        this.state = DatetimeWidgetState.day
        break
      case DatetimeWidgetState.day:
        this.state = DatetimeWidgetState.none
        break
      case DatetimeWidgetState.none:
        this.state = DatetimeWidgetState.time
        break
    }
  }
}
