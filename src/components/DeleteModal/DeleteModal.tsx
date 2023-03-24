import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { deleteInvoice } from "../../redux";
import "./DeleteModal.scss";

interface DeleteModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  itemId: string | number;
}

export const DeleteModal = ({
  showModal,
  itemId,
  setShowModal,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleDeleteClick = () => {
    if (itemId !== null) dispatch(deleteInvoice(itemId as string));
    navigate("/", { replace: true });
  };

  useOnClickOutside(ref, () => {
    setShowModal(false);
  });

  return (
    <div className="dmodal" style={{ display: showModal ? "flex" : "none" }}>
      <motion.div className="dmodal__body" ref={ref}>
        <h2 className="dmodal__title">Confirm Deletion</h2>
        <p className="dmodal__info">
          {`Are you sure you want to delete invoice #${"XM9141"}? This action cannot be
          undone.`}
        </p>
        <div className="dmodal__btns">
          <motion.button
            className="dmodal__btn dmodal__btn--cancel"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            className="dmodal__btn dmodal__btn--delete"
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteClick}
          >
            Delete
          </motion.button>
        </div>
      </motion.div>

      <div className="dmodal__blur"></div>
    </div>
  );
};
