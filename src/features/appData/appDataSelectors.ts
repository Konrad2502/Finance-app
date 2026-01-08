import type { RootState } from '../../store/store';
import type { AppData} from "./appDataTypes";

/* ===== ROOT ===== */
export const selectAppData = (state: RootState): AppData | null =>
  state.appData.data;

/* ===== STATUS / ERROR ===== */
export const selectAppDataStatus = (state: RootState) =>
  state.appData.status;

export const selectAppDataError = (state: RootState) =>
  state.appData.error;

// export const selectBalance = (state: RootState) : Balance | undefined => 
//     state.appData.data?.balance

export const selectAllTransaction = (state: RootState) => 
    state.appData.data?.transactions ?? [];

export const selectRecentTransactions = (state: RootState) => {
  const transactions = state.appData.data?.transactions ?? [];
    return [...transactions]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5) ?? [];
}