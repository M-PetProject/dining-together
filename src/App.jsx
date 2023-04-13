import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {RecoilRoot} from 'recoil';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import RootPage from './pages/RootPage.jsx';
import SecondPage from './pages/SecondPage.jsx';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SamplePage from './pages/sample/SamplePage.jsx';
import Layout from './layout/Layout.jsx';

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<RootPage/>}/>
                        <Route exact path="/second" element={<SecondPage/>}/>
                        <Route exact path="/sign-in" element={<SignInPage/>}/>
                        <Route exact path="/sign-up" element={<SignUpPage/>}/>
                        <Route exact path="/sample" element={<SamplePage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;
