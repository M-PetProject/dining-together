import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningInput extends Component {
    render() {
        const {placeholder, name, value, isDisabled, handler} = this.props;
        return (
            <TextField
                id="outlined-multiline-flexible"
                label={placeholder}
                defaultValue={value}
                multiline
                maxRows={1}
                fullWidth
                disabled={isDisabled}
                onChange={(e) => handler(name, e.target.value)}
            />
        );
    }
}

DiningInput.propTypes = {
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default DiningInput;