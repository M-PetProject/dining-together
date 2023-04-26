import React from 'react';
import PropTypes from 'prop-types';

/**
 * 공백
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Gap = (props) => {
  const { width, height } = props;
  return <div style={{ width: `${width}px`, height: `${height}px` }} />;
};
/// 타입 검사 (타입 불일치 시, 런타임 에러 발생)
Gap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

/// 기본값
Gap.defaultProps = {
  width: 0,
  height: 0,
};

export default Gap;
