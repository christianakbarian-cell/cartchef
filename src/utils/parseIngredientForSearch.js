/**
 * Strip measurements and prep adjectives so Amazon Fresh gets a clean search noun.
 * e.g. "2 cups shredded cheddar cheese" → "cheddar cheese"
 */
export function parseIngredientForSearch(ingredientString) {
  if (!ingredientString) return ''

  const units = [
    'cups?',
    'oz',
    'ounces?',
    'g',
    'grams?',
    'lbs?',
    'tbsp',
    'tsp',
    'cloves?',
    'cans?',
    'pouch(?:es)?',
    'packages?',
  ].join('|')

  const adjectives = [
    'shredded',
    'chopped',
    'diced',
    'minced',
    'sliced',
    'frozen',
    'raw',
    'fresh',
  ].join('|')

  return ingredientString
    .toLowerCase()
    // Integers, decimals, and unicode/ascii fractions
    .replace(/\d+\.\d+|\d+\/\d+|[\d¼½¾⅓⅔⅛⅜⅝⅞]+/g, ' ')
    .replace(new RegExp(`\\b(?:${units})\\b`, 'gi'), ' ')
    .replace(new RegExp(`\\b(?:${adjectives})\\b`, 'gi'), ' ')
    .replace(/[^\w\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
