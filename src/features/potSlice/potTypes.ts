import type { Pot } from "../appData/appDataTypes";

export type PotState = {
    items: Pot[];
}

export type AddPotPayload =Omit<Pot, "id" | "total">;

export type UpdatePotPayload = {
  id: number;
  name: string;
  target: number;
  theme: string;
};

export type DeletePotPayload = number;

export type MoneyPayload = {
  id: number;
  amount: number;
};