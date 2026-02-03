import type { Transaction } from "../../features/appData/appDataTypes";

type Props = {
  item: Transaction;
};

export default function TransactionsRow({ item }: Props) {
  const isPositive = item.amount > 0;
  const sign = isPositive ? "+" : "-";
  const formatted = Math.abs(item.amount).toFixed(2);

  const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="transactions-page__row">
      <div className="transactions-page__user">
        <img src={item.avatar} alt="" className="transactions-page__avatar" />
        <span className="transactions-page__name">{item.name}</span>
      </div>

      <span className="transactions-page__category">{item.category}</span>
      <span className="transactions-page__date">{formattedDate}</span>

      <span
        className={`transactions-page__amount ${
          isPositive
            ? "transactions-page__amount--positive"
            : "transactions-page__amount--negative"
        }`}
      >
        {sign}${formatted}
      </span>
    </li>
  );
}
