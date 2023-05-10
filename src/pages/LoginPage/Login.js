import { useState } from 'react';
import { auth } from '../../firebase';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Login.css'
import MyPage from '../MyPage/MyPage';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        // 로그인 성공 시 처리할 코드
        setIsLoggedIn(true);
        navigate('/');

      })
      .catch((error) => {
        // 로그인 실패 시 처리할 코드
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <Header/>
      <div className='login-container'>
        <h1>로그인</h1>
        <Button className="login-btn" onClick={handleLogin} size='large'>Google 로그인</Button>
      </div>
    </div>
  );
}
export default Login;