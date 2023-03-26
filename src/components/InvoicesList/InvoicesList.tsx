import "./InvoicesList.scss";
import { InvoicesListItem } from "../InvoicesListItem/InvoicesListItem";
import { useAppSelector } from "../../redux/hooks";
import { images } from "../../constants";
import { Link } from "react-router-dom";

export const InvoicesList = () => {
  const filterOptions = useAppSelector((state) =>
    Object.entries(state.invoices.selectedStatuses)
      .filter((status) => status[1])
      .map((status) => status[0])
  );

  const invoices = useAppSelector((state) => {
    const invoices = state.invoices.list;
    if (filterOptions.length > 0)
      return invoices.filter((invoice) =>
        filterOptions.includes(invoice.status)
      );
    return invoices;
  });

  return (
    <div className="InvoicesList">
      <div className="InvoicesList__list">
        {invoices.length > 0 &&
          invoices.map((item, index) => (
            <Link
              className="InvoicesList__link"
              key={item.id}
              to={`/invoices/${item.id !== null ? item.id : ""}`}
            >
              <InvoicesListItem
                key={item.id}
                id={item.id === null ? index.toString() : item.id}
                date={item.date.friendlyDate}
                name={item.client.name}
                price={item.totalPrice}
                class={item.status.toLowerCase()}
              />
            </Link>
          ))}
      </div>

      {invoices.length <= 0 && (
        <div className="InvoicesList__zero-invoices">
          <img src={images.zeroInvoices} />
          <h3>There is nothing here</h3>
          <p>
            Create an invoice by clicking the New Invoice button and get started
          </p>
        </div>
      )}
    </div>
  );
};
