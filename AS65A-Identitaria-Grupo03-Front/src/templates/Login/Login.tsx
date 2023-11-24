"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./Login.css";
import Image from "next/image";
import ciclo from "../../assets/ciclo.jpg";
import { AuthLogin } from "../../services/auth";
import { getUserAuth, setUserAuth } from "../../utils/storages";

const Login = () => {
  const navigate = useRouter();
  const [user, setUser] = useState({
    login: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    try {
      setLoading(true);
      const auth = await AuthLogin(user);
      setUserAuth({ id: auth.user.id });
      navigate.push("/professor");
    } catch (error) {
      alert("Usuário Inválido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!!getUserAuth()) {
        navigate.push("/professor");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <title>Login</title>
      <div className="container-login">
        <div className="left">
          <h2>Bons Fluidos</h2>
          <Image src={ciclo} alt="" className="left-img" width={500} />
        </div>
        <div className="right">
          <div className="card-login">
            <h2>Login</h2>
            <form
              className="form-login"
              id="loginForm"
              method="POST"
              onSubmit={doLogin}
            >
              <div className="form-group">
                <label htmlFor="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  value={user.login}
                  placeholder="Usuário"
                  name="username"
                  required
                  onChange={(e) => {
                    const temp = e.target.value;
                    setUser({ ...user, login: temp });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={user.senha}
                  placeholder="Senha"
                  name="password"
                  required
                  onChange={(e) => {
                    const temp = e.target.value;
                    setUser({ ...user, senha: temp });
                  }}
                />
              </div>
              <button
                className="btn-login"
                disabled={loading || !user.login || !user.senha}
                type="submit"
                value="Entrar"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
