import { MIRO_TEMPLATES } from "../../const/templates";

export const recommendTemplates = (keywords) => {
  const keywordExistsInTag = (tag, keyword) =>
    tag.toLowerCase() === keyword.toLowerCase();

  const hasMatchingTag = (tags, keywords) =>
    tags.some((tag) =>
      keywords.some((keyword) => keywordExistsInTag(tag, keyword))
    );

  const recommendedTemplates = MIRO_TEMPLATES.filter((template) =>
    hasMatchingTag(template.tags, keywords)
  );

  return recommendedTemplates;
};

export const pickTemplate = (templates) => {
  return templates[Math.floor(Math.random() * templates.length)];
};
