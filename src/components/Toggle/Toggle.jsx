import React from 'react';
import "./Toggle.css";

const Toggle = ({ onChange }) => {
    return (
        // <InputWrapper value="Numbers?">
        //     <span>Numbers?</span>
        //     <Input type="checkbox" name="useNumbers" onChange={onChange} />
        //     <Slider />
        // </InputWrapper>

        <label>
            <span>Numbers?</span>
            <input type="checkbox" name='useNumbers' onChange={onChange} />
            <span className="slider" />
        </label>
    );
};

export default Toggle;
