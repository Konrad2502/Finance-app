import Overview from "../assets/images/icon-nav-overview.svg";
import OverviewActive from "../assets/images/icon-nav-overview-active.svg";
import Transactions from "../assets/images/icon-nav-transactions.svg";
import TransactionsActive from "../assets/images/icon-nav-transactions-active.svg";
import Budgets from "../assets/images/icon-nav-budgets.svg";
import BudgetsActive from "../assets/images/icon-nav-budgets-active.svg";
import Pots from "../assets/images/icon-nav-pots.svg";
import PotsActive from "../assets/images/icon-nav-pots-active.svg";
import Bills from "../assets/images/icon-nav-recurring-bills.svg";
import BillsActive from "../assets/images/icon-nav-recurring-bills-active.svg";

export type NavItem = {
    id: string;
    label:string;
    icon: string;
    iconActive: string;
}


export const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Overview,
    iconActive: OverviewActive,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: Transactions,
    iconActive: TransactionsActive,
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: Budgets,
    iconActive: BudgetsActive,
  },
  {
    id: "pots",
    label: "Pots",
    icon: Pots,
    iconActive: PotsActive,
  },
  {
    id: "bills",
    label: "Recurring Bills",
    icon: Bills,
    iconActive: BillsActive,
  },
];