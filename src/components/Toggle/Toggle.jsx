import React from 'react';
import "./Toggle.css";

const Toggle = ({ onChange }) => {
    return (

        <label>
            <span>Numbers?</span>
            <input type="checkbox" name='useNumbers' onChange={onChange} />
            <span className="slider" />
        </label>
    );
};

export default Toggle;
