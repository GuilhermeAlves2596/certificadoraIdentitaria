import { useEffect, useState } from "react";
import icLogout from "../../assets/logout.svg";
import { useRouter } from "next/router";
import "./NavBar.css";
import Image from "next/image";
import { removeUserAuth } from "../../utils/storages";

function NavBar() {
  const [myWindow, setMyWindow] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMyWindow(window);
    }
  }, []);

  const handleLogout = () => {
    removeUserAuth();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (!myWindow) return null;

  return (
    <header className="container">
      <h1 className="title">Bons Fluídos</h1>
      <nav>
        <ul className="nav">
          <li
            className={`itemNav ${
              myWindow.location.href.includes("user") ? "active" : ""
            }`}
          >
            <a href="/user">Usuários</a>
          </li>
          <li
            className={`itemNav ${
              myWindow.location.href.includes("professor") ? "active" : ""
            }`}
          >
            <a href="/professor">Professores</a>
          </li>
          <li
            className={`itemNav ${
              myWindow.location.href.includes("company") ? "active" : ""
            }`}
          >
            <a href="/company">Empresas</a>
          </li>
          <li className="itemNav">
            <button className="logout-button" onClick={handleLogout}>
              <Image src={icLogout} alt="Logout" />
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
