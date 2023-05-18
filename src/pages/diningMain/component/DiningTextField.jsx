import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningTextField extends Component {
    render() {
        const {placeholder, name, value, isDisabled, handler} = this.props;
        
        return (
            <TextField
                id="outlined-multiline-flexible"
                label={placeholder}
                defaultValue={value}
                multiline
                maxRows={4}
                minRows={4}
                fullWidth
                disabled={isDisabled}
                onChange={(e) => {handler(name, e.target.value)}}
            />
        );
    }
}

DiningTextField.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default DiningTextField;