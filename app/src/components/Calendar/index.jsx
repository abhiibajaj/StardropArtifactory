import React from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: props.defaultValue ? props.defaultValue : new Date()
    }
  }

  handleChange = (date = new Date()) => {
    if (date !== null) {
      this.setState({ startDate: date })
      this.props.handleCalendar(date)
    }
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        value={this.state.startDate}
      />
    )
  }
}

export default Calendar
