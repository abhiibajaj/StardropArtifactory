import React from 'react';  

const Input = (props) => {
    return (  
  <div className="form-group">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <input
      className="form-input"
      id={props.name}
      name={props.name}
      type={props.type}
      defaultValue={props.value}
      onChange={props.handleChange}
    />
  </div>
)
}

export default Input;