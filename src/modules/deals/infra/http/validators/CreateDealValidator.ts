import {
  object, string,
} from 'zod';

const schema = object({
  org: string(),
  title: string(),
  value: string(),
  status: string(),
});

export default schema;
