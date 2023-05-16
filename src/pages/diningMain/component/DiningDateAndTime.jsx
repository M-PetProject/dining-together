import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningDateAndTime extends Component {
    render() {
        return (
            <>
                <TextField
                    type='date'
                    onChange={(endDate) => setValue('endDate', dayjs(endDate).format('YYYYMMDD'))}
                />
                <TextField
                    type='time'
                    onChange={(time) => setValue('time', dayjs(time).format('HHmm'))}
                />
            </>
        );
    }
}

DiningDateAndTime.propTypes = {

};

export default DiningDateAndTime;