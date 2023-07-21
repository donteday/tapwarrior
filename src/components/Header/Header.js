import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import './Header.css'
// import { useRef } from 'react'
// import { makeShopActiveItem, update} from '../../redux/store/store'

const Header = () => {
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);
    const maxExp = lvl * lvl * 100;
    const currentExp = useSelector(state => state.counter.currentExp);
    const expBarRef = useRef();

    return (
        <div className='header'>
            <div className="header__exp-container">
                <div className='header__exp'
                style={{width: `${(currentExp/maxExp)*100}%`}}  ref={expBarRef}></div>
            </div>
            <div className="header__info">
                <span>lvl: {lvl} </span>
                <span>money: {money}</span>
            </div>

        </div >
    );
}

export default Header;