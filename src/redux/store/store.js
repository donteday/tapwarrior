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
    money: 0,
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
  }
})


export const { incrementMoney, increment, zeroingExp} = counterSlice.actions

export default counterSlice.reducer