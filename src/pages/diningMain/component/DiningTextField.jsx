import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningTextField extends Component {
    render() {
        return (
            <TextField
                id="outlined-multiline-flexible"
                label={this.props.placeholder}
                multiline
                maxRows={4}
                disabled={this.props.isDisabled}
            />
        );
    }
}

DiningTextField.propTypes = {

};

export default DiningTextField;