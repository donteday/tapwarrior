import './ImproveItem.css';
import { useDispatch, useSelector } from 'react-redux'
import { improveUp, incrementMoney } from '../../../redux/store/store'

const ImproveItem = ({ item, index }) => {
    const dispatch = useDispatch();
    const ImproveAmount = useSelector(state => state.counter.improve[index].amount);
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);

    const upPrice = ImproveAmount * ImproveAmount;


    function improveUpFunc() {
        if (money - upPrice < 0) return;
        dispatch(improveUp({ 'index': index, 'amount': 1 }));
        dispatch(incrementMoney(- upPrice))
    }
    return (<div className="improve-item">
        <div className="improve-item__info">
            <span >

                {index === 0 ? item.amount * lvl : item.amount}
            </span>
            <span>
                {item.name}

            </span>
        </div>

        <button className='button' onClick={improveUpFunc}>УЛУЧШИТЬ ЗА {upPrice}</button>
    </div>);
}

export default ImproveItem;