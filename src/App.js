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
import {BsLightbulbFill} from 'react-icons/bs'
import {FaRegStickyNote} from 'react-icons/fa'
import {FaExclamation} from 'react-icons/fa'
import NaverLogo from '../src/assets/naver.png'
import NothingExample from '../src/assets/nothingdoan2.jpeg'
import ONLogo from '../src/assets/bucketplace.webp'
import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import './App.css';
import Select from 'react-select'
import Draggable from "react-draggable";
import calculate from "./calculate";

export default function App() {
  const ref = useRef();

  const [result,setResult] = useState("결과");
  const [imgComplete, setImgComplete] = useState(false);

  //반영
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
  
      setImgComplete(true);
      alert("캡쳐된 이미지를 주문과 함께 네이버 톡톡으로 보내주세요!")
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
    alert("콘센트 위치에 맞게 마우스 or 손으로 꾹 눌러서 위치를 조정해주세요")
    if(boxList.length == 5){
      alert("박스 개수가 6개 이상인 경우 전화 주문 부탁드립니다")
    } else if(checkBoxes() != ""){
      alert(checkBoxes())
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
      <div style={{backgroundColor:"white",border:"1px black solid", width:"100px",height:"90px",display:"flex",justifyContent:"flex-start"}}>
        <div style={{border:"1px black solid"}}>
        <svg width={"100%"} height={"20%"} x={0} y={10}><PathLine points={[{x:0,y:10},{x:buildWidth,y:10}]} stroke="black" strokeWidth="2" fill="none" r={10}/></svg>
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
        points={[{x:box.x+40,y:0},{x:box.x+40,y:buildHeight}]}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}/>,
        <PathLine 
        points={[{x:0, y:yy+35},{x:buildWidth, y:yy+35}]}
        stroke="black" 
        strokeWidth="2"
        fill="none"
        r={10}/>,

        <foreignObject
          id="myForeign"
          x={(box.x-100)/2+20}
          y={yy+35}
          width={40}
          height={40}
        >
          <input type="text" className="input-liner"  defaultValue={boxLeftList[index]} onBlur={boxLeftList[index]}
          onChange={(event) => {handleLeft(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={box.x+40}
          y={(yy-50)/2}
          width={80}
          height={80}
          >
          <input type="text" className="input-liner" defaultValue={boxTopList[index]}
          onChange={(event)=> {handleTop(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={box.x+40}
          y={yy + (buildHeight-yy)/2 + 30}
          width={80}
          height={120}
        >
          <input type="text"  className="input-liner" defaultValue={boxBottomList[index]}
          onChange={(event) => {handleBottom(event,index)}}/>
        </foreignObject>,

        <foreignObject
        id="myForeign"
          x={box.x + (buildWidth-box.x)/2+30}
          y={yy+35}
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



  //전체 보드 가로, 세로 입력, 생성 클릭후 --> 결정값
  const [buildWidth, setBuildWidth] = useState('');
  const [buildHeight, setBuildHeight] = useState('');

  //전체 보드 가로, 세로입력 함수
  const {register, handleSubmit} =useForm();
  const onSubmit = () => {
    var errormsg = ""
    // if(width<300 || width>5000){
    //   errormsg += "도안 가로 길이를 확인해주세요\n"
    // }
    // if(height<100 || height>2400){
    //   errormsg += "도안 세로 길이를 확인해주세요\n"
    // }
    if(width<=0){
      errormsg += "도안 가로 길이를 확인해주세요\n"
    }
    if(height<=0){
      errormsg += "도안 세로 길이를 확인해주세요\n"
    }

    if(errormsg!=""){
      alert(errormsg)
    } else {
      setResult(calculate(width,height));
      setVisible(true);
      setBuildWidth(400 + width/8);
      setBuildHeight(400 + height/8);
      
    }
  }
  //계산하기 함수
  const onCalcul = () => {
    var errormsg = ""
    if(width<=0){
      errormsg += "도안 가로 길이를 확인해주세요\n"
    }
    if(height<=0){
      errormsg += "도안 세로 길이를 확인해주세요\n"
    }
    if(errormsg!=""){
      alert(errormsg)
    } else {
      setResult(calculate(width,height));
    }

  }

  const divStyle = {
    width: buildWidth+"px",
    height: buildHeight+"px",
    border: "black 1px solid",
    backgroundColor: "white"
  }

  //전체 치수 검사 함수
  const checkBoxes = () => {

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
        errormsg += "1번 상자의 가로 치수와, 좌우 간격을 확인해주세요\n"
      }
      if(box1vertical != height){
        errormsg += "1번 상자의 세로 치수와, 상하 간격을 확인해주세요\n"
      }
    }
    if(boxList.length >= 2){
      if(box2horizontal != width){
        errormsg += "2번 상자의 가로 치수와, 좌우 간격을 확인해주세요\n"
      }
      if(box2vertical != height){
        errormsg += "2번 상자의 세로 치수와, 상하 간격을 확인해주세요\n"
      }
    }
    if(boxList.length >= 3){
      if(box3horizontal != width){
        errormsg += "3번 상자의 가로 치수와, 좌우 간격을 확인해주세요\n"
      }
      if(box3vertical != height){
        errormsg += "3번 상자의 세로 치수와, 상하 간격을 확인해주세요\n"
      }
    }
    if(boxList.length >= 4){
      if(box4horizontal != width){
        errormsg += "4번 상자의 가로 치수와, 좌우 간격을 확인해주세요\n"
      }
      if(box4vertical != height){
        errormsg += "4번 상자의 세로 치수와, 상하 간격을 확인해주세요\n"
      }
    }
    if(boxList.length == 5){
      if(box5horizontal != width){
        errormsg += "5번 상자의 가로 치수와, 좌우 간격을 확인해주세요\n"
      }
      if(box5vertical != height){
        errormsg += "5번 상자의 세로 치수와, 상하 간격을 확인해주세요\n"
      }
    }
    return errormsg
  }
  
  const checkAll = () => {

    if(checkBoxes() == ""){
      captureScreenshot()
    } else {
      alert(checkBoxes());
    }
  }

  const tablehead=[
    {No:1, 가로:box1Width, 세로:box1Height, "~왼쪽 모서리":box1Left,"~오른쪽 모서리":box1Right,"~위쪽 모서리":box1Top,"~아래쪽 모서리":box1Bottom},
    {No:2, 가로:box2Width, 세로:box2Height, "~왼쪽 모서리":box2Left,"~오른쪽 모서리":box2Right,"~위쪽 모서리":box2Top,"~아래쪽 모서리":box2Bottom},
    {No:3, 가로:box3Width, 세로:box3Height, "~왼쪽 모서리":box3Left,"~오른쪽 모서리":box3Right,"~위쪽 모서리":box3Top,"~아래쪽 모서리":box3Bottom},
    {No:4, 가로:box4Width, 세로:box4Height, "~왼쪽 모서리":box4Left,"~오른쪽 모서리":box4Right,"~위쪽 모서리":box4Top,"~아래쪽 모서리":box4Bottom},
    {No:5, 가로:box5Width, 세로:box5Height, "~왼쪽 모서리":box5Left,"~오른쪽 모서리":box5Right,"~위쪽 모서리":box5Top,"~아래쪽 모서리":box5Bottom},
    
  ]
  const column = Object.keys(tablehead[0]);
  const thdata = () => {
    return column.map((data) => {
      return <th key={data}>{data}</th>
    })
  }

  const tdData =() =>{
   
    return tablehead.map((data)=>{
      return(
          <tr>
               {
                  column.map((v)=>{
                      return <td>{data[v]}</td>
                  })
               }
          </tr>
      )
    })
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

    <div style={{display:"flex",alignItems:"center",flexDirection:"column",overflow:"scroll"}}>
    
      <div className="Input-Form">
      
      <div style={{display:"flex",fontSize:"20px",padding:"2px",marginBottom:"15px",alignItems:"center"}}> 
      <BsFillCalculatorFill style={{marginRight:"3px"}}/> <div style={{fontSize:"20px",fontWeight:"bold"}}>템바보드 계산기</div></div>
      <hr role="separator" aria-orientation="horizontal" style={{marginTop:"0px"}}></hr>

      <div style={{display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",alignItems:"center"}}> 
      <IoIosHammer style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 붙이는 템바보드 디자인</div></div>

      <div style={{display:"flex", marginBottom:"14px"}}>
      <input className="radio" type="radio" value="반달형" checked={radio === "반달형"} onChange={handleRadio}/>반달형 9t
        <input className="radio" type="radio" value="직각형" checked={radio === "직각형"} onChange={handleRadio}/>직각형 12t
      </div>


        <div style={{marginTop:"15px",display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",alignItems:"center"}}> 
        <BsRulers style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 치수 입력(mm)</div></div>

        <div style={{display:"flex"}}>
          <div>
            <div className="input-col">
              <div>도안 가로 길이</div>
              <input style={{padding:"7px",marginTop:"10px",borderRadius:"4px",border:"0.1px solid black",width:"100px"}} value={width} placeholder="가로 (mm)" onChange={handleWidth}/>
            </div>
            <div className="input-col">
              <div>도안 세로 길이</div>
              <input style={{padding:"7px",marginTop:"10px",borderRadius:"4px",border:"0.1px solid black",width:"100px"}} type="text" value={height} placeholder="세로 (mm)"onChange={handleHeight}/>
            </div>
          </div>
          <div style={{border:"2px black solid", marginLeft:"15px",padding:"15px"}}>
            <div style={{fontSize:"16px",fontWeight:"bold"}}>예시 1</div>
            <div>가로 1200mm</div>
            <div>세로 2400mm</div>
            <div style={{fontSize:"16px",fontWeight:"bold",marginTop:"10px"}}>결과</div>
            <div>600 : 2개</div>
          </div>
          <div style={{border:"2px black solid", marginLeft:"15px",padding:"15px"}}>
            <div style={{fontSize:"16px",fontWeight:"bold"}}>예시 2</div>
            <div>가로 3000mm</div>
            <div>세로 2400mm</div>
            <div style={{fontSize:"16px",fontWeight:"bold",marginTop:"10px"}}>결과</div>
            <div>300 : 1개</div>
            <div>600 : 2개</div>
          </div>
        </div>
        <div style={{display:"flex"}}>
          <input type="submit" style={{marginRight:"5px",backgroundColor:"deepskyblue",boxShadow: '1px 2px 9px #F4AAB9'}} value="계산 하기" onClick={onCalcul}></input>
          <input type="submit" style={{boxShadow: '1px 2px 9px #F4AAB9'}} value="도안 생성" onClick={onSubmit}></input>
          </div>
        
        {visible && (<div style={{marginTop:"10px",fontWeight:"bold"}}> <FaExclamation style={{marginRight:"3px"}}/> 페이지 하단에 도안이 생성되었습니다</div>)}
        {visible && (
          <div style={{border:"2px black solid", marginLeft:"15px",padding:"15px",width:"240px"}} >
          <div style={{fontSize:"16px",fontWeight:"bold"}}>도안 예시</div>
            <img style={{marginLeft:"8px",width:"200px",height:"200px"}}src={NothingExample}></img>
          </div>)}


      <div style={{display:"flex",fontSize:"16px",padding:"2px",marginBottom:"10px",marginTop:"20px",alignItems:"center"}}> 
      <BsLightbulbFill style={{marginRight:"3px"}}/> <div style={{fontSize:"16px",fontWeight:"bold"}}>- 계산결과</div></div>

      <div style={{marginLeft:"10px",marginRight:"10px",height:"45px",backgroundColor:"rgba(140, 158, 255, 0.3)",borderRadius:"4px",display:"flex",flexDirection:"column",paddingTop:"6px",paddingBottom:"6px",justifyContent:"center",alignItems:"center",boxShadow: '1px 2px 9px #F4AAB9'}}>
        <text style={{fontSize:"20px",fontWeight:"bold"}}>붙이는 템바보드 디자인 : {radio}</text>
        <text style={{fontSize:"20px",fontWeight:"bold"}}>{result}</text>
      </div>
    </div>
    
    
    </div>
    
    <div className="responsive">
      {visible && (
        <div style={{border:"0.1px solid black",padding:"15px",borderRadius:"8px",height:`${buildHeight+530}`+"px",width:`${buildWidth+100}`+"px"}}>
            
            <div style={{display:"flex",justifyContent:'center'}}>
              <div>
                <span style={{borderRadius:"6px",width:"70px",fontSize:"20px",fontWeight:"bold",display:"flex",alignItems:"center",backgroundColor:"rgba(140, 158, 255, 0.3)"}}>
                  <FaRegStickyNote style={{marginRight:"3px"}}/>도안
                </span>
                <span>
                  <text style={{fontSize:"20px",fontWeight:"bold"}}>- mm 단위로 입력해주세요.</text>
                </span>
                <div style={{display:"flex"}}>
                  <button className="input-button" onClick={addBox}>박스 추가</button>
                  <button style={{marginLeft:"15px",background: "#ff0000"}} className="input-button" onClick={clearAll}>박스 전체 삭제</button>
                  {/* <button style={{marginLeft:"25px",background: "#47E1A8"}} className="input-button" onClick={calculateNumbers}>나머지 수치 계산</button> */}
                </div>
              </div>
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
            <span style={{borderRadius:"6px",width:"300px",fontSize:"20px",fontWeight:"bold",display:"flex",alignItems:"center",backgroundColor:"rgba(140, 158, 255, 0.3)"}}>붙이는 템바보드 디자인 : {radio}</span>
            
            <div>
            {/* <table style={{borderSpacing:"20px 10px"}}>
              <thead>
                <tr>{thdata()}</tr>
              </thead>
              <tbody>
                {tdData()}
              </tbody>
            </table> */}
            </div>
            </div>
            <span><button style={{backgroundColor:"red"}} className="input-button" onClick={checkAll}>도안 캡쳐</button></span>
            {imgComplete && <div>
              <h5>아래 이미지를 클릭해서 주문하실 사이트로 이동해주세요!</h5>
              <a href="https://smartstore.naver.com/sscm/products/6328773563">
                <img style={{width:"40px",height:"40px"}} src={NaverLogo}/>
              </a>
              <a href="https://ohouse.onelink.me/2107755860/bf28a597">
                <img style={{width:"40px",height:"40px",marginLeft:"40px"}} src={ONLogo}/>
              </a>
              </div>}
      </div>)}
      
      
      
    </div>
    </Wrapper>
  );
}
//
  // "homepage": "https://limkyuseob.github.io/StickyTembarCalculator/",
const Wrapper = styled.div`
  height: 100vh;
  max-width: 100%;
`