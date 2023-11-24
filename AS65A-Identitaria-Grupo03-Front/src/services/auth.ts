import Api from ".";

interface AuthLogin {
    login: string,
    senha: string
}

export const AuthLogin = async (model: AuthLogin) => {
    const { data } = await Api.post("/professor/login", model);
    return data;
};
