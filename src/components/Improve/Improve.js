import './Improve.css'
import { useSelector } from 'react-redux'
import ImproveItem from './ImproveItem/ImproveItem';
import { useState } from 'react';

const Improve = ({ improveRef }) => {
    const ImproveArr = useSelector(state => state.counter.improve);
    function closeWindow() { improveRef.current.style.display = 'none'; }

    const [improveView, setImproveView] = useState('chracter');

    function switchViewOnChar() {
        setImproveView('chracter');
    }

    function switchViewOnRunes() {
        setImproveView('runes');
    }

    return (
        <div className='improve' ref={improveRef}>
            <div className='improve__header'>
                <span className='improve__header-btn'
                    style={{
                        backgroundColor: improveView === 'chracter' ? `#8d9bb8` : 'transparent'
                    }}
                    onClick={switchViewOnChar}
                >Персонаж</span>
                <span className='improve__header-btn'
                    style={{
                        backgroundColor: improveView === 'runes' ? `#8d9bb8` : 'transparent'
                    }}
                    onClick={switchViewOnRunes}
                    >Руны</span>
                <span className='button__close' onClick={closeWindow}>Закрыть</span>
            </div>
            {improveView === 'chracter' ?

                ImproveArr.map((e, index) => (<ImproveItem item={e} key={e.name} index={index} />))
                : <div className='improve__runes'></div>
            }
        </div>);
}

export default Improve;