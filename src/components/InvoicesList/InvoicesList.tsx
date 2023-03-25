import "./InvoicesList.scss";
import { InvoicesListItem } from "../InvoicesListItem/InvoicesListItem";
import { useAppSelector } from "../../redux/hooks";
import { images } from "../../constants";
import { Link } from "react-router-dom";

export const InvoicesList = () => {
  const invoices = useAppSelector((state) => state.invoices.list);

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
        </div>
      )}
    </div>
  );
};
