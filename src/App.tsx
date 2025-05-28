import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageView from '@/pages/login/LoginPageView'
import MainPage from './pages/main/Mainpage';
import ScheduleCreationView from '@/pages/ScheduleCreation/ScheduleCreationView'
// import Test from './components/test/Test';

import { AccessTokenProvider } from './context/AccessTokenContext';
import PlaceInfo from './pages/placeInfo/PlaceInfo';
import ScheduleLists from './pages/ScheduleReview/lists/ScheduleLists';
import ReviewForm from './pages/ScheduleReview/form/ReviewForm';
import ReviewDetailPage from './pages/ScheduleReview/details/ReviewDetailPage';
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
          <Route path="/placeInfo" element={<PlaceInfo />}></Route>
          <Route path="/schdReviews" element={<ScheduleLists />}></Route>
          <Route path="/schdReview/new" element={<ReviewForm />} />
          <Route path="/schdReviews/:id" element={<ReviewDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AccessTokenProvider>
  );
}

export default App;
