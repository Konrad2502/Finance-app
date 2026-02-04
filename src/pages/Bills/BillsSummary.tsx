import BillsIcon from "../../assets/images/icon-recurring-bills.svg";

type Props = {
  total: number;
  paidCount: number;
  paidTotal: number;
  upcomingCount: number;
  upcomingTotal: number;
  dueCount: number;
  dueTotal: number;
};

export default function BillsSummary({
  total,
  paidCount,
  paidTotal,
  upcomingCount,
  upcomingTotal,
  dueCount,
  dueTotal,
}: Props) {
  return (
    <>
      <div className="bills-summary">
        <img src={BillsIcon} alt="" aria-hidden="true" />
        <span>Total Bills</span>
        <strong>${total}</strong>
      </div>

      <div className="bills-summary-card">
        <h3>Summary</h3>

        <div className="bills-summary-row">
          <span>Paid Bills</span>
          <strong>
            {paidCount} (${paidTotal.toFixed(2)})
          </strong>
        </div>

        <div className="bills-summary-row">
          <span>Total Upcoming</span>
          <strong>
            {upcomingCount} (${upcomingTotal.toFixed(2)})
          </strong>
        </div>

        <div className="bills-summary-row bills-summary-row--danger">
          <span>Due Soon</span>
          <strong>
            {dueCount} (${dueTotal.toFixed(2)})
          </strong>
        </div>
      </div>
    </>
  );
}
