import "./InvoicePage.scss";
import { images } from "../../constants/images";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeInvoiceStatus, setFormHasErrors, toggleForm } from "../../redux";
import { DeleteModal } from "../../components";
import { useState } from "react";
import { Statuses } from "../../interfaces";
import { areInvoiceFormFieldsCorrect } from "../../utils";
// import type { Invoice } from "../../interfaces";

export const InvoicePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const formInvoice = useAppSelector((state) => state.invoices.currentInvoice);
  const invoice = useAppSelector(
    (state) => state.invoices.list?.filter((invoice) => invoice.id === id)[0]
  );

  if (invoice === null || invoice === undefined)
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return <Navigate to={"/"} />;

  const {
    projectDescription,
    billFrom,
    billTo,
    client,
    date,
    paymentDue,
    itemList,
    id: invoiceId,
    status,
    totalPrice,
  } = invoice;

  const handleEditClick = () => {
    dispatch(toggleForm({ show: true, operation: "edit" }));
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleMarkAsPaid = () => {
    if (id !== undefined && areInvoiceFormFieldsCorrect(formInvoice).success)
      dispatch(changeInvoiceStatus({ id, status: Statuses.paid }));
    else dispatch(setFormHasErrors(true));
  };

  return (
    <div className="InvoicePage">
      <div className="InvoicePage__body">
        <Link className="InvoicePage__enlace" to={"/"}>
          <img src={images.flecha} alt="" />
          Go back
        </Link>
        <div className="InvoicePage__content">
          <div className="InvoicePage__colum2">
            <p className="InvoicePage__title2">Status</p>

            <div
              className={`InvoicesListItem__button InvoicesListItem__button--${status.toLowerCase()}`}
            >
              <div
                className={`InvoicesListItem__circle InvoicesListItem__circle--${status.toLowerCase()}`}
              ></div>
              <span>{status.toLowerCase()}</span>
            </div>
            {/* fin de boton pendign */}
          </div>
          <div className="InvoicePage__btnTablet">
            <button className="InvoicePage__btnEdit" onClick={handleEditClick}>
              Edit
            </button>
            <button
              className="InvoicePage__btnDelete"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            <button className="InvoicePage__btnMask" onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          </div>
        </div>

        <div className="InvoicePage__content2">
          <div className="InvoicePage__rows">
            <div className="InvoicePage__colum">
              <h2 className="InvoicePage__title">
                <span>#</span>
                {invoiceId?.substring(0, 8)}
              </h2>
              <p className="InvoicePage__title2">{projectDescription}</p>
            </div>
            <div className="InvoicePage__colum">
              <p className="InvoicePage__title4">
                {billFrom.street} {billFrom.city} {billFrom.postCode}{" "}
                {billFrom.country}
              </p>
            </div>
          </div>

          <div className="InvoicePage__rows2">
            <div className="InvoicePage__rows2__colum">
              <div className="InvoicePage__rows2__colum__date">
                <p className="InvoicePage__title2">Invoice Date</p>
                <h3 className="InvoicePage__title3">{date.friendlyDate}</h3>
              </div>
              <div className="InvoicePage__rows2__colum__date">
                <p className="InvoicePage__title2">Payment Due</p>
                <h3 className="InvoicePage__title3">
                  {paymentDue.friendlyDate}
                </h3>
              </div>
            </div>
            <div className="InvoicePage__rows2__colum">
              <p className="InvoicePage__title2">Bill To</p>
              <h3 className="InvoicePage__title3">{client.name}</h3>
              <p className="InvoicePage__title4">
                {billTo.street} {billTo.city} {billTo.postCode} {billTo.country}
              </p>
            </div>
            <div className="InvoicePage__rows2__colum">
              <p className="InvoicePage__title2"> Sent to</p>
              <h3 className="InvoicePage__title3">{client.email}</h3>
            </div>
          </div>

          <div className="InvoicePage__rows3">
            <div className="InvoicePage__rows5">
              <p className="InvoicePage__rows5__name">Item Name</p>
              <p className="InvoicePage__rows5__qty">QTY.</p>
              <p className="InvoicePage__rows5__price">Price</p>
              <p className="InvoicePage__rows5__total">Total</p>
            </div>
            {Object.entries(itemList).map(([id, item]) => (
              <div className="InvoicePage__colum__items" key={item.id}>
                <h2 className="InvoicePage__name">{item.name}</h2>
                <p className="InvoicePage__qty">{item.amount}</p>
                <p className="InvoicePage__price">{item.price}</p>
                <h3 className="InvoicePage__total">{item.total}</h3>
              </div>
            ))}
            <div className="InvoicePage__rows3__row">
              <p className="InvoicePage__amount">Amount Due</p>
              <h3 className="InvoicePage__totalPrice">£ {totalPrice}</h3>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        itemId={invoiceId !== null ? invoiceId : ""}
      />
      <div className="InvoicePage__btnMobil">
        <button className="InvoicePage__btnEdit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="InvoicePage__btnDelete" onClick={handleDeleteClick}>
          Delete
        </button>
        <button className="InvoicePage__btnMask">Mark as Paid</button>
      </div>
    </div>
  );
};
