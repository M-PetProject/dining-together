import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

class DiningButton extends Component {
    render() {
        return <Button variant={this.props.btnType} fullWidth>{this.props.name}</Button>;
    }
}

DiningButton.propTypes = {
    name: PropTypes.string,
    btnType: PropTypes.string
};

export default DiningButton;