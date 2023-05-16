import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningInput extends Component {
    render() {
        return (
            <TextField
                id="outlined-multiline-flexible"
                label={this.props.placeholder}
                multiline
                maxRows={1}
                disabled={this.props.isDisabled}
            />
        );
    }
}

DiningInput.propTypes = {
    placeHolder: PropTypes.string
};

export default DiningInput;