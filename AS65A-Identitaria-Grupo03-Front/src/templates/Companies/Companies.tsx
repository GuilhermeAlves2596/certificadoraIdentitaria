import React, { useState, useEffect } from "react";
import icAdd from "../../assets/add.svg";
import TableRow from "../../components/TableRow";
import { DeleteCompany, GetCompanyList } from "../../services/empresas";
import "./Companies.css";
import Image from "next/image";
import AddCompanieModal from "../../components/Modal/AddCompanieModal/AddCompanieModal";

function CompaniesTemplate() {
  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleChangePage(1)
  };

  const handleEdit = (company, isEdit) => {
    setEditingCompany(company);
    setIsModalOpen(true);
    setIsEdit(isEdit);
  };

  const handleAdd = () => {
    setEditingCompany(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleChangePage = async (e) => {
    setPage(e);
    if (!!document) {
      const pagesBtns = document.getElementsByClassName("page-btn");
      for (let index = 0; index < pagesBtns.length; index++) {
        pagesBtns[index].classList.remove("active");
      }
      pagesBtns[e - 1].classList.add("active");
    }
    const temp = await GetCompanyList(e);
    setCompanies(temp.data);
  };

  const handleDelete = async (e) => {
    await DeleteCompany(e);
    const temp = await GetCompanyList(1);
    setCompanies(temp.data);
    setTotal(Math.ceil(temp.total / 10));

    const tempPages = [];
    for (let index = 1; index < temp.total / 10; index++) {
      tempPages.push(index);
    }
    setTotalPages(tempPages);
  };

  useEffect(() => {
    const fetchData = async () => {
      const temp = await GetCompanyList(page);
      setCompanies(temp.data);
      setTotal(Math.ceil(temp.total / 10));

      const tempPages = [];
      for (let index = 1; index < temp.total / 10; index++) {
        tempPages.push(index);
      }
      setTotalPages(tempPages);
    };
    fetchData();
  }, [page]);

  return (
    <>
      <title>Empresas</title>
      <section id="companies">
        <div className="vl_title">
          <div>
            <h2>Empresas</h2>
            <p style={{ opacity: 0.6 }}>Listagem de empresas</p>
          </div>
          <button className="rounded-btn" onClick={handleAdd}>
            <Image src={icAdd} alt="" />
          </button>
        </div>
        <div className="vl_div_table">
          <table className="vl-table">
            <thead style={{ backgroundColor: "rgb(251 200 200)" }}>
              <tr>
                <th style={{ borderRadius: "5px 0px 0px 0px" }}>Id</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data</th>
                <th
                  style={{
                    borderRadius: "0px 5px 0px 0px",
                    textAlign: "center",
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((row) => (
                <TableRow
                  key={row.id}
                  id={row.id}
                  name={row.nome}
                  email={row.email}
                  createdAt={row.createdAt}
                  phone={row.telefone}
                  onDelete={() => handleDelete(row.id)}
                  onEdit={() => handleEdit(row, true)}
                />
              ))}
            </tbody>
          </table>
          <div className="div-pagination">
            <button
              className="rounded-btn mini"
              disabled={page === 1}
              onClick={() => handleChangePage(page - 1)}
            >
              {"<"}
            </button>
            {totalPages.map((a) => (
              <button
                className={`rounded-btn mini page-btn ${
                  a === 1 ? "active" : ""
                }`}
                key={a}
                value={a}
                onClick={(e: any) => handleChangePage(e.target.value)}
              >
                {a}
              </button>
            ))}
            {total > 1 && (
              <>
                <button
                  style={{ opacity: 1 }}
                  className="rounded-btn mini"
                  disabled
                >
                  . . .
                </button>

                <button
                  value={total}
                  className="rounded-btn mini page-btn"
                  onClick={(e: any) => handleChangePage(e.target.value)}
                >
                  {total}
                </button>
              </>
            )}
            <button
              className="rounded-btn mini"
              disabled={page === total}
              onClick={() => handleChangePage(page + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <AddCompanieModal
          closeModal={closeModal}
          editingCompanie={editingCompany}
          isEdit={isEdit}
        />
      )}
    </>
  );
}

export default CompaniesTemplate;
