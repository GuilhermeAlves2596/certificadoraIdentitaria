import icEdit from "../../assets/edit.svg";
import icDelete from "../../assets/delete.svg";
import "./TableRow.css";
import React, { useState } from "react";
import ConfirmDeleteModal from "../PopUp/ConfirmDeleteModal";
import Image from "next/image";
import formateDate from "../../utils/formateDate";

function TableRow({
  id,
  name,
  email,
  phone,
  createdAt,
  onDelete,
  onEdit,
}: any) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td style={{ width: "160px" }}>{phone}</td>
      <td style={{ width: "200px" }}>
        {createdAt ? formateDate(new Date(createdAt)) : "Data não disponível"}
      </td>
      <td style={{ width: "112px" }}>
        <div className="actions-div">
          <button className="rounded-btn" onClick={onEdit}>
            <Image src={icEdit} alt="" />
          </button>
          <button className="rounded-btn" onClick={handleDeleteClick}>
            <Image src={icDelete} alt="" />
          </button>
        </div>
        <ConfirmDeleteModal
          onDelete={handleDeleteConfirm}
          onCancel={handleCancel}
          isActive={showConfirmation}
        />
      </td>
    </tr>
  );
}

export default TableRow;
