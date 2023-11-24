import React, { useState, useEffect } from "react";
import "./AddProfessorModal.css";
import { CreateProfessor, UpdateProfessor } from "../../../services/professores";
import { mCpf, mNumber, mPhone } from "../../../utils/masks";
import icAdd from "../../../assets/add.svg";
import Image from "next/image";

interface AddProfessorModalProps {
  closeModal: () => void;
  editingProfessor: any;
  isEdit?: boolean;
}

const AddProfessorModal: React.FC<AddProfessorModalProps> = ({
  closeModal,
  editingProfessor,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    login: "",
    senha: "",
    cpf: "",
    idade: "",
    rua: "",
    cidade: "",
    telefone: "",
    email: "",
    curso: "",
    apoiador: false,
    voluntario: false,
  });

  useEffect(() => {
    if (isEdit && editingProfessor) {
      setFormData({
        nome: editingProfessor.nome || "",
        login: editingProfessor.login || "",
        senha: editingProfessor.senha || "",
        cpf: editingProfessor.cpf || "",
        idade: editingProfessor.idade || "",
        rua: editingProfessor.rua || "",
        cidade: editingProfessor.cidade || "",
        telefone: editingProfessor.telefone || "",
        email: editingProfessor.email || "",
        curso: editingProfessor.curso || "",
        apoiador: editingProfessor.apoiador || false,
        voluntario: editingProfessor.voluntario || false,
      });
    }
  }, [isEdit, editingProfessor]);

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
        await UpdateProfessor(editingProfessor.id, formData);
      } else {
        await CreateProfessor(formData);
      }
    } catch (error) {
      console.error("Erro ao salvar professor", error);
    }

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="rounded-btn close-button" onClick={closeModal}>
          <Image src={icAdd} alt="" />
        </button>
        <h2>{isEdit ? "Editar Professor" : "Cadastro de Professores"}</h2>
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
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
              />
            </label>
            <label>
              Curso:
              <input
                type="text"
                name="curso"
                value={formData.curso}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              Usuário:
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Senha:
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
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

export default AddProfessorModal;
