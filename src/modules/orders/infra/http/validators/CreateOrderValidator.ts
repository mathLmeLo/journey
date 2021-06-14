import {
  object, string,
} from 'zod';

const schema = object({
  cliente: string(),
  item: string(),
  valor: string(),
});

export default schema;
