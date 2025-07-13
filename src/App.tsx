import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageView from "@/pages/login/LoginPageView";
import MainPage from "./pages/main/Mainpage";
import ScheduleCreationView from "@/pages/ScheduleCreationPage/ScheduleCreationView";
// import Test from './components/test/Test';

import { AccessTokenProvider } from "./context/AccessTokenContext";
import ScheduleLists from "./pages/ScheduleReview/lists/ScheduleLists";

import PlaceInfo from "./pages/placeInfo/view/PlaceInfo";
import ReviewDetailPage from "./pages/ScheduleReview/details/view/ReviewDetailPage";
import ScheduleResultPageView from "./pages/ScheduleResultPage/ScheduleResultPageView";
function App() {
  return (
    <AccessTokenProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route index path="/" element={<MainPage />}></Route> */}
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPageView />}></Route>
          <Route path="/schedule" element={<ScheduleCreationView />}></Route>
          {/* <Route path="/test" element={<MyEditor />}></Route> */}
          <Route path="/place" element={<PlaceInfo />}></Route>
          <Route
            path="/scheduleResult"
            element={<ScheduleResultPageView />}
          ></Route>
        
          <Route path="/schdReviews" element={<ScheduleLists />}></Route>
      
          <Route path="/schdReviews/:id" element={<ReviewDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AccessTokenProvider>
  );
}

export default App;
