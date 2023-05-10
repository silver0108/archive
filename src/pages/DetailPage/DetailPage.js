import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Col, Button } from "antd";
import "./DetailPage.css"
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

function DetailPage(){
  const location = useLocation();
  const file = location.state;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const date = new Date(file.date);
  const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

  const updateFile = async(file) =>{
    
  }

  const deleteFile = async(id) =>{
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const fileDoc = doc(db, "archive", id);
    // deleteDoc을 이용해서 삭제
    await deleteDoc(fileDoc);
    navigate('/archive');
  }
  return(
   
     <div className="container">
      <Header/>
      <div className="create-container">
        <div className="image-upload">
          <Col style={{width:"50%"}}>
            {file.image ? (
              <img style={{width:"100%"}} alt="미리보기" src={file.image}></img>
            ):(
              <div className="box" />
            )}
          </Col>
        </div> 
        <div className="content-container">
          <div className="form-container">
            <div className="label">
              <h2>제목: {file.title}</h2>
              <h2>위치: {file.location}</h2>
              <h2>메모: {file.memo}</h2>
              <h2>날짜: {formattedDate}</h2>
            </div>
          </div>
          <div className="btn">
            <Button className="modify-btn" onClick={()=> setIsEdit(true)} >수정하기</Button>
            <Button className="delete-btn" onClick={()=> deleteFile(file.id)} >삭제하기</Button>
          </div>
        </div> 
      </div>
     </div>
  );
}

export default DetailPage;