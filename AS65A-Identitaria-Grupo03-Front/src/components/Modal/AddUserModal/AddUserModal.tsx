import React, { useState, useEffect } from "react";
import "./AddUserModal.css";
import { UpdateUser, CreateUser } from "../../../services/usuarios";
import { mCpf, mNumber, mPhone } from "../../../utils/masks";
import Image from "next/image";
import icAdd from "../../../assets/add.svg";

interface AddUserModalProps {
  closeModal: () => void;
  editingUser: any;
  isEdit?: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  closeModal,
  editingUser,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    idade: "",
    rua: "",
    cidade: "",
    telefone: "",
    email: "",
    profissao: "",
    apoiador: false,
    voluntario: false,
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({ ...editingUser });
    } else {
      setFormData({
        nome: "",
        cpf: "",
        idade: "",
        rua: "",
        cidade: "",
        telefone: "",
        email: "",
        profissao: "",
        apoiador: false,
        voluntario: false,
      });
    }
  }, [editingUser, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await UpdateUser(editingUser.id, formData);
      } else {
        await CreateUser(formData);
      }
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error);
    }

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="rounded-btn close-button" onClick={closeModal}>
          <Image src={icAdd} alt="" />
        </button>
        <h2>{isEdit ? "Editar Usuários" : "Cadastro de Usuários"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              CPF:
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={(e) => {
                  const temp = mCpf(e.target.value);

                  setFormData({ ...formData, cpf: temp })
                }}
                maxLength={15}
                required
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              Idade:
              <input
                type="text"
                name="idade"
                value={formData.idade}
                onChange={(e) => {
                  const temp = mNumber(e.target.value);

                  setFormData({ ...formData, idade: temp })
                }}
              />
            </label>
            <label>
              Profissão:
              <input
                type="text"
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              Telefone:
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={(e) => {
                  const temp = mPhone(e.target.value);

                  setFormData({ ...formData, telefone: temp })
                }}
                maxLength={15}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              Rua:
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
              />
            </label>
            <label>
              Cidade:
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center'
          }}>
            <div className="checkbox-group">
              <label>
                Apoiador:
                <input
                  type="checkbox"
                  name="apoiador"
                  checked={formData.apoiador}
                  onChange={handleChange}
                />
              </label>
              <label>
                Voluntário:
                <input
                  type="checkbox"
                  name="voluntario"
                  checked={formData.voluntario}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">{isEdit ? "Salvar" : "Cadastrar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
