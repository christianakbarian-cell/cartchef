export const localRecipes = [
  {
    id: 900001,
    title: 'Microwave Mug Oatmeal',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Mug+Oatmeal',
    readyInMinutes: 5,
    servings: 1,
    summary:
      '<b>Microwave Mug Oatmeal</b> is a warm, filling breakfast you can make in under 5 minutes with just a mug and a microwave. ' +
      'Rolled oats are cooked directly in milk for extra creaminess, then topped with honey and a handful of berries. ' +
      'It takes almost zero prep and leaves you with only one dish to rinse — a dorm-room dream.',
    extendedIngredients: [
      { id: 8120, originalName: 'rolled oats', name: 'rolled oats', amount: 0.5, unit: 'cup', image: 'rolled-oats.png' },
      { id: 1077, originalName: 'whole milk', name: 'whole milk', amount: 1, unit: 'cup', image: 'milk.png' },
      { id: 19296, originalName: 'honey', name: 'honey', amount: 1, unit: 'tbsp', image: 'honey.png' },
      { id: 9050, originalName: 'fresh blueberries', name: 'fresh blueberries', amount: 0.25, unit: 'cup', image: 'blueberries.png' },
      { id: 2010, originalName: 'ground cinnamon', name: 'ground cinnamon', amount: 0.25, unit: 'tsp', image: 'cinnamon.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Add rolled oats and milk to a large microwave-safe mug.',
            ingredients: [
              { id: 8120, name: 'rolled oats', localizedName: 'rolled oats', image: 'rolled-oats.png' },
              { id: 1077, name: 'milk', localizedName: 'milk', image: 'milk.png' },
            ],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 2,
            step: 'Microwave on high for 2 minutes. Stir, then microwave for another 1 minute until thick and creamy.',
            ingredients: [],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 3,
            step: 'Top with honey, cinnamon, and blueberries. Serve immediately.',
            ingredients: [
              { id: 19296, name: 'honey', localizedName: 'honey', image: 'honey.png' },
              { id: 2010, name: 'cinnamon', localizedName: 'cinnamon', image: 'cinnamon.png' },
              { id: 9050, name: 'blueberries', localizedName: 'blueberries', image: 'blueberries.png' },
            ],
            equipment: [],
          },
        ],
      },
    ],
  },

  {
    id: 900002,
    title: 'Air Fryer Crispy Chickpeas',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Crispy+Chickpeas',
    readyInMinutes: 20,
    servings: 2,
    summary:
      '<b>Air Fryer Crispy Chickpeas</b> are a crunchy, high-protein snack that takes almost no effort. ' +
      'A can of chickpeas is tossed with olive oil and smoked paprika, then air-fried until golden and addictive. ' +
      'They are a perfect replacement for chips and keep well in a zip-lock bag on your desk for late-night snacking.',
    extendedIngredients: [
      { id: 16057, originalName: 'canned chickpeas, drained', name: 'canned chickpeas', amount: 1, unit: 'can', image: 'chickpeas.png' },
      { id: 4053, originalName: 'olive oil', name: 'olive oil', amount: 1, unit: 'tbsp', image: 'olive-oil.png' },
      { id: 1002031, originalName: 'smoked paprika', name: 'smoked paprika', amount: 0.5, unit: 'tsp', image: 'paprika.png' },
      { id: 1102047, originalName: 'salt and pepper', name: 'salt and pepper', amount: 0.25, unit: 'tsp', image: 'salt-and-pepper.png' },
      { id: 1019, originalName: 'garlic powder', name: 'garlic powder', amount: 0.25, unit: 'tsp', image: 'garlic-powder.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Drain and rinse chickpeas, then pat them completely dry with paper towels. Dry chickpeas = extra crunch.',
            ingredients: [{ id: 16057, name: 'chickpeas', localizedName: 'chickpeas', image: 'chickpeas.png' }],
            equipment: [],
          },
          {
            number: 2,
            step: 'Toss chickpeas with olive oil, smoked paprika, garlic powder, salt, and pepper in a bowl.',
            ingredients: [
              { id: 4053, name: 'olive oil', localizedName: 'olive oil', image: 'olive-oil.png' },
              { id: 1002031, name: 'smoked paprika', localizedName: 'smoked paprika', image: 'paprika.png' },
            ],
            equipment: [],
          },
          {
            number: 3,
            step: 'Air fry at 400°F (200°C) for 15–18 minutes, shaking the basket halfway through, until deeply golden and crispy.',
            ingredients: [],
            equipment: [{ id: 1234, name: 'air fryer', localizedName: 'air fryer', image: 'air-fryer.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900003,
    title: 'Kettle Ramen Noodle Soup',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Ramen+Soup',
    readyInMinutes: 8,
    servings: 1,
    summary:
      '<b>Kettle Ramen Noodle Soup</b> is the ultimate dorm-room comfort food, elevated with a few smart add-ins. ' +
      'Boiling water from your electric kettle does all the cooking — just pour it over the noodles and seasoning, ' +
      'then stir in a spoonful of peanut butter and a dash of soy sauce for a rich, almost restaurant-quality broth. ' +
      'Finish with sliced green onions and a soft-boiled egg from the microwave for a complete meal.',
    extendedIngredients: [
      { id: 98903, originalName: 'instant ramen packet', name: 'instant ramen packet', amount: 1, unit: 'packet', image: 'ramen.png' },
      { id: 16098, originalName: 'peanut butter', name: 'peanut butter', amount: 1, unit: 'tbsp', image: 'peanut-butter.png' },
      { id: 6150, originalName: 'soy sauce', name: 'soy sauce', amount: 1, unit: 'tbsp', image: 'soy-sauce.png' },
      { id: 11291, originalName: 'green onions, sliced', name: 'green onions', amount: 2, unit: 'stalks', image: 'spring-onions.png' },
      { id: 1123, originalName: 'egg', name: 'egg', amount: 1, unit: 'whole', image: 'egg.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Boil water in your electric kettle.',
            ingredients: [],
            equipment: [{ id: 5678, name: 'electric kettle', localizedName: 'electric kettle', image: 'kettle.png' }],
          },
          {
            number: 2,
            step: 'Place ramen noodles and seasoning packet in a bowl. Pour boiling water over the top and cover with a plate for 3 minutes.',
            ingredients: [{ id: 98903, name: 'ramen', localizedName: 'ramen', image: 'ramen.png' }],
            equipment: [{ id: 5678, name: 'electric kettle', localizedName: 'electric kettle', image: 'kettle.png' }],
          },
          {
            number: 3,
            step: 'Stir in peanut butter and soy sauce until fully dissolved into the broth.',
            ingredients: [
              { id: 16098, name: 'peanut butter', localizedName: 'peanut butter', image: 'peanut-butter.png' },
              { id: 6150, name: 'soy sauce', localizedName: 'soy sauce', image: 'soy-sauce.png' },
            ],
            equipment: [],
          },
          {
            number: 4,
            step: 'Top with sliced green onions and a soft-boiled egg. Serve hot.',
            ingredients: [
              { id: 11291, name: 'green onions', localizedName: 'green onions', image: 'spring-onions.png' },
              { id: 1123, name: 'egg', localizedName: 'egg', image: 'egg.png' },
            ],
            equipment: [],
          },
        ],
      },
    ],
  },

  {
    id: 900004,
    title: 'Microwave Scrambled Eggs',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Scrambled+Eggs',
    readyInMinutes: 4,
    servings: 1,
    summary:
      '<b>Microwave Scrambled Eggs</b> are the fastest hot breakfast a dorm student can make. ' +
      'Two eggs are whisked with a splash of milk directly in a mug, then microwaved in short bursts so they stay ' +
      'fluffy rather than rubbery. Add a pinch of shredded cheddar in the last burst for melty, cheesy eggs ' +
      'that are ready before your roommate even gets out of bed.',
    extendedIngredients: [
      { id: 1123, originalName: 'eggs', name: 'eggs', amount: 2, unit: 'whole', image: 'egg.png' },
      { id: 1077, originalName: 'whole milk', name: 'whole milk', amount: 2, unit: 'tbsp', image: 'milk.png' },
      { id: 1041009, originalName: 'shredded cheddar cheese', name: 'shredded cheddar cheese', amount: 2, unit: 'tbsp', image: 'cheddar-cheese.png' },
      { id: 1102047, originalName: 'salt and pepper to taste', name: 'salt and pepper', amount: 1, unit: 'pinch', image: 'salt-and-pepper.png' },
      { id: 4073, originalName: 'unsalted butter', name: 'butter', amount: 0.5, unit: 'tsp', image: 'butter.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Grease a large microwave-safe mug with butter. Crack in eggs, add milk, salt, and pepper, and whisk with a fork.',
            ingredients: [
              { id: 1123, name: 'eggs', localizedName: 'eggs', image: 'egg.png' },
              { id: 1077, name: 'milk', localizedName: 'milk', image: 'milk.png' },
            ],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 2,
            step: 'Microwave on high for 30 seconds. Stir with a fork. Microwave again for 20 seconds and stir.',
            ingredients: [],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 3,
            step: 'Sprinkle cheddar on top and microwave a final 10–15 seconds until eggs are just set. Let sit 30 seconds before eating.',
            ingredients: [{ id: 1041009, name: 'cheddar cheese', localizedName: 'cheddar cheese', image: 'cheddar-cheese.png' }],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900005,
    title: 'Air Fryer Quesadilla',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Quesadilla',
    readyInMinutes: 12,
    servings: 1,
    summary:
      '<b>Air Fryer Quesadilla</b> comes out perfectly golden and crispy on both sides without any butter or flipping drama. ' +
      'Load a flour tortilla with shredded cheese and canned black beans, fold it in half, and let the air fryer do the work. ' +
      'Serve with store-bought salsa and a dollop of sour cream for a meal that feels way more impressive than the effort involved.',
    extendedIngredients: [
      { id: 18364, originalName: 'large flour tortilla', name: 'flour tortilla', amount: 1, unit: 'large', image: 'flour-tortilla.png' },
      { id: 1041009, originalName: 'shredded Mexican cheese blend', name: 'shredded cheese', amount: 0.5, unit: 'cup', image: 'cheddar-cheese.png' },
      { id: 16015, originalName: 'canned black beans, drained', name: 'canned black beans', amount: 0.25, unit: 'cup', image: 'black-beans.png' },
      { id: 6164, originalName: 'salsa', name: 'salsa', amount: 3, unit: 'tbsp', image: 'salsa.png' },
      { id: 1056, originalName: 'sour cream', name: 'sour cream', amount: 2, unit: 'tbsp', image: 'sour-cream.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Lay the tortilla flat. Spread beans on one half, top with shredded cheese, then fold in half to form a half-moon.',
            ingredients: [
              { id: 18364, name: 'flour tortilla', localizedName: 'flour tortilla', image: 'flour-tortilla.png' },
              { id: 16015, name: 'black beans', localizedName: 'black beans', image: 'black-beans.png' },
              { id: 1041009, name: 'shredded cheese', localizedName: 'shredded cheese', image: 'cheddar-cheese.png' },
            ],
            equipment: [],
          },
          {
            number: 2,
            step: 'Place the folded quesadilla in the air fryer basket. Air fry at 375°F (190°C) for 4 minutes.',
            ingredients: [],
            equipment: [{ id: 1234, name: 'air fryer', localizedName: 'air fryer', image: 'air-fryer.png' }],
          },
          {
            number: 3,
            step: 'Flip carefully and air fry for another 3–4 minutes until both sides are crispy and golden. Serve with salsa and sour cream.',
            ingredients: [
              { id: 6164, name: 'salsa', localizedName: 'salsa', image: 'salsa.png' },
              { id: 1056, name: 'sour cream', localizedName: 'sour cream', image: 'sour-cream.png' },
            ],
            equipment: [{ id: 1234, name: 'air fryer', localizedName: 'air fryer', image: 'air-fryer.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900006,
    title: 'Kettle Couscous Power Bowl',
    image: 'https://placehold.co/312x231/FEF3C7/D97706?text=Couscous+Bowl',
    readyInMinutes: 10,
    servings: 1,
    summary:
      '<b>Kettle Couscous Power Bowl</b> is proof that you can eat a genuinely nutritious meal in a dorm room. ' +
      'Instant couscous cooks in just 5 minutes with boiling water from your electric kettle, then gets fluffed and ' +
      'topped with chickpeas, cucumber, cherry tomatoes, and a drizzle of lemon-tahini dressing. ' +
      'It is high in protein, packed with vegetables, and requires zero cooking equipment beyond a kettle and a bowl.',
    extendedIngredients: [
      { id: 20028, originalName: 'instant couscous', name: 'instant couscous', amount: 0.5, unit: 'cup', image: 'couscous.png' },
      { id: 16057, originalName: 'canned chickpeas, drained', name: 'canned chickpeas', amount: 0.5, unit: 'cup', image: 'chickpeas.png' },
      { id: 11206, originalName: 'cucumber, diced', name: 'cucumber', amount: 0.5, unit: 'whole', image: 'cucumber.png' },
      { id: 11529, originalName: 'cherry tomatoes, halved', name: 'cherry tomatoes', amount: 0.5, unit: 'cup', image: 'cherry-tomatoes.png' },
      { id: 4058, originalName: 'tahini', name: 'tahini', amount: 1, unit: 'tbsp', image: 'tahini.png' },
      { id: 9152, originalName: 'lemon juice', name: 'lemon juice', amount: 1, unit: 'tbsp', image: 'lemon-juice.png' },
      { id: 1102047, originalName: 'salt and pepper to taste', name: 'salt and pepper', amount: 1, unit: 'pinch', image: 'salt-and-pepper.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Boil water in your electric kettle. Place couscous in a bowl, pour just enough boiling water to cover (about ¾ cup), and cover with a plate for 5 minutes.',
            ingredients: [{ id: 20028, name: 'couscous', localizedName: 'couscous', image: 'couscous.png' }],
            equipment: [{ id: 5678, name: 'electric kettle', localizedName: 'electric kettle', image: 'kettle.png' }],
          },
          {
            number: 2,
            step: 'Fluff couscous with a fork, then season with salt and pepper.',
            ingredients: [{ id: 1102047, name: 'salt and pepper', localizedName: 'salt and pepper', image: 'salt-and-pepper.png' }],
            equipment: [],
          },
          {
            number: 3,
            step: 'Whisk together tahini and lemon juice in a small cup. Add a splash of water to thin if needed.',
            ingredients: [
              { id: 4058, name: 'tahini', localizedName: 'tahini', image: 'tahini.png' },
              { id: 9152, name: 'lemon juice', localizedName: 'lemon juice', image: 'lemon-juice.png' },
            ],
            equipment: [],
          },
          {
            number: 4,
            step: 'Top couscous with chickpeas, diced cucumber, and cherry tomatoes. Drizzle with the tahini dressing and serve.',
            ingredients: [
              { id: 16057, name: 'chickpeas', localizedName: 'chickpeas', image: 'chickpeas.png' },
              { id: 11206, name: 'cucumber', localizedName: 'cucumber', image: 'cucumber.png' },
              { id: 11529, name: 'cherry tomatoes', localizedName: 'cherry tomatoes', image: 'cherry-tomatoes.png' },
            ],
            equipment: [],
          },
        ],
      },
    ],
  },
]
