import React from 'react'

const CustomerInput = (props) => {
    const {type, label, i_class, name, change}=props;
    return (
        <div class="form-floating mb-3">
            <input type={type} class={`form-control ${i_class}`} placeholder={label} name={name} onChange={change}/>
                <label htmlFor={label}></label>
        </div>
    )
}

export default CustomerInput;
