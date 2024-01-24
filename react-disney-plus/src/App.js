import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import LogIn from "./pages/LoginPage/LogIn";
import Signup from "./pages/SignupPage";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
