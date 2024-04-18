export type Entity = {
  name: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
};
