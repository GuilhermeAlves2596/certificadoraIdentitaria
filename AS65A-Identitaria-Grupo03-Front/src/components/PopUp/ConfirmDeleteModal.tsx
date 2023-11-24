import React from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ onDelete, onCancel, isActive }) => {
  return (
    <div className={`confirmation-modal-overlay ${isActive ? "active" : ""}`}>
      <div className="confirmation-modal">
        <p>Deseja realmente excluir este cadastro?</p>
        <div className="button-container">
          <button className="yes-button" onClick={onDelete}>
            Sim
          </button>
          <button className="no-button" onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
