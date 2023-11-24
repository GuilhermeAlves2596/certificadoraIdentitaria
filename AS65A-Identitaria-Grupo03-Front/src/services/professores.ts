import Api from ".";

interface ProfessorParams {
    nome: string,
    login: string,
    senha: string,
    cpf: string,
    idade: string,
    rua: string,
    cidade: string,
    telefone: string,
    email: string,
    curso: string,
    apoiador: boolean,
    voluntario: boolean
}

interface ProfessorCourse {
    curso: string
}

export const CreateProfessor = async (model: ProfessorParams) => {
    const { data } = await Api.post("/professor/save", model);
    return data;
};

export const GetProfessorList = async (page: number) => {
    const { data } = await Api.get(`professor?page=${page}`);
    return data.professor;
};

export const GetProfessor = async (id: number) => {
    const { data } = await Api.get(`professor/${id}`);
    return data;
};

export const GetProfessorListCourse = async (model: ProfessorCourse) => {
    const { data } = await Api.post(`professor/curso`, model);
    return data;
};

export const UpdateProfessor = async (id: number, model: ProfessorParams) => {
    const { data } = await Api.put(`/professor/update/${id}`, model);
    return data;
};

export const DeleteProfessor = async (id: number) => {
    const { data } = await Api.delete(`professor/delete/${id}`);
    return data;
};
