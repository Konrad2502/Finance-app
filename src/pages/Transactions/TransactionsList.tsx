import type { Transaction } from "../../features/appData/appDataTypes";
import TransactionsRow from "./TransactionsRow";

type Props = {
  items: Transaction[];
};

export default function TransactionsList({ items }: Props) {
  return (
    <ul className="transactions-page__list">
      {items.map((item) => (
        <TransactionsRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
