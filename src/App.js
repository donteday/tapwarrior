import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, addExp } from './redux/store/store'
import Header from './components/Header/Header';
import Improve from './components/Improve/Improve';

function App() {
  const dispatch = useDispatch();
  const improveRef = useRef();

  const ImproveArr = useSelector(state => state.counter.improve);
  const lvl = useSelector(state => state.counter.lvl);
  const charRef = useRef();
  const mobRef = useRef();
  const appRef = useRef();
  const coinRef = useRef();
  let hit = false;
  const [combo, setCombo] = useState(1);

  const skeleton = React.createElement("div", { className: "skeleton skeleton__idle dungeon", ref: mobRef });
  const [monst, setMonst] = useState([skeleton]);

  useEffect(() => {
    const timerId = setInterval(() => {
      tick();
    }, 3500);
    return () => clearInterval(timerId);
  });

  function tick() {
    if (combo > 1) {
      setCombo(combo - 1);
    }
  }

  function attack(e) {
    
    if (!e.target.classList.contains("dungeon") || hit || mobRef.current?.classList.contains("skeleton__dead")) return;
    hit = true;
    charRef.current.classList.add("char__attack");
    setTimeout(() => {
      charRef.current.classList.remove("char__attack");
      hit = false;
    }, 500)
    if (mobRef.current?.offsetLeft < 180 && mobRef.current?.offsetLeft > 80) {
      mobRef.current.classList.add("skeleton__dead");
      coinRef.current.classList.add("char__coin");

      setCombo(combo + 1);

      dispatch(incrementMoney(ImproveArr[0].amount * lvl * combo));
      dispatch(addExp(ImproveArr[1].amount));
      setTimeout(() => {
        coinRef.current.classList.remove("char__coin");
        setMonst(null);
        setTimeout(() => {
          setMonst([skeleton]);
        }, 500)
      }, 1200)
    }
  }

  function improveOpen() {
    improveRef.current.style.display === 'none' ? improveRef.current.style.display = 'block' : improveRef.current.style.display = 'none';
  }

  return (
    <div className="app dungeon" onClick={attack} ref={appRef}>
      <Header />
      <span className='dungeon__multiplair'>x{combo}</span>
      <div className='dungeon dungeon__background-first'></div>
      <div className='dungeon dungeon__floor'></div>
      <div className='dungeon dungeon__background-second'></div>
      <div className='char char__run' ref={charRef}>
        <div ref={coinRef}></div>
      </div>
      {monst?.map((e) => e)}
      <span className='icon-improve' onClick={improveOpen}></span>
      <Improve improveRef={improveRef} />
    </div>
  );
}

export default App;
