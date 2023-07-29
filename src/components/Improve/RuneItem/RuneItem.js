import './RuneItem.css';
import { useDispatch, useSelector } from 'react-redux'
import { runeUp, incrementMoney } from '../../../redux/store/store'
import { amountRound } from '../../../helpers/amountRound'

const RuneItem = ({ item, index }) => {
    const dispatch = useDispatch();

    const RuneAmount = useSelector(state => state.counter.runes[index].amount);
    const money = useSelector(state => state.counter.money);

    const runeValue = (RuneAmount * (index + 1) +
        Math.pow(RuneAmount * (index + 1) + 1, (1 + index)) +
        Math.pow((1 + index + index), (1 + index))) * ((1 + index + index) * 10);

    function runeUpFunc() {
        if (money - runeValue < 0 || item.amount === item.max) return;

        dispatch(runeUp({ 'index': index, 'amount': 1 }));
        dispatch(incrementMoney(- runeValue))

    }

    return (<div className="rune">
        <div className='rune__img rune-0'
            alt="" />
        <div className="rune__info">
            <span>{item.name} {item.amount}ур.</span>
            <span>{item.amount * (index + 1) * (index + 1)}/сек</span>
        </div>

        <button className='button rune__btn' onClick={runeUpFunc}>{amountRound(runeValue)}</button>
    </div>);
}

export default RuneItem;

