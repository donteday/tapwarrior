import { createSlice } from '@reduxjs/toolkit'


const localStore = localStorage.playerDataTapWarrior

const moneyStart = localStore ? JSON.parse(localStore).money : 0;
const lvlStart = localStore ? JSON.parse(localStore).lvl : 1;
const currentExp = localStore ? JSON.parse(localStore).currentExp : 0;
const maxExp = localStore ? JSON.parse(localStore).maxExp : 10;
const expForEnemy = localStore ? JSON.parse(localStore).improve[0].amount : 1;
const goldForEnemyI = localStore ? JSON.parse(localStore).improve[1].amount : 1;
const maxComboI = localStore ? JSON.parse(localStore).improve[2].amount : 1;
const maxSpeedI = localStore ? JSON.parse(localStore).improve[3].amount : 0;



export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garden',
    lvl: lvlStart,
    currentExp: currentExp,
    maxExp: maxExp,
    money: moneyStart,
    improve: [
      { name: 'Опыта за скелета I', amount: expForEnemy, max: 100 },
      { name: 'Монет за скелета I', amount: goldForEnemyI, max: 50 },
      { name: 'Комбо I', amount: maxComboI, max: 10 },
      { name: 'Ускорение I', amount: maxSpeedI, max: 1 },
    ]
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    increment: (state, action) => {
      state[action.payload.name] += action.payload.src;
    },
    zeroingExp: (state, action) => {
      state.currentExp = action.payload;
    },
    addExp: (state, action) => {
      state.currentExp += action.payload;
      if (state.currentExp >= state.maxExp) {
        state.lvl = state.lvl + 1;
        state.currentExp = 0;
        state.maxExp = state.lvl * state.lvl * state.lvl * 5;
      }
    },
    improveUp: (state, action) => {
      state.improve[action.payload.index].amount = state.improve[action.payload.index].amount + action.payload.amount;
    },
    update: (state, action) => {
      state[action.payload.name] = action.payload.source;
    },
  }
})


export const { incrementMoney, increment, zeroingExp, addExp, improveUp, update } = counterSlice.actions

export default counterSlice.reducer