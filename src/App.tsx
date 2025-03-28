import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from './pages/LoginPage/LoginPresenter';
import MainPage from './pages/MainPage/Mainpage';
import ScheduleCreationView from '@/pages/ScheduleCreation/ScheduleCreationView'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index path="/" element={<MainPage />}></Route> */}
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPresenter />}></Route>
          <Route path="/schedule" element={<ScheduleCreationView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
