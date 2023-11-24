import Api from ".";

interface UserParams {
    nome: string,
    cpf: string,
    idade: string,
    rua: string,
    cidade: string,
    telefone: string,
    email: string,
    profissao: string,
    apoiador: boolean,
    voluntario: boolean,
}

export const CreateUser = async (model: UserParams) => {
    const { data } = await Api.post("/user/save", model);
    return data;
};

export const GetUserList = async (page: number) => {
    const { data } = await Api.get(`user?page=${page}`);
    return data.user;
};

export const GetUser = async (id: number) => {
    const { data } = await Api.get(`user/${id}`);
    return data;
};

export const UpdateUser = async (id: number, model: UserParams) => {
    const { data } = await Api.put(`/user/update/${id}`, model);
    return data;
};

export const DeleteUser = async (id: number) => {
    const { data } = await Api.delete(`user/delete/${id}`);
    return data;
};
