import './Improve.css'
import { useSelector } from 'react-redux'
import ImproveItem from './ImproveItem/ImproveItem';

const Improve = ({ improveRef }) => {
    const ImproveArr = useSelector(state => state.counter.improve);
    function closeWindow() { improveRef.current.style.display = 'none'; }
    return (<div className='improve' ref={improveRef}>
        <span className='button__close' onClick={closeWindow}>x</span>
        {ImproveArr.map((e, index) => (<ImproveItem item={e} key={e.name} index={index} />))}
    </div>);
}

export default Improve;