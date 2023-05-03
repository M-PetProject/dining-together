import { Routes, BrowserRouter, Route, Navigate, useNavigate } from 'react-router-dom';
import RootPage from './pages/RootPage.jsx';
import SecondPage from './pages/sample/SecondPage.jsx';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SamplePage from './pages/sample/SamplePage.jsx';
import Layout from './layout/Layout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SampleDetailPage from './pages/sample/SampleDetailPage.jsx';
import SampleWritePage from './pages/sample/SampleWritePage.jsx';
import { useAuth } from './util/hooks';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <RootPage />
              </PrivateRoute>
            }
          />
          <Route exact path="/sample">
            <Route path="list" element={<SamplePage />} />
            <Route path=":idx" element={<SampleDetailPage />} />
            <Route path="write" element={<SampleWritePage />} />
          </Route>
          <Route exact path="/second" element={<SecondPage />} />
          <Route exact path="/sign-in" element={<SignInPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

function PrivateRoute(props) {
  let { children } = props;
  const { isLogin } = useAuth();
  console.log('isLogin', isLogin);

  return isLogin ? <>{children}</> : <Navigate to="/sign-in" />;
}

export default App;
