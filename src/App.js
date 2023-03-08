import React, {useState} from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import Draggable from 'react-draggable';
import NothingLogo from '../src/assets/nothing-logo-sqare.png';
import NothingLogoText from '../src/assets/nothinglogo.png';
import TembarBoard from '../src/assets/tembar-board.webp';
import './App.css';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값

  const {register, handleSubmit} =useForm();
  const onSubmit = (data) => alert(data)


  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
	setPosition({ x: data.x, y: data.y }); 
  };
  return (
    <Wrapper>
      <div className="App-Header">
        <img className="App-Header-Logo" src={NothingLogo}/>
        <img className="App-Header-Logo" src={NothingLogoText}/>
      </div>
      <div className="Title-Wrapper">
        <div className="Title-Text">노씽공방 측정기 테스트</div>
        <div className="Title-Divider"></div>
      </div>
      <div className="Palette">
        <div className="Tembar-board">
          <Draggable onDrag={(e, data) => trackPos(data)} bounds="parent" >
              <div className="TB-slot">
                <div className="TB-slot-text">BOX</div>
              </div>
          </Draggable>
        </div>
      </div>
    <div className="Input-Form">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-col">
            <div>전체 가로 길이</div>
            <input {...register("width")} />
          </div>
          <div className="input-col">
            <div>전체 세로 길이</div>
            <input {...register("height")}/>
          </div>
        <input type="submit" />
      </form>
    </div>
    
    <div className="Input-Form">
      <div>블럭 위치</div>
        <div>
          가로: {position.x}, 세로: {position.y}
        </div>
    </div>
    
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
