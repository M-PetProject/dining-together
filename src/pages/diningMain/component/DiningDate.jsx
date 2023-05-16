import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

class DiningDate extends Component {
    render() {
        return (
            <>
                <TextField
                    type='date'
                    onChange={(startDate) => setValue('startDateForDiningMain', dayjs(startDate).format('YYYYMMDD'))}
                />
                <Typography>
                    ~
                </Typography>
                <TextField
                    type='date'
                    onChange={(endDate) => setValue('endDateForDiningMain', dayjs(endDate).format('YYYYMMDD'))}
                />
            </>
        );
    }
}

DiningDate.propTypes = {

};

export default DiningDate;