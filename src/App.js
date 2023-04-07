import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Rnd } from "react-rnd";

import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import './App.css';

export default function App() {

  const canvasRef = useRef(null);

  const onHtmlToPng = () => {
    const onCapture = () => {html2canvas(document.getElementById('capture')).then(canvas => {
      onSaveAs(canvas.toDataURL("image/png"), "image-download.png")
    });
  };
    const onSaveAs = (uri, filename) => {
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    }
  }



  //가로 길이 화살표, 세로 길이 화살표 state
  const [verticalList,setVerticalList] = useState([]);
  const [horizontalList, setHorizontalList] = useState([]);


  const addVer = () => {
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
          <input placeholder="거리(mm)" style={{height:"20px",width:"80px",fontSize:"10px"}}/>
        </div>
    </Rnd>]);
  };

  const addHor = () => {
    setHorizontalList([...horizontalList, 
      <Rnd default={{x: 0,y: 0,width: 40,height: 200}}
      enableResizing={{ 
      top:true, right:false, 
      bottom:true, left:false, 
      topRight:false, bottomRight:false, 
      bottomLeft:false, topLeft:false }} style={{display:"flex"}}>
      <div style={{height:"100%",width:"3px",backgroundColor:"black",marginRight:"5px",border:"black 1px solid"}}/>
      <div style={{display:"flex",alignItems:"center"}}>
      <input placeholder="거리(mm)" style={{height:"20px",width:"80px",fontSize:"10px"}}/>
      </div>
    </Rnd>]);
  };
  
  //전체 보드 가로, 세로, 박스 개수 입력값
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [boxNum, setBoxNum] = useState('');

  const handleWidth = (e) => {
    setWidth(e.target.value);
  }
  const handleHeight = (e) => {
    setHeight(e.target.value);
  }
  const handleBoxNum = (e) => {
    setBoxNum(e.target.value);
  }


  //전체 보드 가로, 세로 입력, 생성 클릭후 --> 결정값
  const [buildWidth, setBuildWidth] = useState('');
  const [buildHeight, setBuildHeight] = useState('');
  const [buildBoxNum, setBuildBoxNum] = useState('');



  //전체 보드 가로, 세로, 박스개수 입력 함수
  const {register, handleSubmit} =useForm();
  const onSubmit = () => {
    setBuildWidth(width);
    setBuildHeight(height);
    setBuildBoxNum(boxNum);
  }

  const divStyle = {
    width: buildWidth/3+"px",
    height: buildHeight/3+"px",
    border: "black 1px solid",
    padding: "15px"
  }

  //박스 input 컴포넌트 생성 함수
  const boxInputs = (boxNum) => {
    const boxs = [];
    for(let i = 0; i< boxNum;i++){
      boxs.push(
        <Rnd key={i} className="TB-slot-wrapper"
        default={{x: 0,y: 0,width: 200,height: 200}}>
            <div className="TB-slot"> 
                박스 가로, 세로
                <input placeholder="가로(mm)" className="input-box"/>
                <input placeholder="세로(mm)" className="input-box"/>
            </div>
        </Rnd>
      );
    }
    return boxs;
  }

  

  const handleCapture = () => {
    const canvas = canvasRef.current
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'capture.png';
    link.href = image;
    link.click();
  }




  return (
    //header
    <Wrapper id="capture">
      <div className="App-Header">
        <img className="App-Header-Logo" src={NothingLogo}/>
        <img className="App-Header-Logo" src={NothingLogoText}/>
      </div>
      <div className="Title-Wrapper">
        <div className="Title-Text">노씽공방 측정기 테스트</div>
        <div className="Title-Divider"></div>
      </div>
    <div style={{display:"flex"}}>
    <div className="Input-Form">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-col">
            <div>전체 가로 길이(mm)</div>
            <input value={width} onChange={handleWidth} />
          </div>
          <div className="input-col">
            <div>전체 세로 길이(mm)</div>
            <input value={height} onChange={handleHeight}/>
          </div>
          <div className="input-col">
            <div>박스 개수</div>
            <input value={boxNum} onChange={handleBoxNum}/>
          </div>
        <input type="submit" />
      </form>
    </div>

    <div className="Input-Form">
      <div> 세로 길이 입력 추가</div>
    <button onClick={addVer}>addVer</button>
    <div>가로 길이 입력 추가</div>
    <button onClick={addHor}>addHor</button>
    </div>

    </div>
    <div style={{padding:"15px"}} >
        <div> 전체 가로 : {buildWidth}, 전체 세로: {buildHeight} </div>
        <div style={divStyle}>
          {boxInputs(buildBoxNum)}
          {verticalList}
          {horizontalList}
        </div>
        
      </div>

      <canvas ref={canvasRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
