import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

class DiningImage extends Component {
    render() {
        return (
            <Box
                component="img"
                sx={{
                    height: 250,
                    width: 395,
                }}
                alt={this.props.alt}
                src={this.props.src? this.props.src : '/image/noImage.png'}
            />
        );
    }
}
// "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
DiningImage.propTypes = {

};

export default DiningImage;