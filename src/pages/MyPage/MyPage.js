import { Button } from "antd";
import Header from "../../components/Header/Header";
import './MyPage.css';

import { useEffect, useState } from "react";
import EditProfile from "../../components/EditProfile";
import ModalComponent from "../../components/Modal/ModalComponent";
import { auth } from "../../firebase";

function MyPage(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return(
    <div className="container">
      <Header/>
      <div className="mypage-container">
        <div className="profile">
          <h2>계정 설정</h2>
          <div className="profile-box">
            <div className="profile-info">
              <ul>
                <li>{`이름: ${auth.currentUser.displayName}`}</li>
                <li>{`이메일: ${auth.currentUser.email}`}</li>
              </ul>
            </div>
            <div className="btn-box">
              <Button className="mypage-btn" onClick={showModal}>편집하기</Button>
            </div>
            <ModalComponent 
              title="프로필 편집" isOpen={isModalOpen} onCancel={handleCancel}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px"}}>
                <div>프로필 편집</div>
                <Button className="modal-close-btn" onClick={handleCancel}>X</Button>
              </div>
              
              <EditProfile/>
              <Button onClick={handleCancel} style={{ float:"right"}}>변경하기</Button>
            </ModalComponent>
          </div>
        </div>
        <div className="add-space">
          <h2>추가 공간 구입</h2>
          <div className="add-space-box">
            <div className="add-space-box-content">
              <div className="add-space-info-1">
                <ul>
                  <li>공간 100</li>
                  <li>공간 200</li>
                  <li>공간 300</li>
                </ul>
              </div>
              <div className="add-space-info-2">
                <ul>
                    <li>5,000원</li>
                    <li>10,000원</li>
                    <li>15,000원</li>
                  </ul>
              </div>
            </div>
            <div className="btn-box">
              <Button className="mypage-btn">구입하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;