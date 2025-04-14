import { type SchemaTypeDefinition } from "sanity";
import { complaint } from "./complian";
import { news } from "./news";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [complaint, news],
};
