export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Recipe Name",
      type: "string",
    },
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "chef",
      title: "chef",
      type: "reference",
      to: { type: "chef" },
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: {
        hotshot: true,
      },
    },
    {
      name: "ingredient",
      type: "Ingredient",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ingredient",
              title: "Ingredient",
              type: "reference",
              to: [{ type: "ingredient" }],
            },
            {
              name: "wholeNumber",
              title: "Whole Number",
              type: "number",
            },
            {
              name: "fraction",
              title: "Fraction",
              type: "string",
              options: {
                list: ["1/2", "1/3", "1/4", "2/3"],
              },
            },
            {
              name: "units",
              title: "Unit",
              type: "string",
              options: ["grams", "cup", "Tbsp.", "tsp."],
            },
          ],
          preview: {
            select: {
              title: "ingredient.name",
              name: "ingredient.name",
              media: "ingredient.image",
              wholeNumber: "wholeNumber",
              fraction: "Fraction",
              unit: "Unit",
            },
            prepare({
              title,
              subtitle,
              media,
              wholeNumber = "(No wholeNumber Set)",
              fraction = "(No Fraction Set)",
              unit = "(No Unit Set)",
            }) {
              return {
                title,
                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                media,
              };
            },
          },
        },
      ],
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
    },
  ],
  initialValue: {
    likes: 0,
  },
};
