// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from '../features/appData/appDataSlice'
import budgetReducer from '../features/budgetSlice/budgetSlice';
import potReducer from '../features/potSlice/potSlice';

export const store = configureStore({
  reducer: {
    appData: appDataReducer,
    budgets: budgetReducer,
    pots: potReducer,
  },
});

//  typ całego stanu aplikacji
export type RootState = ReturnType<typeof store.getState>;

//  typ dispatch
export type AppDispatch = typeof store.dispatch;
