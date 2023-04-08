import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Rnd } from "react-rnd";

import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import './App.css';

export default function App() {

  function captureScreenshot() {
    html2canvas(document.querySelector("#capture")).then(function(canvas) {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  //가로 길이 화살표, 세로 길이 화살표, 박스 개수 list state
  const [verticalList,setVerticalList] = useState([]);
  const [horizontalList, setHorizontalList] = useState([]);
  const [boxList, setBoxList] = useState([]);

  const addHor = () => {
    setVerticalList([...verticalList, 
    <Rnd enableResizing={{ 
      top:false, right:true, 
      bottom:false, left:true, 
      topRight:false, bottomRight:false, 
      bottomLeft:false, topLeft:false }} 
      default={{x: 0,y: 0,width: 200,height: 20}}
      style={{display:"flex",flexDirection:"column"}}>
        <div style={{height:"3px",width:"100%",backgroundColor:"black",marginBottom:"5px",border:"black 1px solid"}}/>
        <div style={{display:"flex",justifyContent:"center"}}>
          <input placeholder="거리(mm)" style={{height:"40px",width:"100px",fontSize:"17px"}}/>
        </div>
    </Rnd>]);
  };

  const addVer = () => {
    setHorizontalList([...horizontalList, 
      <Rnd default={{x: 0,y: 0,width: 40,height: 200}}
      enableResizing={{ 
      top:true, right:false, 
      bottom:true, left:false, 
      topRight:false, bottomRight:false, 
      bottomLeft:false, topLeft:false }} style={{display:"flex"}}>
      <div style={{height:"100%",width:"3px",backgroundColor:"black",marginRight:"5px",border:"black 1px solid"}}/>
      <div style={{display:"flex",alignItems:"center"}}>
      <input placeholder="거리(mm)" style={{height:"40px",width:"100px",fontSize:"17px"}}/>
      </div>
    </Rnd>]);
  };
  
  const addBox = () => {
    setBoxList([...boxList,
      <Rnd className="TB-slot-wrapper"
      default={{x: 0,y: 0,width: 200,height: 200}}
      enableResizing={{
        top:false, right: false,
        bottom:false, left: false,
        topRight:false, bottomRight:true,
        bottomLeft:false, topLeft:false
      }}>
      <div className="TB-slot"> 
              박스 가로, 세로
      <input placeholder="가로(mm)" className="input-box"/>
      <input placeholder="세로(mm)" className="input-box"/>
    </div>
  </Rnd>]);
    
  }

  //전체 보드 가로, 세로, 박스 개수 입력값
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleWidth = (e) => {
    setWidth(e.target.value);
  }
  const handleHeight = (e) => {
    setHeight(e.target.value);
  }


  //전체 보드 가로, 세로 입력, 생성 클릭후 --> 결정값
  const [buildWidth, setBuildWidth] = useState('');
  const [buildHeight, setBuildHeight] = useState('');



  //전체 보드 가로, 세로입력 함수
  const {register, handleSubmit} =useForm();
  const onSubmit = () => {
    setBuildWidth(width);
    setBuildHeight(height);
  }

  const divStyle = {
    width: buildWidth/3+"px",
    height: buildHeight/3+"px",
    border: "black 1px solid",
  }


  return (
    //header
    <Wrapper>
      <div className="App-Header">
        <img className="App-Header-Logo" src={NothingLogo}/>
        <img className="App-Header-Logo" src={NothingLogoText}/>
      </div>
      <div className="Title-Wrapper">
        <div className="Title-Text">노씽공방 측정기 테스트</div>
        <div className="Title-Divider"></div>
      </div>
    <div style={{display:"flex", padding:"15px"}}>
    <div className="Input-Form">
    <div style={{fontSize:"20px",backgroundColor:"white",padding:"2px",marginBottom:"15px"}}> 도안 생성</div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-col">
            <div>전체 가로 길이(mm)</div>
            <input value={width} onChange={handleWidth} />
          </div>
          <div className="input-col">
            <div>전체 세로 길이(mm)</div>
            <input value={height} onChange={handleHeight}/>
          </div>
        <input type="submit"/>
      </form>
    </div>

    <div className="Input-Form">
      <div style={{fontSize:"20px",backgroundColor:"white",padding:"2px"}}> 입력 값</div>
      <button className="input-button" onClick={addVer}>세로 수치 추가</button>
      <button className="input-button" onClick={addHor}>가로 수치 추가</button>
      <button className="input-button" onClick={addBox}>박스 추가</button>
    </div>

    </div>
    <div style={{padding:"20px"}}>
      
      <div id="capture" style={{padding:"25px"}}>
        <div>
          <div> 전체 가로 : {buildWidth}, 전체 세로: {buildHeight} </div>
          <div style={divStyle}>
          {boxList}
          {verticalList}
          {horizontalList}
          </div>
        
        </div>
      </div>
      
      <button className="input-button" onClick={captureScreenshot}>도안 캡쳐</button>
      
    </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
