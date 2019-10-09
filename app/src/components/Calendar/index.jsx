import React from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: null
    }
  }

  handleChange = date => {
    this.setState(
      {
        startDate: date
      },
      () => {
        this.props.myfunc(this.state.startDate)
      }
    )
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        value={this.props.defaultValue ? this.props.defaultValue : ""}
      />
    )
  }
}

export default Calendar
