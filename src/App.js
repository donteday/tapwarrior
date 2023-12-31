import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, addExp } from './redux/store/store'
import Header from './components/Header/Header';
import Improve from './components/Improve/Improve';
import { amountRound } from './helpers/amountRound'

import mech from './sound/mech.mp3';
import coin from './sound/coin.mp3';
const mechSound = new Audio(mech);
const coinSound = new Audio(coin);
mechSound.preload = 'metadata';
coinSound.preload = 'metadata';

function App() {
  const dispatch = useDispatch();
  const improveRef = useRef();

  const ImproveArr = useSelector(state => state.counter.improve);
  const RunesArr = useSelector(state => state.counter.runes);
  const lvl = useSelector(state => state.counter.lvl);
  const sound = useSelector(state => state.counter.sound);
  const charRef = useRef();
  const mobRef = useRef();
  const mobBoxRef = useRef();
  const appRef = useRef();
  const coinRef = useRef();
  const comboRef = useRef();
  let hit = false;
  const [combo, setCombo] = useState(1);
  const [maxSpeed, setMaxSpeed] = useState(1);
  let speed = 5;

  const skeleton = React.createElement("div", { className: `skeleton skeleton__idle dungeon`, ref: mobRef });

  const [monst, setMonst] = useState([skeleton]);

  useEffect(() => {
    const moneyInterval = setInterval(() => {
      let count = 0;
      RunesArr.map(function (e, index) {
        if (e.amount) {
          count += e.amount*(index+1)*(index+1);
        };
        return true;
      });
      dispatch(incrementMoney(count))
    }, 1000);
    return () => clearInterval(moneyInterval);

  }, [RunesArr, dispatch]);

  useEffect(() => {


    const timerId = setInterval(() => {
      tick();
    }, 5000);
    return () => clearInterval(timerId);
  });

  function tick() {
    if (combo > 1) {
      setCombo(combo - 1);
    }
    // if (maxSpeed > 1) {
    //   setMaxSpeed(maxSpeed - 1);
    // }
  }

  function attack(e) {
    if (!e.target.classList.contains("dungeon") || hit || mobRef.current?.classList.contains("skeleton__dead")) return;
    sound && mechSound.play();
    hit = true;
    charRef.current.classList.add("char__attack");
    setTimeout(() => {
      charRef.current.classList.remove("char__attack");
      hit = false;
    }, 500)

    if (mobBoxRef.current?.offsetLeft < 180 && mobBoxRef.current?.offsetLeft > 80) {
      sound && coinSound.play();

      mobRef.current.classList.add("skeleton__dead");
      coinRef.current.classList.add("char__coin");

      if (lvl >= 6) comboRef.current.style.display = 'block';
      if (ImproveArr[2].amount > combo) setCombo(combo + 1);
      else setCombo(combo);

      if (ImproveArr[3].amount > maxSpeed) setMaxSpeed(maxSpeed + 1);
      else setMaxSpeed(maxSpeed);

      dispatch(incrementMoney(ImproveArr[1].amount * lvl * combo));
      dispatch(addExp(ImproveArr[0].amount * combo));
      console.log(ImproveArr[0].amount);

      setTimeout(() => {
        coinRef.current.classList.remove("char__coin");
        mobBoxRef.current.classList.remove("skeleton__run");
        mobRef.current.classList.remove("skeleton__dead");
        if (lvl >= 6) comboRef.current.style.display = 'none';
        setMonst(null);


        setTimeout(() => {
          mobBoxRef.current.classList.add("skeleton__run");
          setMonst([skeleton]);
        }, 500)
      }, 1000)
    }
  }

  function improveOpen() {
    improveRef.current.style.display === 'none' ? improveRef.current.style.display = 'block' : improveRef.current.style.display = 'none';
  }

  return (
    <div className="app dungeon" onClick={attack} ref={appRef}>
      <Header />
      {lvl >= 6 ? <span className='dungeon__multiplair' ref={comboRef}>Комбо x{combo}</span> : ''}
      <div className='dungeon dungeon__background-first'></div>
      <div className='dungeon dungeon__floor' ></div>
      <div className='dungeon dungeon__background-second'></div>
      <div className='dungeon char char__run' ref={charRef}>
        <div ref={coinRef}>
          <span className='coin-info'>+{amountRound(ImproveArr[1].amount * lvl * combo)}</span>
        </div>
      </div>
      <div className='skeleton__run' style={{ animationDuration: `${speed - ImproveArr[3].amount / 2}s` }} ref={mobBoxRef}>
        {monst?.map((e) => e)}
      </div>
      <span className='icon-improve' onClick={improveOpen}></span>
      <Improve improveRef={improveRef} />
    </div>
  );
}

export default App;
