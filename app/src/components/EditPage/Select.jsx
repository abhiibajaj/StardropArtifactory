import React from 'react'

const Select = (props) => {
    return(
        <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <select
              name={props.name}
              defaultValue={props.value}
              onChange={props.handleChange}
              multiple={true}
              >
              <option value="" disabled></option>
              {props.options.map(option => {
                return (
                  <option
                    key={option}
                    value={option}
                    label={option}>{option}
                  </option>
                );
              })}
            </select>
      </div>)
}

export default Select;