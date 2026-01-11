import { createSlice } from "@reduxjs/toolkit";
import type { BudgetState } from "./budgetTypes";
import { fetchAppData } from "../appData/appDataSlice";

const initialState: BudgetState = {
  items: [],
};

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    // ⛔ na razie pusto
    // addBudget
    // editBudget
    // deleteBudget
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppData.fulfilled, (state, action) => {
      // 👉 zasiew danych startowych z JSON
      state.items = action.payload.budgets;
    });
  },
});

export default budgetsSlice.reducer;
