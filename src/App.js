import './App.css';
import React from "react";
import 
{ BrowserRouter as Router,
   Routes, 
   Route,
} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import MyPage from './pages/MyPage/MyPage';
import CreatePage from './pages/CreatePage/CreatePage';
import DetailPage from './pages/DetailPage/DetailPage';
import Login from './pages/LoginPage/Login';
import Signup from './pages/RegisterPage/SignUp';
import UpdatePage from './pages/UpdatePage/UpdatePage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/archive" element={<ArchivePage />}></Route>
          <Route path="/archive/:id" element={<DetailPage />}></Route>
          <Route path="/archive/create" element={<CreatePage />}></Route>
          <Route path="/archive/modify" element={<UpdatePage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
  )
}

export default App;