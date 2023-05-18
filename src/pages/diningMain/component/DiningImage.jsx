import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Button } from '@mui/material';

const DiningImage = ({name, src, alt, handler}) => {
    const [ path, setPath ] = useState(src);
    const imgRef = useRef();

    const showImg = () => {
        const imageFile = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => {
            setPath(reader.result);
        };
        handler(name, imageFile);
    };
    
    console.log("ref -> ", imgRef)


    return (
        <Stack>
            <Box
                component="img"
                sx={{
                    height: 250,
                    width: 410,
                }}
                alt={alt}
                src={path? path : '/image/noImage.png'}
            />
            <input 
                accept="image/*"
                type="file"
                id="select-image"
                onChange={showImg}
                ref={imgRef}
                style={{ display: 'none' }}
            />
            <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                    이미지추가
                </Button>
            </label>
        </Stack>
    );

}
// "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
DiningImage.propTypes = {
    alt: PropTypes.string,
};

export default DiningImage;