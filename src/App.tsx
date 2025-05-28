import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from './pages/LoginPage/LoginPresenter';
import MainPage from './pages/MainPage/Mainpage';
import ScheduleCreationView from '@/pages/ScheduleCreationPage/ScheduleCreationView'
import MyPageView from "./pages/myPage/MyPageView"

import { useState } from 'react';
function App() {
  const [accessToken, serAccessToken]= useState<String|null>(null)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index path="/" element={<MainPage />}></Route> */}
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPresenter />}></Route>
          <Route path="/schedule" element={<ScheduleCreationView />}></Route>
          <Route path="/myPage" element={<MyPageView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
