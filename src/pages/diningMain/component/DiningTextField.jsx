import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningTextField extends Component {
    render() {
        return (
            <TextField
                id="outlined-multiline-flexible"
                label={this.props.placeholder}
                defaultValue={this.props.text}
                multiline
                maxRows={4}
                rows={4}
                fullWidth
                disabled={this.props.isDisabled}
            />
        );
    }
}

DiningTextField.propTypes = {

};

export default DiningTextField;