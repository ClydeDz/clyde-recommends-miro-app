import { encode } from "@toon-format/toon";
import { MIRO_TEMPLATES } from "../../const/templates";

const templatesWithoutTags = MIRO_TEMPLATES.map((template) => {
  return {
    id: template.id,
    title: template.title,
    url: template.url,
    description: template.description,
  };
});

export const getTemplateDataInToonFormat = () => {
  return encode(templatesWithoutTags);
};
