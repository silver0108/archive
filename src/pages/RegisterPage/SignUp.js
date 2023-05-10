import { useEffect, useState } from 'react';
import { auth, provider, db } from '../../firebase';

function Signup() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // 로그인한 사용자 정보 가져오기
        setUser(authUser);
      } else {
        // 로그인하지 않은 경우
        setUser(null);
      }
    });

    // Clean up 함수
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignup = () => {
    if (user) {
      // Firebase의 users 컬렉션에 새로운 사용자 정보 추가하기
      const usersRef = db.collection('users');
      usersRef.doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
        .then(() => {
          // 회원가입 성공 시 처리할 코드
        })
        .catch((error) => {
          // 회원가입 실패 시 처리할 코드
        });
    }
  };

  return (
    <button onClick={handleSignup}>회원가입</button>
  );
}
export default Signup;