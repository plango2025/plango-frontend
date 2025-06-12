import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import LoginPresenter from "./pages/LoginPage/LoginPresenter";
import MainPage from "./pages/MainPage/Mainpage";
import ScheduleCreationView from "@/pages/ScheduleCreationPage/ScheduleCreationView";
import MyPageView from "./pages/myPage/MyPageView";
import ScheduleResultPageView from "@/pages/ScheduleResultPage/ScheduleResultPageView";

import { useState } from "react";
function App() {
  const [accessToken, serAccessToken] = useState<String | null>(null);
=======
import LoginPageView from '@/pages/login/LoginPageView'
import MainPage from './pages/main/Mainpage';
import ScheduleCreationView from '@/pages/ScheduleCreation/ScheduleCreationView'
// import Test from './components/test/Test';

import { AccessTokenProvider } from './context/AccessTokenContext';
import ScheduleLists from './pages/ScheduleReview/lists/ScheduleLists';
import ReviewForm from './pages/ScheduleReview/form/ReviewForm';
import PlaceInfo from './pages/placeInfo/view/PlaceInfo';
import ReviewDetailPage from './pages/ScheduleReview/details/view/ReviewDetailPage';
function App() {
>>>>>>> origin/develop
  return (
    <AccessTokenProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route index path="/" element={<MainPage />}></Route> */}
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPageView />}></Route>
          <Route path="/schedule" element={<ScheduleCreationView />}></Route>
<<<<<<< HEAD
          <Route path="/myPage" element={<MyPageView />}></Route>
          <Route
            path="/scheduleResult"
            element={<ScheduleResultPageView />}
          ></Route>
=======
          {/* <Route path="/test" element={<MyEditor />}></Route> */}
          <Route path="/place" element={<PlaceInfo />}></Route>
          <Route path="/schdReviews" element={<ScheduleLists />}></Route>
          <Route path="/schdReview/new/:schedule_id" element={<ReviewForm />} />
          <Route path="/schdReviews/:id" element={<ReviewDetailPage />} />
>>>>>>> origin/develop
        </Routes>
      </BrowserRouter>
    </AccessTokenProvider>
  );
}

export default App;
