import React from 'react';
import { Link } from 'react-router-dom';

const RootPage = () => {
  return (
    <div>
      Hello, It's Main Page
      <div>
        <Link to="second">To SecondPage</Link>
      </div>
      <div>
        <Link to="/sample/list">To SamplePage</Link>
      </div>
    </div>
  );
};

export default RootPage;
