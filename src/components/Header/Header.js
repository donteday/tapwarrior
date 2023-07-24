import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Header.css'
import { amountRound } from '../../helpers/amountRound'
// import { useRef } from 'react'
import { update } from '../../redux/store/store'

const Header = () => {
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);
    const sound = useSelector(state => state.counter.sound);
    const maxExp = useSelector(state => state.counter.maxExp);
    const currentExp = useSelector(state => state.counter.currentExp);
    const expBarRef = useRef();

    function switchSound() {
        dispatch(update({name: 'sound', source: !sound}))
    }

    return (
        <div className='header'>
            <div className="header__exp-container">
                <div className='header__exp'
                style={{width: `${(currentExp/maxExp)*100}%`}}  ref={expBarRef}></div>
            </div>
            <div className="header__info">
                <span className='header__info-lvl'>Ур. {lvl} </span>
                <span>Монет: {amountRound(money)}</span>
                <div className={sound ? "btn__sound" : "btn__sound no-active"} onClick={switchSound}></div>
            </div>

        </div >
    );
}

export default Header;