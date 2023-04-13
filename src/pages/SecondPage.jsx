import React from 'react';
import {Link} from 'react-router-dom';

const SecondPage = () => {
  return (
    <div>
      Second Page
      <div>
        <Link to="/">To MainPage</Link>
      </div>
    </div>
  );
};

export default SecondPage;
