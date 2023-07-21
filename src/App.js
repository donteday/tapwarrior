import './App.css';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, addExp } from './redux/store/store'
import Header from './components/Header/Header';
import Improve from './components/Improve/Improve';

function App() {
  const dispatch = useDispatch();
  const ImproveArr = useSelector(state => state.counter.improve);
  const charRef = useRef();
  const mobRef = useRef();
  const appRef = useRef();
  let hit = false;

  const skeleton = React.createElement("div", { className: "skeleton skeleton__idle", ref: mobRef });
  const [monst, setMonst] = useState([skeleton]);

  function attack() {
    if (hit || mobRef.current?.classList.contains("skeleton__dead")) return;
    hit = true;
    charRef.current.classList.add("char__attack");
    setTimeout(() => {
      charRef.current.classList.remove("char__attack");
      hit = false;
    }, 500)
    if (mobRef.current?.offsetLeft < 200 && mobRef.current?.offsetLeft > 100) {
      mobRef.current.classList.add("skeleton__dead");
      dispatch(incrementMoney(ImproveArr[0].amount));
      dispatch(addExp(ImproveArr[1].amount));
      setTimeout(() => {
        setMonst(null);
        setTimeout(() => {
          setMonst([skeleton]);
        }, 500)
      }, 1200)
    }
  }

  return (
    <div className="app" onClick={attack} ref={appRef}>
      <Header />
      <div className='dungeon__background-first'></div>
      <div className='dungeon__floor'></div>
      <div className='dungeon__background-second'></div>
      <div className='char char__run' ref={charRef}></div>
      {monst?.map((e) => e)}
      <Improve/>
    </div>
  );
}

export default App;
