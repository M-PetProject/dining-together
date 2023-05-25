import { Routes, BrowserRouter, Route, Navigate, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SecondPage from './pages/sample/SecondPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SamplePage from './pages/sample/SamplePage';
import Layout from './layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import SampleDetailPage from './pages/sample/SampleDetailPage';
import SampleWritePage from './pages/sample/SampleWritePage';
import { useAuth } from './util/hooks';
import AddTeamPage from './pages/team/AddTeamPage';
import SelectTeamPage from './pages/team/SelectTeamPage';
import TeamMemberInfoPage from './pages/team/TeamMemberInfoPage';
import NoticeDetail from './pages/notice/NoticeDetail';
import DiningDetailsPage from './pages/diningMain/DiningDetailsPage';
import RcmPalceDetailsPage from './pages/recommand/RcmPalceDetailsPage';
import NoticeWrite from './pages/notice/NoticeWrite';
import RoundTab from './components/RoundTab';
import PlaceWritePage from './pages/place/PlaceWritePage';
import PlaceDetailPage from './pages/place/PlaceDetailPage';
import MemberPage from './pages/MemberPage';
import EditMemberPage from './pages/EditMemberPage';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import { isEmptyObj } from './util/cm_util';
const materialTheme = materialExtendTheme();

const App = () => {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        {' '}
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <TeamRoute>
                    <MainPage />
                  </TeamRoute>
                }
              />
              <Route exact path="/team">
                <Route
                  exact
                  path="add"
                  element={
                    <PrivateRoute>
                      <AddTeamPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="select"
                  element={
                    <PrivateRoute>
                      <SelectTeamPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="info"
                  element={
                    <PrivateRoute>
                      <TeamMemberInfoPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route exact path="/notice">
                <Route
                  path=":idx"
                  element={
                    <PrivateRoute>
                      <NoticeDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <PrivateRoute>
                      <NoticeWrite />
                    </PrivateRoute>
                  }
                />
                <Route path="edit">
                  <Route
                    path=":idx"
                    element={
                      <PrivateRoute>
                        <NoticeWrite />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
              <Route exact path="/dining-main">
                <Route
                  path="add"
                  element={
                    <PrivateRoute>
                      <DiningDetailsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path=":idx"
                  element={
                    <PrivateRoute>
                      <DiningDetailsPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route exact path="/recommand">
                <Route
                  path="place"
                  element={
                    <PrivateRoute>
                      <RcmPalceDetailsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path=":idx"
                  element={
                    <PrivateRoute>
                      <RcmPalceDetailsPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route exact path="/place">
                <Route
                  exact
                  path="write"
                  element={
                    <PrivateRoute>
                      <PlaceWritePage />
                    </PrivateRoute>
                  }
                />
                <Route path="edit">
                  <Route
                    path=":idx"
                    element={
                      <PrivateRoute>
                        <PlaceWritePage />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path=":idx"
                  element={
                    <PrivateRoute>
                      <PlaceDetailPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route exact path="/tab" element={<RoundTab />} />
              <Route exact path="/second" element={<SecondPage />} />
              <Route exact path="/sign-in" element={<SignInPage />} />
              <Route exact path="/sign-up" element={<SignUpPage />} />
              <Route exact path="/sample">
                <Route path="list" element={<SamplePage />} />
                <Route path=":idx" element={<SampleDetailPage />} />
                <Route path="write" element={<SampleWritePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/member/:userId" element={<MemberPage />}></Route>
              <Route path="/member/edit/:userId" element={<EditMemberPage />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

function PrivateRoute(props) {
  let { children } = props;
  const { isLogin } = useAuth();

  return isLogin ? <>{children}</> : <Navigate to="/sign-in" replace />;
}

function TeamRoute(props) {
  const { teamMember } = useAuth();

  if (isEmptyObj(teamMember)) {
    return <Navigate to="/team/select" replace />;
  }
  return PrivateRoute(props);
}

export default App;
