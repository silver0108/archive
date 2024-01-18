import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Button, Col, Form, Input, DatePicker } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import moment from 'moment'

function UpdatePage(){
  const location = useLocation();
  const file = location.state;
  console.log(file)
  const navigate = useNavigate();
  const [form] = useForm();
  const formRef = useRef(null);
  const fileInput = useRef(null);
  const [mainImg, setMainImg] = useState(file.image);
  const [isCompressing, setIsCompressing] = useState(false);
  const options = {
    maxSizeMB: 0.1  ,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };


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

const onUpdate = async (values) => {
  try {
    const {title, location, memo, date} = values
    console.log(date.toISOString())
    const fileDoc = doc(db, "archive", `${file.id}`);
    const newFileDoc = {
      title: title,
      location: location || "",
      memo: memo || "",
      date: date === null ? null : date.toISOString(),
      image: mainImg,
    }
    await updateDoc(fileDoc, newFileDoc);
    navigate(`/archive/${title}`, {state: {
      title,
      location,
      memo,
      date: date === null ? null : date.toISOString(),
      image: mainImg,
      userId: file.userId
    }});
  }catch(err){
    console.log(err)
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
              onFinish={onUpdate}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              layout="horizontal"
              initialValues={{
                title:`${file.title}`,
                location: `${file.location}`,
                memo: `${file.memo}`,
                // date: moment(file.date, 'YYYY-MM-DD')
                date: `${file.date}` ? moment(file.date, 'YYYY-MM-DD') : null
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
                <Button className="register-btn" htmlType="submit">수정하기</Button>
              </Form.Item>
            </Form>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default UpdatePage;