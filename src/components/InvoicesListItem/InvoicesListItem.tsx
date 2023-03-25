import "./InvoicesListItem.scss";
import { images } from "../../constants/images";

interface InvoicesListItemProps {
  id: string;
  date: string;
  name: string;
  price: string | number;
  class: string;
}

export const InvoicesListItem = (props: InvoicesListItemProps) => {
  return (
    <div className="InvoicesListItem">
      <div className="InvoicesListItem__content">
        <h2 className="InvoicesListItem__id">
          <span>#</span>
          {props.id.substring(0, 8)}
        </h2>
        <p className="InvoicesListItem__date">{props.date}</p>
        <p className="InvoicesListItem__name">{props.name}</p>
      </div>
      <div className="InvoicesListItem__content2">
        <h3 className="InvoicesListItem__price">&#163; {props.price}</h3>
        <div
          className={`InvoicesListItem__button InvoicesListItem__button--${props.class}`}
        >
          <div
            className={`InvoicesListItem__circle InvoicesListItem__circle--${props.class}`}
          ></div>
          <span>{props.class}</span>
        </div>
        <img
          className="InvoicesListItem__arrow"
          src={images.flecha}
          alt="arrow"
        />
      </div>
    </div>
  );
};
