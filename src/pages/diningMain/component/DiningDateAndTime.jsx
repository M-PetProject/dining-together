import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class DiningDateAndTime extends Component {
    render() {
        return (
            <>
                {this.props.isDate &&
                    <TextField
                    type='date'
                    defaultValue={this.props.date}
                    onChange={(date) => setValue('date', dayjs(date).format('YYYY-MM-DD'))}
                    />
                }
                {this.props.isTime &&
                    <TextField
                    type='time'
                    defaultValue={this.props.time}
                    onChange={(time) => setValue('time', dayjs(time).format('HH:mm'))}
                />
                }
            </>
        );
    }
}

DiningDateAndTime.propTypes = {

};

export default DiningDateAndTime;