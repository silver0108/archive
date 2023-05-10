import './Header.css'
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { auth } from '../../firebase';

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);
  
  const signOut = () => {
    auth.signOut()
      .then(() => {
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  return (
  <div className="header-container">
    <div className="app-name">
      <Link className="link" to="/">Archive 네컷 앨범</Link>  
    </div>
    <div className="menu">
      {isLoggedIn ? (
      <ul>
        <li><Link className="link" to="/archive">보관함</Link></li>
        <li className="clickable" onClick={signOut}>로그아웃</li>
        <li><Link className="link" to="/mypage">마이페이지</Link></li>
      </ul>
      ) : (
        <ul>
          <li className="clickable" onClick={() => navigate('/login')}>로그인</li>
          <li><Link className="link" to="/login">회원가입</Link></li>
      </ul>
      )}
    </div>
  </div>

  )
}
export default Header;