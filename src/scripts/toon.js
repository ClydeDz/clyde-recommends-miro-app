import { encode } from "@toon-format/toon";
import { MIRO_TEMPLATES } from "../const/templates.js";

const templatesWithoutTags = MIRO_TEMPLATES.map((template) => {
  return {
    id: template.id,
    title: template.title,
    url: template.url,
    description: template.description,
  };
});

console.log(encode(templatesWithoutTags));
