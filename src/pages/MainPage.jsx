import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      Hello, It's Main Page
      <div>
        <Link to="second">To SecondPage</Link>
      </div>
    </div>
  );
};

export default MainPage;
