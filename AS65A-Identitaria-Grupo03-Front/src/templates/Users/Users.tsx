"use client";
import { useRouter } from "next/navigation";

import icAdd from "../../assets/add.svg";
import TableRow from "../../components/TableRow";
import { DeleteUser, GetUserList } from "../../services/usuarios";
import "./Users.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserAuth } from "../../utils/storages";
import AddUserModal from "../../components/Modal/AddUserModal/AddUserModal";

function UsersTemplate() {
  const navigate = useRouter();
  const [users, setUsers] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<any>([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleChangePage(1)
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (user, isEdit) => {
    setEditingUser(user);
    setIsModalOpen(true);
    setIsEdit(isEdit);
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
    const temp = await GetUserList(e);
    setUsers(temp.data);
  };

  const handleDelete = async (e) => {
    await DeleteUser(e);
    const temp = await GetUserList(1);
    setUsers(temp.data);
    setTotal(Math.ceil(temp.total / 10));

    const tempPages = [];
    for (let index = 1; index < temp.total / 10; index++) {
      tempPages.push(index);
    }
    setTotalPages(tempPages);
  };

  useEffect(() => {
    if (!getUserAuth()) {
      navigate.push("/");
      return;
    }

    const fetchData = async () => {
      const temp = await GetUserList(page);
      setUsers(temp.data);
      setTotal(Math.ceil(temp.total / 10));

      const tempPages = [];
      for (let index = 1; index < temp.total / 10; index++) {
        tempPages.push(index);
      }
      setTotalPages(tempPages);
    };
    fetchData();
  }, []);

  return (
    <>
      <title>Usuários</title>
      <section id="users">
        <div className="vl_title">
          <div>
            <h2>Usuários</h2>
            <p style={{ opacity: 0.6 }}>Listagem de usuários</p>
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
              {users.map((row: any) => {
                return (
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
                );
              })}
            </tbody>
          </table>
          <div className="div-pagination">
            <button
              className="rounded-btn mini"
              disabled={page == 1}
              onClick={(e) => handleChangePage(page - 1)}
            >
              {"<"}
            </button>
            {totalPages.map((a) => {
              return (
                <button
                  className={`rounded-btn mini page-btn ${a == 1 ? "active" : ""
                    }`}
                  key={a}
                  value={a}
                  onClick={(e: any) => handleChangePage(e.target.value)}
                >
                  {a}
                </button>
              );
            })}
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
              disabled={page == total}
              onClick={() => handleChangePage(page + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
        {isModalOpen && (
          <AddUserModal
            closeModal={closeModal}
            editingUser={editingUser}
            isEdit={isEdit}
          />
        )}
      </section>
    </>
  );
}

export default UsersTemplate;
