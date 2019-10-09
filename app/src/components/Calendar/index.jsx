import React from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
class Calendar extends React.Component {
  state = {
    startDate: null
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    }, () => {
      this.props.myfunc()
    });
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

export default Calendar;