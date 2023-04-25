import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Rnd } from "react-rnd";
import {BsFillCalculatorFill} from "react-icons/bs";
import {IoIosHammer} from "react-icons/io";
import {ImCheckmark2} from "react-icons/im"
import {AiFillChrome} from "react-icons/ai"
import {BsRulers} from "react-icons/bs";
import {PathLine} from 'react-svg-pathline'
import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import './App.css';
import Select from 'react-select'
import Draggable from "react-draggable";

export default function App() {
  const ref = useRef();

  function captureScreenshot() {
    const captureElement = document.querySelector("#capture");
    const captureWidth = captureElement.scrollWidth;
    const captureHeight = captureElement.offsetHeight;
    
    const scrollX = window.innerWidth > document.documentElement.clientWidth ? 0 : -window.scrollX;

    const inputElements = captureElement.querySelectorAll("#myForeign input");
    const inputValues = Array.from(inputElements).map((el) => {
      const value = el.value;
      el.value = "";
      const valueElement = document.createElement("span")
      valueElement.innerText = value;
      el.insertAdjacentElement("beforebegin",valueElement)
      el.remove();
      return {el,value};
    })
    html2canvas(captureElement, {
      width: captureWidth,
      height: captureHeight,
      scrollX: scrollX,
    }).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      // 캡쳐할 이미지에 포함시켰던 input 요소 값의 텍스트 노드를 제거하고
      // 원래 값을 다시 복원합니다.
      inputValues.forEach(({ el, value }) => {
        const valueElement = el.previousSibling;
        valueElement.parentNode.removeChild(valueElement);
        el.value = value;
      });
    });
  }



  //가로 길이 화살표, 세로 길이 화살표, 박스 개수 list state
  const [boxList, setBoxList] = useState([]);
  const [newBoxList, setNewBoxList] = useState([]);
  
  const boxListRef = useRef(boxList)
  
  
  const [boxPos1, setBoxPos1] = useState({x:0, y:0});
  const [boxPos2, setBoxPos2] = useState({x:0, y:0});
  const [boxPos3, setBoxPos3] = useState({x:0, y:0});
  const [boxPos4, setBoxPos4] = useState({x:0, y:0});
  const [boxPos5, setBoxPos5] = useState({x:0, y:0});

  //박스 사이즈
  const [box1Width, setBox1Width] = useState('');
  const [box2Width, setBox2Width] = useState('');
  const [box3Width, setBox3Width] = useState('');
  const [box4Width, setBox4Width] = useState('');
  const [box5Width, setBox5Width] = useState('');

  const boxWidthList = [box1Width,box2Width,box3Width,box4Width,box5Width];

  const [box1Height, setBox1Height] = useState('');
  const [box2Height, setBox2Height] = useState('');
  const [box3Height, setBox3Height] = useState('');
  const [box4Height, setBox4Height] = useState('');
  const [box5Height, setBox5Height] = useState('');

  const boxHeightList = [box1Height,box2Height,box3Height,box4Height,box5Height];
  

  //박스 left,right,top,bottom
  const [box1Left,setBox1Left] = useState(0);
  const [box2Left,setBox2Left] = useState(0);
  const [box3Left,setBox3Left] = useState(0);
  const [box4Left,setBox4Left] = useState(0);
  const [box5Left,setBox5Left] = useState(0);

  const boxLeftList = [box1Left,box2Left,box3Left,box4Left,box5Left]

  const [box1Right,setBox1Right] = useState(0);
  const [box2Right,setBox2Right] = useState(0);
  const [box3Right,setBox3Right] = useState(0);
  const [box4Right,setBox4Right] = useState(0);
  const [box5Right,setBox5Right] = useState(0);

  const boxRightList = [box1Right,box2Right,box3Right,box4Right,box5Right]

  const [box1Top,setBox1Top] = useState(0);
  const [box2Top,setBox2Top] = useState(0);
  const [box3Top,setBox3Top] = useState(0);
  const [box4Top,setBox4Top] = useState(0);
  const [box5Top,setBox5Top] = useState(0);

  const boxTopList = [box1Top,box2Top,box3Top,box4Top,box5Top]

  const [box1Bottom,setBox1Bottom] = useState(0);
  const [box2Bottom,setBox2Bottom] = useState(0);
  const [box3Bottom,setBox3Bottom] = useState(0);
  const [box4Bottom,setBox4Bottom] = useState(0);
  const [box5Bottom,setBox5Bottom] = useState(0);

  const boxBottomList = [box1Bottom,box2Bottom,box3Bottom,box4Bottom,box5Bottom]


  

  const boxPosList = [boxPos1,boxPos2,boxPos3,boxPos4,boxPos5];

  //도안 값 visible

  const [visible, setVisible] = useState(false);

  const [LineList, setLineList] = useState([]);

  useEffect(() => {
    setLineList([]);
    logList()
    setNewBoxList(boxList)
  },[boxList,boxPos1,boxPos2,boxPos3,boxPos4,boxPos5])

  useEffect(() => {
    boxListRef.current = boxList
  },[newBoxList])


  const addBox = () => {
    if(boxList.length == 5){
      alert("박스 개수가 6개 이상인 경우 전화 주문 부탁드립니다")
    } else {
    var i = boxList.length
    setBoxList([...boxList,
    <Draggable
    cancel="strong"
    key={boxList.length+1}
    defaultPosition={{x:0,y:0-(boxList.length*70)}}
    onStop={(e,d) => {
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
      }
      
    }}>
      <div style={{backgroundColor:"white",border:"1px black solid", width:"80px",height:"70px",display:"flex",justifyContent:"flex-start"}}>
        <div style={{border:"1px black solid"}}>
        <svg width={"100%"} height={"20%"} x={0} y={10}><PathLine points={[{x:0,y:10},{x:600,y:10}]} stroke="black" strokeWidth="2" fill="none" r={10}/></svg>
        <strong><input placeholder="가로" style={{width:"40px",height:"20px"}} defaultValue={boxWidthList[i]}
        onChange={(event) => {
          if(i===0) {
            setBox1Width(event.target.value)
          } else if(i ===1){
            setBox2Width(event.target.value)
          } else if(i ===2){
            setBox3Width(event.target.value)
          } else if(i===3){
            setBox4Width(event.target.value)
          } else if(i===4){
            setBox5Width(event.target.value)
          }
        }}  
        ></input></strong>
        {i+1}
        </div>
        <div style={{marginTop:"25px",marginLeft:"-7px"}}>
        <strong><input placeholder="세로" style={{width:"40px",height:"20px",transform:"rotate(270deg)",paddingTop:"0px"}} defaultValue={boxHeightList[i]}
        onChange={(event) => {
          if(i===0) {
            setBox1Height(event.target.value)
          } else if(i ===1){
            setBox2Height(event.target.value)
          } else if(i ===2){
            setBox3Height(event.target.value)
          } else if(i===3){
            setBox4Height(event.target.value)
          } else if(i===4){
            setBox5Height(event.target.value)
          }
        }}
        ></input></strong>
        </div>
      </div>
    </Draggable>
    ])
  }
    

  }

  //박스 전체 삭제 함수
  const clearAll = () => {
    setBoxList([]);
    setBoxPos1({x: 0, y: 0});
    setBoxPos2({x: 0, y: 0});
    setBoxPos3({x: 0, y: 0});
    setBoxPos4({x: 0, y: 0});
    setBoxPos5({x: 0, y: 0});

    setBox1Width('');
    setBox2Width('');
    setBox3Width('');
    setBox4Width('');
    setBox5Width('');

    setBox1Height('');
    setBox2Height('');
    setBox3Height('');
    setBox4Height('');
    setBox5Height('');

    setBox1Left(0);
    setBox2Left(0);
    setBox3Left(0);
    setBox4Left(0);
    setBox5Left(0);
    
    setBox1Right(0);
    setBox2Right(0);
    setBox3Right(0);
    setBox4Right(0);
    setBox5Right(0);

    setBox1Top(0);
    setBox2Top(0);
    setBox3Top(0);
    setBox4Top(0);
    setBox5Top(0);

    setBox1Bottom(0);
    setBox2Bottom(0);
    setBox3Bottom(0);
    setBox4Bottom(0);
    setBox5Bottom(0);
  }
  const handleLeft = (event,index) => {
    const value = event.target.value;
    if(index==0){
      setBox1Left(value);
    } else if(index==1){
      setBox2Left(value);
    } else if(index==2){
      setBox3Left(value);
    } else if(index==3){
      setBox4Left(value);
    } else if(index==4){
      setBox5Left(value);
    }
  };
  const handleRight = (event,index) => {
    const value = event.target.value;
    if(index==0){
      setBox1Right(value);
    } else if(index==1){
      setBox2Right(value);
    } else if(index==2){
      setBox3Right(value);
    } else if(index==3){
      setBox4Right(value);
    } else if(index==4){
      setBox5Right(value);
    }
  };
  const handleTop = (event,index) => {
    const value = event.target.value;
    if(index==0){
      setBox1Top(value);
    } else if(index==1){
      setBox2Top(value);
    } else if(index==2){
      setBox3Top(value);
    } else if(index==3){
      setBox4Top(value);
    } else if(index==4){
      setBox5Top(value);
    }
  };
  const handleBottom = (event,index) => {
    const value = event.target.value;
    if(index==0){
      setBox1Bottom(value);
    } else if(index==1){
      setBox2Bottom(value);
    } else if(index==2){
      setBox3Bottom(value);
    } else if(index==3){
      setBox4Bottom(value);
    } else if(index==4){
      setBox5Bottom(value);
    }
  };
  
  //박스 상하좌우 x축,y축 라인 적용 함수
  const logList = () => {
    boxPosList.forEach((box, index) => {
      var yy = box.y + index*70

      if(box.x != 0){
      setLineList(prevList => [
        ...prevList,<PathLine
        points={[{x:box.x,y:0},{x:box.x,y:600}]}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}/>,
        <PathLine 
        points={[{x:0, y:yy},{x:600, y:yy}]}
        stroke="black" 
        strokeWidth="2"
        fill="none"
        r={10}/>,

        <foreignObject
          id="myForeign"
          x={box.x/2}
          y={yy}
          width={80}
          height={40}
        >
          <input type="text" className="input-liner"  defaultValue={boxLeftList[index]} 
          onChange={(event) => {handleLeft(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={box.x}
          y={yy/2}
          width={80}
          height={120}
          >
          <input type="text" className="input-liner" defaultValue={boxTopList[index]}
          onChange={(event)=> {handleTop(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={box.x}
          y={(600-yy-50)/2+yy+50}
          width={80}
          height={120}
        >
          <input type="text"  className="input-liner" defaultValue={boxBottomList[index]}
          onChange={(event) => {handleBottom(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={(600-box.x-50)/2+box.x + 50}
          y={yy}
          width={80}
          height={40}
        >
          <input type="text" className="input-liner" defaultValue={boxRightList[index]}
          onChange={(event) => {handleRight(event,index)}}/>
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


  //라디오 버튼 값
  const [radio, setRadio] = useState('');
  const handleRadio = (e) => {
    setRadio(e.target.value)
  }

  //몰딩
  const [mold,setMold] = useState('');
  const handleMold = (e) => {
    setMold(e)
  }

  const options = [
    { value: 'no-mold', label: '몰딩 없음' },
    { value: 'top-or-bottom', label: '위쪽 혹은 아래쪽' },
    { value: 'left-or-right', label: '왼쪽 혹은 오른쪽' },
    { value: 'top-and-bottom', label: '위쪽 아래쪽 둘다' },
    { value: 'left-and-right', label: '왼쪽 오른쪽 둘다' }
  ]



  //전체 보드 가로, 세로 입력, 생성 클릭후 --> 결정값
  const [buildWidth, setBuildWidth] = useState('');
  const [buildHeight, setBuildHeight] = useState('');

  //전체 보드 가로, 세로입력 함수
  const {register, handleSubmit} =useForm();
  const onSubmit = () => {
    setVisible(true);
    setBuildWidth(600);
    setBuildHeight(600);
  }

  const divStyle = {
    width: buildWidth+"px",
    height: buildHeight+"px",
    border: "black 1px solid",
    backgroundColor: "white"
  }

  //전체 치수 검사 함수
  
  const checkAll = () => {

    var errormsg = ""

    var box1vertical = parseInt(box1Height) + parseInt(box1Top) + parseInt(box1Bottom);
    var box1horizontal = parseInt(box1Left) + parseInt(box1Right) + parseInt(box1Width);
    var box2vertical = parseInt(box2Height) + parseInt(box2Top) + parseInt(box2Bottom);
    var box2horizontal = parseInt(box2Left) + parseInt(box2Right) + parseInt(box2Width);
    var box3vertical = parseInt(box3Height) + parseInt(box3Top) + parseInt(box3Bottom);
    var box3horizontal = parseInt(box3Left) + parseInt(box3Right) + parseInt(box3Width);
    var box4vertical = parseInt(box4Height) + parseInt(box4Top) + parseInt(box4Bottom);
    var box4horizontal = parseInt(box4Left) + parseInt(box4Right) + parseInt(box4Width);
    var box5vertical = parseInt(box5Height) + parseInt(box5Top) + parseInt(box5Bottom);
    var box5horizontal = parseInt(box5Left) + parseInt(box5Right) + parseInt(box5Width);

    if(boxList.length >= 1){
      if(box1horizontal != width){
        console.log("첫번째 상자 가로 오류")
        errormsg += "첫번째 상자 가로 오류\n"
      }
      if(box1vertical != height){
        console.log("첫번째 상자 세로 오류")
        errormsg += "첫번째 상자 세로 오류\n"
      }
    }
    if(boxList.length >= 2){
      if(box2horizontal != width){
        console.log("두번째 상자 가로 오류")
        errormsg += "두번째 상자 가로 오류\n"
      }
      if(box2vertical != height){
        console.log("두번째 상자 세로 오류")
        errormsg += "두번째 상자 세로 오류\n"
      }
    }
    if(boxList.length >= 3){
      if(box3horizontal != width){
        console.log("세번째 상자 가로 오류")
        errormsg += "세번째 상자 가로 오류\n"
      }
      if(box3vertical != height){
        console.log("세번째 상자 세로 오류")
        errormsg += "세번째 상자 세로 오류\n"
      }
    }
    if(boxList.length >= 4){
      if(box4horizontal != width){
        console.log("네번쨰 상자 가로 오류")
        errormsg += "네번쨰 상자 가로 오류\n"
      }
      if(box4vertical != height){
        console.log("네번째 상자 세로 오류")
        errormsg += "네번째 상자 세로 오류\n"
      }
    }
    if(boxList.length == 5){
      if(box5horizontal != width){
        console.log("다섯번째 상자 가로 오류")
        errormsg += "다섯번째 상자 가로 오류\n"
      }
      if(box5vertical != height){
        console.log("다섯번째 상자 세로 오류")
        errormsg += "다섯번째 상자 세로 오류\n"
      }
    }

    if(errormsg == ""){
      captureScreenshot()
    } else {
      alert(errormsg);
    }
  }



  return (
    //header
    <Wrapper>
      <div className="App-Header">
        <img className="App-Header-Logo" src={NothingLogo}/>
        <img className="App-Header-Logo" src={NothingLogoText}/>
      </div>
      <div className="Title-Wrapper">
        <div className="Title-Text">템바보드 계산기</div>
        <div className="Title-Divider"></div>
        <div className="Title-Sub-Text">Tembar Board Calculator</div>
      </div>
    <div style={{display:"flex", padding:"15px",justifyContent:"center"}}>
      <div style={{display:"flex",flexDirection:"column"}}>
        
        <text style={{fontWeight:"bold",fontSize:"16px"}}><AiFillChrome/> 크롬 브라우저를 이용해 주세요</text>
        <text style={{fontWeight:"bold",fontSize:"16px"}}>제품은 <text style={{color:"red"}}>cm</text>가 아닌 <text style={{color:"red"}}>mm</text>기준입니다. <text style={{color:"red"}}>(10cm = 100mm)</text></text>
      </div>
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>
    
    <div className="Input-Form">
      
      <div style={{display:"flex",fontSize:"20px",padding:"2px",marginBottom:"15px",alignItems:"center"}}> 
      <BsFillCalculatorFill style={{marginRight:"3px"}}/> <div style={{fontSize:"20px",fontWeight:"bold"}}>템바보드 계산기</div></div>
      <hr role="separator" aria-orientation="horizontal" style={{marginTop:"0px"}}></hr>

      <div style={{display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",alignItems:"center"}}> 
      <IoIosHammer style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 붙이는 템바보드 디자인</div></div>

      <div style={{display:"flex", marginBottom:"14px"}}>
        <input className="radio" type="radio" value="직각형" checked={radio === "직각형"} onChange={handleRadio}/>직각 12t
        <input className="radio" type="radio" value="원형" checked={radio === "원형"} onChange={handleRadio}/>원형 9t
      </div>

      <div style={{display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",alignItems:"center"}}> 
      <ImCheckmark2 style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 몰딩</div></div>

      <Select options={options} onChange={handleMold}/>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginTop:"15px",display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",alignItems:"center"}}> 
        <BsRulers style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 치수 입력(mm)</div></div>

        <div className="input-col">
          <div>도안 가로 길이 (300 ~ 5000)</div>
          <input style={{padding:"7px",marginTop:"10px",borderRadius:"4px",border:"0.1px solid black"}} value={width} placeholder="가로 (mm)" onChange={handleWidth}/>
        </div>
        <div className="input-col">
          <div>도안 세로 길이 (100 ~ 2400)</div>
          <input style={{padding:"7px",marginTop:"10px",borderRadius:"4px",border:"0.1px solid black"}} type="text" value={height} placeholder="세로 (mm)"onChange={handleHeight}/>
        </div>
        <input type="submit" value="도안 생성"></input>
      </form>
    </div>

    </div>
    <div style={{padding:"20px"}}>
      {visible && (
        <div>
          <div style={{display:"flex"}}>
          <button className="input-button" onClick={addBox}>박스 추가</button>
          <button style={{marginLeft:"15px"}} className="input-button" onClick={clearAll}>박스 전체 삭제</button>
          
          </div>
          
            <div ref={ref} id="capture" style={{padding:"25px",overflowX:"visible"}}>
              <div style={{display:"flex",justifyContent:"flex-start"}}>
                <span>
                <svg width={50} height={buildHeight}>
                <text style={{fontSize:"34px"}}x={24} y={buildHeight/2} width={60} height={200} transform={`rotate(270, 24, ${buildHeight/2})`}>{height}</text>
                <PathLine 
                points={[{x:32, y:0},{x:32, y:buildHeight}]}
                stroke="black" 
                strokeWidth="2"
                fill="none"
                r={10}>
                </PathLine>
                </svg>
                </span>

                <div style={divStyle}>

                <div style={{position:"absolute"}}>{boxList}</div>
                  <svg width={buildWidth} height={buildHeight}>
                  {LineList}

                  </svg>
                </div>
              </div>

              <svg width={buildWidth+50} height={60}>
            <PathLine points={[{x:50,y:15},{x:parseInt(buildWidth)+50,y:15}]} stroke="black" strokeWidth="2" fill="none" r={10}/>
            <text style={{fontSize:"36px"}} x={buildWidth/2} y={58} width={50} height={40}>{width}</text>
            </svg>

            </div>
            <div>붙이는 템바보드 디자인 : {radio}</div>
            <div>몰딩 : {mold.label}</div>
            <button style={{backgroundColor:"red"}} className="input-button" onClick={checkAll}>도안 캡쳐</button>
      </div>)}
      
      
      
    </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100%;
`
