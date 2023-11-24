import React, { useState, useEffect } from "react";
import "./AddCompanieModal.css";
import { CreateCompany, UpdateCompany } from "../../../services/empresas";
import { mCnpj, mPhone } from "../../../utils/masks";
import Image from "next/image";
import icAdd from "../../../assets/add.svg";

interface AddCompanieModalProps {
  closeModal: () => void;
  editingCompanie: any;
  isEdit?: boolean;
}

const AddCompanieModal: React.FC<AddCompanieModalProps> = ({
  closeModal,
  editingCompanie,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    rua: "",
    cidade: "",
    telefone: "",
    email: "",
    apoiador: false,
    voluntario: false,
  });

  useEffect(() => {
    if (editingCompanie) {
      setFormData({
        nome: editingCompanie.nome || "",
        cnpj: editingCompanie.cnpj || "",
        rua: editingCompanie.rua || "",
        cidade: editingCompanie.cidade || "",
        telefone: editingCompanie.telefone || "",
        email: editingCompanie.email || "",
        apoiador: editingCompanie.apoiador || false,
        voluntario: editingCompanie.voluntario || false,
      });
    }
  }, [editingCompanie]);

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
        await UpdateCompany(editingCompanie.id, formData);
      } else {
        await CreateCompany(formData);
      }
    } catch (error) {
      console.error("Erro ao salvar empresa", error);
    }

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="rounded-btn close-button" onClick={closeModal}>
          <Image src={icAdd} alt="" />
        </button>
        <h2>{isEdit ? "Editar Empresa" : "Cadastro de Empresas"}</h2>
        <form onSubmit={handleSubmit}>
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
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}

              onChange={(e) => {
                const temp = mCnpj(e.target.value);

                setFormData({ ...formData, cnpj: temp })
              }}
              maxLength={18}
              required
            />
          </label>
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

export default AddCompanieModal;
