import React from 'react';
import ErrorImage from '/public/images/no_img.jpg';
import { string } from 'prop-types';
import PropTypes from 'prop-types';

const ImageError: React.FC = ({ imgUrl, ...rest }) => {
  function onErrorImage(e: React.ChangeEvent<HTMLImageElement>): void {
    e.target.src = ErrorImage;
  }
  return <img src={imgUrl} onError={onErrorImage} {...rest} />;
};

ImageError.propTypes = {
  imgUrl: PropTypes.string,
};
export default ImageError;
