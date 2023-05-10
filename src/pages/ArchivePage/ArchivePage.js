import Header from "../../components/Header/Header";
import { Button, Input, Row, Col } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import './ArchivePage.css';
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState   } from "react";

function ArchivePage(){
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    const fetchFiles = async () => {
      const filesCollection = collection(db, "archive");
      const filesSnapshot = await getDocs(filesCollection);
      const filesData = filesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setFiles(filesData);
    };
    fetchFiles();
  },[]);

  
  
  return(
    <div className="container">
      <Header/>
      <div className="archive-container">
        <div className="search-bar">
          <Input size="large" placeholder="사진 검색" prefix={<SearchOutlined />} />
        </div>
        <div>
          <Button className="add-file" shape="round" size="large"
            onClick={()=>navigate('/archive/create')}>추가하기</Button>
        </div>
        <div className="file">
          {files.length >= 1 ? (
            <Row gutter={[16, 16]}>
            {files.map((file) => (
              <Col lg={6} md={8} sm={12} xs={24} span={6} key={file.id}>
                {file.image ? (
                  <Link to={`/archive/${file.id}`} state={file}>
                    <img src={file.image} alt={file.title}/>
                  </Link>
                ): (
                  <div className="box"></div>
                )}
              </Col>
            ))}
          </Row>
           ):( 
            <h1>
              앨범을 채워주세요 !
            </h1>
           )} 
          
        </div>
      </div>

    </div>
  );
}

export default ArchivePage;