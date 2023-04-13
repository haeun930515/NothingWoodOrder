import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Rnd } from "react-rnd";
import DomToImage from "dom-to-image";
import { useCapture } from "react-capture";

import {PathLine} from 'react-svg-pathline'
import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import './App.css';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'


export default function App() {
  const ref = useRef();

  
  const handleCapture = () => {
    htmlToImage.toPng(ref.current, { style: { backgroundColor: 'white' } })
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'capture.png';
        link.href = dataUrl;
        link.click();
      });
  };





  
  
  

  //가로 길이 화살표, 세로 길이 화살표, 박스 개수 list state
  const [boxList, setBoxList] = useState([]);
  const [newBoxList, setNewBoxList] = useState([]);
  
  const boxListRef = useRef(boxList)
  
  
  const [boxPos1, setBoxPos1] = useState({x:0, y:0});
  const [boxPos2, setBoxPos2] = useState({x:0, y:0});
  const [boxPos3, setBoxPos3] = useState({x:0, y:0});
  const [boxPos4, setBoxPos4] = useState({x:0, y:0});
  const [boxPos5, setBoxPos5] = useState({x:0, y:0});
  const [boxPos6, setBoxPos6] = useState({x:0, y:0});
  const [boxPos7, setBoxPos7] = useState({x:0, y:0});
  const [boxPos8, setBoxPos8] = useState({x:0, y:0});
  const [boxPos9, setBoxPos9] = useState({x:0, y:0});
  const [boxPos10, setBoxPos10] = useState({x:0, y:0});

  const boxPosList = [boxPos1,boxPos2,boxPos3,boxPos4,boxPos5,boxPos6,boxPos7,boxPos8,boxPos9,boxPos10];

  //도안 값 visible

  const [visible, setVisible] = useState(false);

  const [LineList, setLineList] = useState([]);

  useEffect(() => {
    setLineList([]);
    logList()
    setNewBoxList(boxList)
  },[boxList,boxPos1,boxPos2,boxPos3,boxPos4,boxPos5,boxPos6,boxPos7,boxPos8,boxPos9,boxPos10])

  useEffect(() => {
    boxListRef.current = boxList
  },[newBoxList])


  const addBox = () => {
    var i = boxList.length
    setBoxList([...boxList,
    <Rnd
    key={boxList.length+1}
    default={{x: 0,y: 0, width:150,height:150}}
    style={{backgroundColor:"white",border:"black 1px solid"}}
    onDragStop={(e,d) => {
      if (i === 0) {
        setBoxPos1({x: d.x, y: d.y});
      } else if (i === 1) {
        setBoxPos2({x: d.x, y: d.y});
      }else if (i === 2) {
        setBoxPos3({x: d.x, y: d.y});
      }else if (i === 3) {
        setBoxPos4({x: d.x, y: d.y});
      }else if (i === 4) {
        setBoxPos5({x: d.x, y: d.y});
      }else if (i === 5) {
        setBoxPos6({x: d.x, y: d.y});
      }else if (i === 6) {
        setBoxPos7({x: d.x, y: d.y});
      }else if (i === 7) {
        setBoxPos8({x: d.x, y: d.y});
      }else if (i === 8) {
        setBoxPos9({x: d.x, y: d.y});
      }else if (i === 9) {
        setBoxPos10({x: d.x, y: d.y});
      }
    }}
    enableResizing={{
      top:false, right: true,
      bottom:true, left: false,
      topRight:false, bottomRight:true,
      bottomLeft:false, topLeft:false
    }}>
      <svg width={"100%"} height={"100%"}>
      <foreignObject  height={40} width={80} x={"25%"} y={"70%"}>
      <input type="text" placeholder="가로(mm)" className="input-box"/>
      </foreignObject>
      <PathLine points={[{x:130,y:0},{x:130,y:150}]} stroke="black" strokeWidth="2" fill="none" r={10}/>
      <foreignObject height={100} width={60} x={"60%"} y={"25%"}>
      <input type="text" placeholder="세로(mm)" className="input-box"/>
      </foreignObject>
      <PathLine points={[{x:0,y:130},{x:150,y:130}]} stroke="black" strokeWidth="2" fill="none" r={10}/>
      </svg>
    </Rnd>])
    

  }


  const clearAll = () => {
    setBoxList([]);
    setBoxPos1({x: 0, y: 0});
    setBoxPos2({x: 0, y: 0});
    setBoxPos3({x: 0, y: 0});
    setBoxPos4({x: 0, y: 0});
    setBoxPos5({x: 0, y: 0});
    setBoxPos6({x: 0, y: 0});
    setBoxPos7({x: 0, y: 0});
    setBoxPos8({x: 0, y: 0});
    setBoxPos9({x: 0, y: 0});
    setBoxPos10({x: 0, y: 0});
    
  }
  
  const logList = () => {
    console.log(boxPosList)
    boxPosList.forEach((box, index) => {
      if(box.x != 0){
      setLineList(prevList => [
        ...prevList,<PathLine
        points={[{x:box.x+70,y:0},{x:box.x+70,y:height}]}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}/>,
        <PathLine 
        points={[{x:0, y:box.y+70},{x:box.x, y:box.y+70}]}
        stroke="black" 
        strokeWidth="2"
        fill="none"
        r={10}/>,
        <foreignObject
          x={box.x/2}
          y={box.y+70}
          width={80}
          height={40}
        >
          <input type="text" placeholder="mm" />
        </foreignObject>,
        <foreignObject
                x={box.x+30}
                y={box.y/2}
                width={80}
                height={120}
              >
                <input type="text" placeholder="mm"/>
              </foreignObject>,
              <foreignObject
          x={box.x+30}
          y={(buildHeight-box.y-50)/2+box.y+50}
          width={80}
          height={120}
        >
          <input type="text"  placeholder="mm"/>
        </foreignObject>

        ])
      }
      


    });
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
    setVisible(true);
    if(width <=1200){
      setBuildWidth(width)
    } else if(1200 <width <=2400){
      setBuildWidth(width/2)
    }
    if(height <= 1200){
      setBuildHeight(height)
    } else if(1200 < height <=2400){
      setBuildHeight(height/2)
    }
  }

  const divStyle = {
    width: buildWidth+"px",
    height: buildHeight+"px",
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
            <div>도안 가로 길이(mm) (300 ~ 2400 mm)</div>
            <input value={width} onChange={handleWidth} />
          </div>
          <div className="input-col">
            <div>도안 세로 길이(mm) (100 ~ 2400 mm)</div>
            <input value={height} onChange={handleHeight}/>
          </div>
        <input type="submit"/>
      </form>
    </div>

    </div>
    <div style={{padding:"20px"}}>
      {visible && (
        <div>
          <div style={{display:"flex"}}>
          <button className="input-button" onClick={addBox}>박스 추가</button>
          <button className="input-button" onClick={clearAll}>박스 전체 삭제</button>
          
          </div>
        <div ref={ref} style={{padding:"25px"}}>

            <svg width={buildWidth+50} height={40}>
            <PathLine points={[{x:50,y:20},{x:parseInt(buildWidth)+50,y:20}]} stroke="black" strokeWidth="2" fill="none" r={10}/>
            <text x={buildWidth/2} y={15} width={50} height={30}>{width}</text>
            </svg>

            <div style={{display:"flex"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width={50} height={buildHeight}>
              <text x={24} y={buildHeight/2} width={50} height={200} transform={`rotate(90, 24, ${buildHeight/2})`}>{height}</text>
              <PathLine 
                points={[{x:20, y:0},{x:20, y:buildHeight}]}
                stroke="black" 
                strokeWidth="2"
                fill="none"
                r={10}>
              </PathLine>
              </svg>

              <div style={divStyle}>
                
              <svg xmlns="http://www.w3.org/2000/svg" width={buildWidth} height={buildHeight}>
              {LineList}

              {boxList}
              </svg>
              {boxList}
              </div>
            </div>
          </div>
      </div>)}
      
      <button style={{backgroundColor:"red"}}className="input-button" onClick={handleCapture}>도안 캡쳐</button>
      
    </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
