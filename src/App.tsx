import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageView from "@/pages/login/view/LoginPageView";
import MainPage from "./pages/main/Mainpage";
import ScheduleCreationView from "@/pages/ScheduleCreationPage/ScheduleCreationView";
// import Test from './components/test/Test';
import { AuthProvider } from "./context/AuthContext";

import { AccessTokenProvider } from "./context/AccessTokenContext";
import ReviewForm from "./pages/ScheduleReview/form/presenter/ReviewFormPresenter";
import PlaceInfo from "./pages/placeInfo/view/PlaceInfo";
import ReviewDetailPage from "./pages/ScheduleReview/details/ReviewDetailPage";
import ScheduleListPresenter from "./pages/ScheduleReview/lists/presenter/ScheduleListPresenter";

import ScheduleResultPageView from "./pages/ScheduleResultPage/ScheduleResultPageView";
import { MyPagePresenter } from "./pages/myPage/MyPagePresenter";
function App() {
  return (
    <AccessTokenProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginPageView />}></Route>
            <Route path="/schedule" element={<ScheduleCreationView />}></Route>
            <Route
              path="/scheduleResult"
              element={<ScheduleResultPageView />}
            ></Route>
            {/* <Route path="/test" element={<MyEditor />}></Route> */}
            <Route path="/place/:keyword" element={<PlaceInfo />} />
            <Route
              path="/schdReviews"
              element={<ScheduleListPresenter />}
            ></Route>
            <Route path="/schdReviews/new" element={<ReviewForm />} />
            <Route path="/schdReviews/:id" element={<ReviewDetailPage />} />
            <Route path="/myPageView" element={<MyPagePresenter />} />
            {/* <Route path="/test" element={<ReviewTestPage/>} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AccessTokenProvider>
  );
}

export default App;
