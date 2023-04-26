import React from 'react';
import PropTypes from 'prop-types';
import './chkbox.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * Primary UI component for user interaction
 */
export const ChkBox = ({isDefaultChecked, isDisabled, isRequired, size, label}) => {
    return (
        <div
            className={['chkbox', `chkbox--${size}`].join(' ')}
        >
            <FormControlLabel 
                control={<Checkbox defaultChecked={isDefaultChecked} size={size} />} 
                disabled={isDisabled}
                label={label} 
                required={isRequired}
            />
        </div>
    )
}

ChkBox.propTypes = {
  /**
   * What background color to use
   */
   isDefaultChecked: PropTypes.bool,
   isDisabled: PropTypes.bool,
   isRequired: PropTypes.bool,
   size: PropTypes.string,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

ChkBox.defaultProps = {
    isDefaultChecked: false,
    isDisabled: false,
    isRequired: false,
    size: 'medium',
    onClick: undefined,
};
