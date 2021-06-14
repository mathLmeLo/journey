/* eslint-disable camelcase */
interface CreateProductResponse {
  retorno: {
    produtos: [
      {
        produto: {
          id: number;
          codigo: string;
          descricao: string;
          tipo: string;
          situacao: string;
          unidade: string;
          preco: string;
          precoCusto: string;
          descricaoComplementar: string;
          cest: string;
          class_fiscal: string;
          idGrupoProduto: string;
          linkExterno: string;
          observacoes: string;
          descricaoFornecedor: string;
          idFabricante: string;
          codigoFabricante: string;
          pesoLiq: string;
          pesoBruto: string;
          gtin: string;
          gtinEmbalagem: string;
          alturaProduto: string;
          larguraProduto: string;
          profundidadeProduto: string;
          unidadeMedida: string;
          itensPorCaixa: string;
          volumes: string;
          estoqueMinimo: string;
          estoqueMaximo: string;
          localizacao: string;
          crossdocking: string;
          marca: string;
          garantia: string;
          condicao: string;
          freteGratis: string;
          producao: string;
          dataValidade: string;
          spedTipoItem: string;
          idCategoria: string;
        }
      }
    ]
  }
}

export default CreateProductResponse;
