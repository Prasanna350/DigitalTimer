// Write your code here
import {Component} from 'react'
import './index.css'

const startPauseBtnContents = [
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
    text: 'Start',
    altText: 'play icon',
    status: 'Paused',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
    text: 'Pause',
    altText: 'pause icon',
    status: 'Running',
  },
]

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    minutes: 25,
    seconds: 0,
    settingTime: 25,
    buttonsDisabled: false,
  }

  intervalFun = () => {
    this.setState(prevState => {
      const {seconds, minutes} = prevState
      if (seconds === 0 && minutes === 0) {
        clearInterval(this.secondsTimeId) // Clear the interval when timer reaches 00:00
        return {isRunning: false, buttonsDisabled: false}
      }
      if (seconds === 0) {
        return {seconds: 59, minutes: minutes - 1}
      }
      return {seconds: seconds - 1}
    })
  }

  onStartTimer = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.secondsTimeId)
    } else {
      this.secondsTimeId = setInterval(this.intervalFun, 1000)
    }
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
      buttonsDisabled: true,
    }))
  }

  onDecrementTime = () => {
    const {settingTime, isRunning} = this.state
    if (settingTime > 0 && !isRunning) {
      this.setState(prevState => ({
        minutes: parseInt(prevState.minutes) - 1,
        settingTime: parseInt(prevState.settingTime) - 1,
      }))
    }
  }

  onIncrementTime = () => {
    const {settingTime, isRunning} = this.state
    if (settingTime < 60 && !isRunning) {
      this.setState(prevState => ({
        minutes: parseInt(prevState.minutes) + 1,
        settingTime: parseInt(prevState.settingTime) + 1,
      }))
    }
  }

  onResetBtn = () => {
    clearInterval(this.secondsTimeId)
    this.setState({
      isRunning: false,
      minutes: 25,
      seconds: 0,
      settingTime: 25,
      buttonsDisabled: false,
    })
  }

  render() {
    const {
      isRunning,
      minutes,
      seconds,
      settingTime,
      buttonsDisabled,
    } = this.state
    const minutesToDisplay = minutes > 9 ? minutes : `0${minutes}`
    const secondsToDisplay = seconds > 9 ? seconds : `0${seconds}`
    const settingTimeToDisplay =
      settingTime > 9 ? settingTime : `0${settingTime}`
    const statusObj = isRunning
      ? startPauseBtnContents[1]
      : startPauseBtnContents[0]
    const {imgUrl, text, altText, status} = statusObj

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="card-container">
          <div className="timer-bg-img">
            <div className="timer-white-bg">
              <h1 className="timer-time">
                {minutesToDisplay}:{secondsToDisplay}
              </h1>
              <p className="timer-status">{status}</p>
            </div>
          </div>
          <div className="timer-management-card">
            <div className="start-reset-div">
              <button
                type="button"
                className="start-pause-button"
                onClick={this.onStartTimer}
              >
                <img src={imgUrl} alt={altText} className="btn-icon" />
                <span className="btn-text">{text}</span>
              </button>
              <button
                type="button"
                className="start-pause-button"
                onClick={this.onResetBtn}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="btn-icon"
                />
                <span className="btn-text">Reset</span>
              </button>
            </div>
            <p className="setting-timer-head">Set Timer limit</p>
            <div className="setting-timer-card">
              <button
                type="button"
                className="in-de-btns"
                onClick={this.onDecrementTime}
                disabled={buttonsDisabled}
              >
                -
              </button>
              <p className="set-time-value">{settingTimeToDisplay}</p>
              <button
                type="button"
                className="in-de-btns"
                onClick={this.onIncrementTime}
                disabled={buttonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
