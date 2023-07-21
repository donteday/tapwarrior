import './Improve.css'
import { useSelector } from 'react-redux'
import ImproveItem from './ImproveItem/ImproveItem';

const Improve = () => {
    const ImproveArr = useSelector(state => state.counter.improve);
    console.log(ImproveArr);
    return ( <div className='improve'>
        {ImproveArr.map((e, index) => (<ImproveItem item={e} key={e.name} index={index}/>))}        
    </div> );
}
 
export default Improve;