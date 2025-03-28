import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from './components/LoginPage/LoginPresenter';
import MainPage from './components/MainPage/Mainpage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index path="/" element={<MainPage />}></Route> */}
          <Route index path="/login" element={<LoginPresenter />}></Route>
          <Route index path="/" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
