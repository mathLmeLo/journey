/* eslint-disable camelcase */
interface CreateProductDTO {
  produto: {
    codigo?: string;
    descricao: string;
    tipo?: ('S' | 'P' | 'N');
  };
}

export default CreateProductDTO;
