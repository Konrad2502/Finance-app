import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type { BudgetState } from "./budgetTypes";
import type { Budget } from "../appData/appDataTypes";
import { fetchAppData } from "../appData/appDataSlice";


const initialState: BudgetState = {
  items: [],
};

type AddBudgetPayload = Omit<Budget, "id">;

type UpdateBudgetPayload = {
  id: number;
  changes: Partial<Omit<Budget, "id">>;
};


const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget(state, action: PayloadAction<AddBudgetPayload>) {
        const newBudget : Budget = {
            id: Date.now(),
            ...action.payload,
        }
        state.items.push(newBudget)
    },
    updateBudget(state, action: PayloadAction<UpdateBudgetPayload>) {
      const  {id, changes} = action.payload;

       if (changes.category) {
    const exists = state.items.some(
      b => b.category === changes.category && b.id !== id
    );
    if (exists) return; 
  }
        const budget = state.items.find(b => b.id === id) ;
        if(budget) {
            Object.assign(budget, changes)
        }
    },
    deleteBudget(state, action: PayloadAction<number>) {
        state.items = state.items.filter(b => b.id !== action.payload)
    }
  },


  extraReducers: (builder) => {
    builder.addCase(fetchAppData.fulfilled, (state, action) => {
      
      state.items = action.payload.budgets;
    });
  },
});

export const {addBudget, updateBudget, deleteBudget} = budgetsSlice.actions;
export default budgetsSlice.reducer;
