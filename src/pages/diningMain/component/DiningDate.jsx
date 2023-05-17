import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

class DiningDate extends Component {
    render() {
        return (
            <>
                <TextField
                    type='date'
                    defaultValue={this.props.startDate}
                    onChange={(startDate) => setValue('startDateForDiningMain', dayjs(startDate).format('YYYY-MM-DD'))}
                />
                <Typography>
                    ~
                </Typography>
                <TextField
                    type='date'
                    defaultValue={this.props.endDate}
                    onChange={(endDate) => setValue('endDateForDiningMain', dayjs(endDate).format('YYYY-MM-DD'))}
                />
            </>
        );
    }
}

DiningDate.propTypes = {

};

export default DiningDate;