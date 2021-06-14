/* eslint-disable camelcase */
interface CreateOrderDTO {
  pedido: {
    cliente?: {
      nome?: string;
      tipoPessoa?: ('J' | 'F');
      endereco?: string;
      cpf_cnpj?: string;
      ie_rg?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cep?: string;
      cidade?: string;
      uf?: string;
      fone?: string;
      email?: string;
    };
    transporte?: {
      transportadora?: string;
      tipo_frete?: ('R' | 'D');
      servico_correios?: string;
      dados_etiqueta?: {
        nome?: string;
        endereco?: string;
        numero?: string;
        complemento?: string;
        municipio?: string;
        uf?: string;
        cep?: string;
        bairro?: string;
      },
      volumes?: {
        volume?: {
          servico?: string;
          codigoRastreamento?: string;
        }[],
      },
    },
    itens?: {
      item?: {
        codigo?: string;
        descricao?: string;
        un?: string;
        qtde?: number;
        vlr_unit?: number;
      }[],
    },
    parcelas?: {
      parcela?: {
        data?: string;
        vlr?: number;
        obs?: string;
      }[],
    },
    vlr_frete?: number;
    vlr_desconto?: string;
    obs?: string;
    obs_internas?: string;
  },
}

export default CreateOrderDTO;
