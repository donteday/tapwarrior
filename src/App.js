import './App.css';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { incrementMoney } from './redux/store/store'
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const charRef = useRef();
  const mobRef = useRef();
  const appRef = useRef();


  // const hbBarRef = useRef();
  // const [mobHp, setMobHp] = useState(100);
  // const [charHp, setCharHp] = useState(100);
  // const currExp = useSelector(state => state.counter.currentExp);
  // const maxExp = lvl * lvl * 100;
  // const maxHp = 90 + lvl * 10;


  // useEffect(() => {
  //   if (mobHp <= 10) {
  //     setMobHp(100);
  //     dispatch(increment({ name: 'currentExp', src: 10 }));
  //     dispatch(increment({ name: 'money', src: 10 }));
  //   }
  //   if (currExp >= maxExp) {
  //     dispatch(increment({ name: 'lvl', src: 1 }));
  //     dispatch(zeroingExp(0));
  //     setCharHp(maxHp)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mobHp]);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (mobRef.current.offsetLeft <= -50) {
  //       mobRef.current.classList.remove("skeleton__dead");
  //     }
  //   }, 10)
  // })
  const skeleton = React.createElement("div", { className: "skeleton skeleton__idle", ref: mobRef });
  const [monst, setMonst] = useState([skeleton]);

  function attack() {
    charRef.current.classList.add("char__attack");
    setTimeout(() => {
      charRef.current.classList.remove("char__attack");
    }, 500)
    if (mobRef.current?.offsetLeft < 200 && mobRef.current?.offsetLeft > 100) {
      mobRef.current.classList.add("skeleton__dead");
      dispatch(incrementMoney(1));      
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
      {/* <div className='skeleton skeleton__idle' ref={mobRef} ></div> */}
      {/* <div className="mob__container">
        <span>{mobHp}</span>
        <div className="mob__bar-container">
          <div className="mob__bar-hp" ref={hbBarRef}></div>
        </div>
        <img className="mob__box"
        src={require('./img/skeleton.png')}
        alt="234" onClick={attack}
        onMouseDown={clickHandler}
        onMouseUp={clickOutHabdler}
        ref={mobRef}/>
      </div> */}
      {/* <div className="footer">
        <div className="char__hp-container">
        <span className="char__hp-score">{charHp}</span>
          <div className="char__hp" style={{ height: `${(charHp / maxHp) * 100}%` }}>

          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
