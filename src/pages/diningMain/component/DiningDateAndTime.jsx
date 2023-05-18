import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningDateAndTime extends Component {
    render() {
        const {isDate, date, nameOfDate, isTime, time, nameOfTime, handler} = this.props;
        return (
            <>
                {isDate &&
                    <TextField
                    type='date'
                    defaultValue={date}
                    fullWidth
                    onChange={(e) => handler(nameOfDate, e.target.value)}
                    />
                }
                {isTime &&
                    <TextField
                    type='time'
                    defaultValue={time}
                    fullWidth
                    onChange={(e) => handler(nameOfTime, e.target.value)}
                />
                }
            </>
        );
    }
}

DiningDateAndTime.propTypes = {
    date: PropTypes.string,
    time: PropTypes.string
};

export default DiningDateAndTime;