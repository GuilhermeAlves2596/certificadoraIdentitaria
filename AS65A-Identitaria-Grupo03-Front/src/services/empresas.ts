import Api from ".";

interface CompanyParams {
    nome: string,
    cnpj: string,
    rua: string,
    cidade: string,
    telefone: string,
    email: string,
    apoiador: boolean,
    voluntario: boolean,
}

export const CreateCompany = async (model: CompanyParams) => {
    const { data } = await Api.post("/empresa/save", model);
    return data;
};

export const GetCompanyList = async (page: number) => {
    const { data } = await Api.get(`empresa?page=${page}`);
    return data.empresa;
};

export const GetCompany = async (id: number) => {
    const { data } = await Api.get(`empresa/${id}`);
    return data;
};

export const UpdateCompany = async (id: number, model: CompanyParams) => {
    const { data } = await Api.put(`/empresa/update/${id}`, model);
    return data;
};

export const DeleteCompany = async (id: number) => {
    const { data } = await Api.delete(`empresa/delete/${id}`);
    return data;
};
