import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

class DiningDate extends Component {
    render() {
        const {startDate, endDate, handler} = this.props;

        return (
            <>
                <TextField
                    type='date'
                    defaultValue={startDate}
                    onChange = {(e) => handler('startDate', e.target.value)}
                />
                <Typography>
                    ~
                </Typography>
                <TextField
                    type='date'
                    defaultValue={endDate}
                    onChange = {(e) => handler('endDate', e.target.value)}
                />
            </>
        );
    }
}

DiningDate.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string
};

export default DiningDate;