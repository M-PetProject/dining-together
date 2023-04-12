import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RecoilRoot} from 'recoil';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;
