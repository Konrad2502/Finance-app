import BillPaid from "../../assets/images/icon-bill-paid.svg";
import BillDue from "../../assets/images/icon-bill-due.svg";

export type Bill = {
  id: number;
  name: string;
  avatar: string;
  amountFormatted: string;
  status: "paid" | "due";
  dueText: string;
};

type Props = {
  bills: Bill[];
};

export default function BillsList({ bills }: Props) {
  return (
    <ul className="bills-page__list">
      {bills.map((bill) => (
        <li key={bill.id} className="bills-page__row">
          <div className="bills-page__bill">
            <img src={bill.avatar} alt="" />
            <span>{bill.name}</span>
          </div>

          <div className="bills-page__due">
            <span>{bill.dueText}</span>
            {bill.status === "paid" && <img src={BillPaid} alt="" />}
            {bill.status === "due" && <img src={BillDue} alt="" />}
          </div>

          <strong
            className={`bills-page__amount ${
              bill.status === "due" ? "bills-page__amount--danger" : ""
            }`}
          >
            {bill.amountFormatted}
          </strong>
        </li>
      ))}
    </ul>
  );
}
