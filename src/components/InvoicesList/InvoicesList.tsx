import "./InvoicesList.scss";
import { InvoicesListItem } from "../InvoicesListItem/InvoicesListItem";
import { useAppSelector } from "../../redux/hooks";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { getFilteredInvoices, getSelectedStatuses } from "../../redux";
import { shallowEqual } from "react-redux";

export const InvoicesList = () => {
  const filterOptions = useAppSelector(getSelectedStatuses, shallowEqual);
  const filteredInvoices = useAppSelector(
    (state) => getFilteredInvoices(state, filterOptions),
    shallowEqual
  );

  return (
    <div className="InvoicesList">
      <div className="InvoicesList__list">
        {filteredInvoices.length > 0 &&
          filteredInvoices.map((item, index) => (
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

      {filteredInvoices.length <= 0 && (
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
