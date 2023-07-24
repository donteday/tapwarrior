import { createSlice } from '@reduxjs/toolkit'


// const localStore = localStorage.playerData

// const moneyStart = localStore ? JSON.parse(localStore).money : 100;

export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garden',
    lvl: 1,
    currentExp: 0,
    maxExp: 10,
    money: 0,
    improve: [
      { name: 'Опыта за скелета', amount: 1 },
      { name: 'Монет за скелета', amount: 1 },
      { name: 'Макс. комбо', amount: 1 },
      { name: 'Макс. ускорение', amount: 1 },
      // {goldInsec: {name: 'Gold in sec', amount: 1}},
      // {expInSec: {name: 'Exp in sec', amount: 1}}
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
        state.maxExp = state.lvl * state.lvl * 10;
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