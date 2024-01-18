import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import './HomePage.css';

function HomePage(){
  const src = '/images/main-image.svg'

  return(
    <div className="container">
      <Header/>
      <div className="home-container">
        <img src={src} alt="main-image"></img>
        <div className="home-text">
          <h1>Archive 네컷 앨범 서비스</h1>
          <br/>
          <h2>네컷 사진을 한눈에 모아볼 수 있는 곳!</h2>
          <h2>네컷 사진을 보관하고 기록할 수 있는 곳!</h2>
          <h2>  본인만의 네컷 앨범을 만들어보세요.
          </h2>
        </div>
        
      </div>

    </div>
  );
}

export default HomePage;