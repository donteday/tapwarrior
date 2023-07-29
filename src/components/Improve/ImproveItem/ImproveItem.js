import './ImproveItem.css';
import { useDispatch, useSelector } from 'react-redux'
import { improveUp, incrementMoney } from '../../../redux/store/store'
import { amountRound } from '../../../helpers/amountRound'


const ImproveItem = ({ item, index }) => {
    const dispatch = useDispatch();
    const ImproveAmount = useSelector(state => state.counter.improve[index].amount);
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);

    let upPrice = Math.pow(ImproveAmount, index + 2) * Math.pow(index + 1, index + 1);
    if (index === 3) {
        upPrice = 250000;
    }

    function improveUpFunc() {
        if (money - upPrice < 0 || item.amount === item.max) return;
        dispatch(improveUp({ 'index': index, 'amount': 1 }));
        dispatch(incrementMoney(- upPrice))
    }
    return (<div className="improve-item">
        {(index + 1) * 3 - 3 <= lvl ?
            <div className="improve-item__container">
                <img className='improve-item__img' src={require(`../../../img/icon_${index}.png`)} alt="" />
                <div className='improve-item__ui'>
                    <div className="improve-item__info">
                        <span >
                            {index === 1 ? amountRound(item.amount * lvl) : item.amount}
                        </span>
                        <span>
                            {item.name}
                        </span>
                    </div>
                    <button
                        style={(money - upPrice) < 0 || item.amount === item.max ? { backgroundColor: "#8d9bb86b" } : { backgroundColor: "#8d9bb8" }}
                        className='button'
                        onClick={improveUpFunc}>
                        {item.amount === item.max ? `МАКС`
                            : `УЛУЧШИТЬ ЗА ${amountRound(upPrice)}`
                        }
                    </button>
                </div>

            </div>
            : <span className='improve-item__empty'>Откроется на {(index + 1) * 3 - 3} уровне</span>
        }

    </div >);
}

export default ImproveItem;