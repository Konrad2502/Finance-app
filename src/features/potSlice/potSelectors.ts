import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export const selectPots = (state: RootState) => 
    state.pots.items;

export const selectPotsTotal = createSelector(
  [selectPots],
  (pots) => pots.reduce((sum, p) => sum + p.total, 0)
);

export const selectUsedThemesPot = createSelector(
    [selectPots],
    (pots) => pots.map(p => p.theme)
)