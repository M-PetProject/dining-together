import { Routes, BrowserRouter, Route, Navigate, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import SecondPage from './pages/sample/SecondPage.jsx';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SamplePage from './pages/sample/SamplePage.jsx';
import Layout from './layout/Layout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SampleDetailPage from './pages/sample/SampleDetailPage.jsx';
import SampleWritePage from './pages/sample/SampleWritePage.jsx';
import { useAuth } from './util/hooks';
import AddTeamPage from './pages/team/AddTeamPage.jsx';
import SelectTeamPage from './pages/team/SelectTeamPage.jsx';
import TeamMemberInfoPage from './pages/team/TeamMemberInfoPage.jsx';
import NoticeDetail from './pages/notice/NoticeDetail.jsx';
import DiningDetailsPage from './pages/diningMain/DiningDetailsPage.jsx';
import RcmPalceDetailsPage from './pages/recommand/RcmPalceDetailsPage.jsx'
import NoticeWrite from './pages/notice/NoticeWrite.jsx';
import RoundTab from './components/RoundTab.jsx';
import PlaceWritePage from './pages/place/PlaceWritePage';
import PlaceDetailPage from './pages/place/PlaceDetailPage';
import MemberPage from './pages/MemberPage.jsx';
import EditMemberPage from './pages/EditMemberPage.jsx';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
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
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
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

  return isLogin ? <>{children}</> : <Navigate to="/sign-in" />;
}

export default App;
