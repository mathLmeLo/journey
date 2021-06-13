interface IBlingConfig {
  baseUrl: string
  token: string;
}

const BlingConfig: IBlingConfig = {
  token: process.env.BLING_TOKEN || '98a8bdd9f726a329f261849c36ea25ad9fd4667af8d141b6ee028f70b75db125f8f0869b',
  baseUrl: process.env.BLING_URL || 'https://bling.com.br/Api/v2/',
};

export default BlingConfig;
