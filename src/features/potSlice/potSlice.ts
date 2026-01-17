import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  PotState,
  AddPotPayload,
  UpdatePotPayload,
  DeletePotPayload,
  MoneyPayload,
} from "./potTypes";

import { fetchAppData } from "../appData/appDataSlice";

const initialState: PotState = {
  items: [],
};

const potSlice = createSlice({
  name: "pot",
  initialState,

  reducers: {
    addPot(state, action: PayloadAction<AddPotPayload>) {
      state.items.push({
    id: Date.now(),
    total: 0,
    ...action.payload,
  });
    },

    updatePot(state, action: PayloadAction<UpdatePotPayload>) {
      const pot = state.items.find(p => p.id === action.payload.id);
      if (!pot) return;

      pot.name = action.payload.name;
      pot.target = action.payload.target;
      pot.theme = action.payload.theme;
    },

    deletePot(state, action: PayloadAction<DeletePotPayload>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },

    addMoney(state, action: PayloadAction<MoneyPayload>) {
      const pot = state.items.find(p => p.id === action.payload.id);
      if (!pot) return;

      pot.total += action.payload.amount;
    },

    withdrawMoney(state, action: PayloadAction<MoneyPayload>) {
      const pot = state.items.find(p => p.id === action.payload.id);
      if (!pot) return;

      pot.total = Math.max(0, pot.total - action.payload.amount);
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchAppData.fulfilled, (state, action) => {
      state.items = action.payload.pots;
    });
  },
});

export const {
  addPot,
  updatePot,
  deletePot,
  addMoney,
  withdrawMoney,
} = potSlice.actions;

export default potSlice.reducer;
