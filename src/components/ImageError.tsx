import React from 'react';
import ErrorImage from '/public/images/onErrorImage.jpeg';
import { string } from 'prop-types';

const ImageError: React.FC = ({ imgUrl, ...rest }) => {
  function onErrorImage(e) {
    e.target.src = ErrorImage;
  }
  return <img src={imgUrl} onError={onErrorImage} {...rest} />;
};

ImageError.propTypes = {
  imgUrl: string,
};
export default ImageError;
