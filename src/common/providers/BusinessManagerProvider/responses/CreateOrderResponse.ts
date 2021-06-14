/* eslint-disable camelcase */
interface CreateOrderResponse {
  retorno: {
    pedidos: [
      {
        pedido: {
          numero: string;
          idPedido: number;
          codigos_rastreamento: {
            codigo_rastreamento: string;
          },
          volumes: string;
        }
      }
    ]
  }
}

export default CreateOrderResponse;
