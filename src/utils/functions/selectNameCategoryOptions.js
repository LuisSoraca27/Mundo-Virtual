export const optionsCategory = [
  { name: "Netflix", code: "2" },
  { name: "Max", code: "3" },
  { name: "Disney Plus", code: "4" },
  { name: "Amazon Prime Video", code: "1" },
  { name: "Star+", code: "5" },
  { name: "Paramount+", code: "6" },
  { name: "Vix+", code: "7" },
  { name: "Plex", code: "8" },
  { name: "Crunchyroll", code: "9" },
  { name: "El Profenet", code: "10" },
  { name: "Iptv", code: "11" },
  { name: "Apple TV", code: "19" },
  { name: "Pornhub", code: "20" },
  { name: "Brazzers", code: "21" },
  { name: "Rakuten Viki", code: "22" },
  { name: "Acorn TV", code: "23" },
  { name: "Mubi", code: "24" },
];

export const selectCategoriesCPs = (categories = []) => {
  const categoriesFilter = categories.map((category) => {
    const categoryOption = optionsCategory.find(
      (option) => String(option.code) === String(category.id)
    );
    return categoryOption || null; // Retorna null si no encuentra la categoría
  });

  return categoriesFilter;
};

export const getCategoryColor = (categoryId) => {
  const categoryOption = optionsCategory.find(
    (option) => String(option.code) === String(categoryId)
  );
  return categoryOption;
};
