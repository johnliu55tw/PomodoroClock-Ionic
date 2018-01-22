import {HeartRateSensor} from 'heart-rate'

export const StatWidgetState = {
  hrm: 'hrm',
  none: 'none'
}

export function StatWidget (statWidgetState) {
  if (statWidgetState) {
    this.state = statWidgetState
  } else {
    this.state = StatWidgetState.hrm
  }
  this.hrm = new HeartRateSensor()
  if (this.state === StatWidgetState.hrm) {
    this.hrm.start()
  }

  this.nextState = () => {
    switch (this.state) {
      case StatWidgetState.hrm:
        this.state = StatWidgetState.none
        this.hrm.stop()
        break
      case StatWidgetState.none:
        this.state = StatWidgetState.hrm
        this.hrm.start()
        break
    }
  }
}
