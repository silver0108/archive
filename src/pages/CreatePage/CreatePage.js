import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Button, Col, Form, Input, DatePicker } from "antd";
import './CreatePage.css';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getAuth } from "firebase/auth";

function CreatePage(){
  const navigate = useNavigate();
  const [form] = useForm();
  const formRef = useRef(null);
  const fileInput = useRef(null);
  const [mainImg, setMainImg] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const options = {
    maxSizeMB: 0.1  ,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  const [userId, setUserId] = useState("");

  useEffect(()=>{
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    setUserId(userId)
  }, [])
  

  const handleButtonClick = (e) => {
    fileInput.current.click();
  }
  
 
   const resize = async (fileSrc) => {
    console.log('resize 실행');
    setIsCompressing(true);
    try {
      const compressedFile = await imageCompression(fileSrc, options); // 이미지 압축
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        setMainImg(base64data);
        setIsCompressing(false);
      }
    } catch (error) {
      console.log(error);
      setIsCompressing(false);
    }
  }
  const setPreviewImg = (e) => {
    const fileSrc = e.target.files[0];

    const reader = new FileReader();
    if(fileSrc){
       reader.readAsDataURL(e.target.files[0])
     }
    reader.onload = () => {
      if (fileSrc.size >= 500000){
        resize(fileSrc);
      } else {
        setMainImg(reader.result);
      }
    };
  }

  const onCreate = async (values) => {
    const {title, location, memo, date} = values;
    if(!mainImg){
      alert('이미지를 업로드하세요.');
      return;
    }
    try {
      await addDoc(collection(db, "archive"), {
        userId: userId,
        title: title,
        location: location || "",
        memo: memo || "",
        date: date? date.toISOString() : null,
        image: mainImg,
      });
      form.resetFields();
      setMainImg("");
      navigate(-1);
    }catch (e) {
      console.error("Error adding document: ", e);
  }
}

  return(
    <div className="container">
      <Header/>
      <div className="create-container">
        <div className="image-upload">
          <Col className="image-container">
            {mainImg ? (
              <img style={{width:"100%"}} alt="미리보기" src={mainImg}></img>
            ):(
              <div className="box" />
            )}
          </Col>
          <Button className="upload-btn" onClick={handleButtonClick}>사진 업로드</Button>
          <input type="file" accept="image/*" ref={fileInput} onChange={(e) =>setPreviewImg(e)} style={{display:"none"}}/>
          {isCompressing && <p>압축 중...</p>}
        </div> 
        <div className="content-container">
          <div className="form-container">
            <Form className="form"
              form={form}
              ref={formRef}
              onFinish={onCreate}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              layout="horizontal"
              initialValues={{
                size: "large",
              }}
              size="large"
              style={{
                maxWidth: 600,
              }}
            >
              <div className="form-box">
                <div className="label">제목:</div>
                <Form.Item 
                  className="form-item"
                  name="title"
                  rules={[
                    {   
                      required: true,
                      message: '제목을 입력해주세요.',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </div>
              <div className="form-box">
                <div className="label">위치:</div>
                <Form.Item
                  className="form-item"
                  name="location">
                  <Input />
                </Form.Item>
              </div>
              <div className="form-box">
                <div className="label">메모:</div>
                <Form.Item
                  className="form-item"
                  name="memo">
                  <Input />
                </Form.Item>
              </div>
              <div className="form-box">
                <div className="label">날짜:</div>
                <Form.Item 
                  className="form-item"
                  name="date"
                  format="YYYY-MM-DD">
                  <DatePicker />
                </Form.Item>
              </div>
              <Form.Item>
                <Button className="register-btn" htmlType="submit">등록하기</Button>
              </Form.Item>
            </Form>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default CreatePage;