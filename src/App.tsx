import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageView from "@/pages/login/view/LoginPageView";
import MainPage from "./pages/main/Mainpage";
import ScheduleCreationView from "@/pages/ScheduleCreationPage/ScheduleCreationView";
// import Test from './components/test/Test';

import { AccessTokenProvider } from "./context/AccessTokenContext";
import ReviewForm from "./pages/ScheduleReview/form/presenter/ReviewFormPresenter";
import PlaceInfo from "./pages/placeInfo/view/PlaceInfo";
import ReviewDetailPage from "./pages/ScheduleReview/details/ReviewDetailPage";
import ScheduleListPresenter from "./pages/ScheduleReview/lists/presenter/ScheduleListPresenter";

import ScheduleResultPageView from "./pages/ScheduleResultPage/ScheduleResultPageView";
import MyPageView from "./pages/myPage/MyPagePresenter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import SavedSchedulePageView from "./pages/SavedSchedulePage/SavedSchedulePageView";
const queryClient = new QueryClient();

function App() {
  return (
    <AccessTokenProvider>
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient}>
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
            <Route path="/reviews" element={<ScheduleListPresenter />}></Route>
            <Route
              path="/reviews/new/:type/:keyword?"
              element={<ReviewForm />}
            />
            <Route path="/reviews/:id" element={<ReviewDetailPage />} />
            <Route path="/myPageView" element={<MyPageView />} />
            <Route
              path="/schedules/:schedule_id"
              element={<SavedSchedulePageView />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      {/* </AuthProvider> */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AccessTokenProvider>
  );
}

export default App;
