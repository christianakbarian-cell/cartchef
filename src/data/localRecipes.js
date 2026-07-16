export const localRecipes = [
  {
    id: 900001,
    title: 'Microwave Mug Mac & Cheese',
    image: 'https://image.pollinations.ai/prompt/creamy%20macaroni%20and%20cheese%20in%20a%20mug,%20high%20resolution%20food%20photography',
    readyInMinutes: 5,
    servings: 1,
    summary:
      '<b>Microwave Mug Mac & Cheese</b> is the ultimate dorm-room comfort food, ready in under 5 minutes with nothing but a mug and a microwave. ' +
      'Elbow macaroni cooks directly in water inside the mug, then gets stirred together with shredded cheddar, a splash of milk, and butter for a sauce that is genuinely creamy. ' +
      'A pinch of garlic powder takes it from basic to borderline gourmet — all without a single pot or pan to wash.',
    extendedIngredients: [
      { id: 20420, originalName: 'elbow macaroni', name: 'elbow macaroni', amount: 0.33, unit: 'cup', image: 'macaroni.png' },
      { id: 1041009, originalName: 'shredded cheddar cheese', name: 'shredded cheddar cheese', amount: 0.5, unit: 'cup', image: 'cheddar-cheese.png' },
      { id: 1077, originalName: 'whole milk', name: 'whole milk', amount: 3, unit: 'tbsp', image: 'milk.png' },
      { id: 1001, originalName: 'butter', name: 'butter', amount: 1, unit: 'tsp', image: 'butter.png' },
      { id: 1019, originalName: 'garlic powder', name: 'garlic powder', amount: 0.25, unit: 'tsp', image: 'garlic-powder.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Add macaroni to a large microwave-safe mug. Pour in just enough water to cover the pasta by about half an inch.',
            ingredients: [{ id: 20420, name: 'elbow macaroni', localizedName: 'elbow macaroni', image: 'macaroni.png' }],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 2,
            step: 'Microwave on high for 2 minutes. Stir, then microwave in 1-minute intervals, stirring each time, until pasta is tender and most water is absorbed (about 3–4 minutes total).',
            ingredients: [],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 3,
            step: 'Stir in milk, butter, and garlic powder. Add shredded cheddar and stir vigorously until the sauce is smooth and creamy. Serve immediately.',
            ingredients: [
              { id: 1041009, name: 'cheddar cheese', localizedName: 'cheddar cheese', image: 'cheddar-cheese.png' },
              { id: 1077, name: 'milk', localizedName: 'milk', image: 'milk.png' },
              { id: 1001, name: 'butter', localizedName: 'butter', image: 'butter.png' },
            ],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900002,
    title: 'Air Fryer Quesadilla',
    image: 'https://image.pollinations.ai/prompt/crispy%20chicken%20quesadilla%20on%20a%20wooden%20plate,%20high%20resolution%20food%20photography',
    readyInMinutes: 12,
    servings: 1,
    summary:
      '<b>Air Fryer Quesadilla</b> comes out perfectly golden and crispy on both sides without any butter or flipping drama. ' +
      'Load a large flour tortilla with shredded cheese and canned black beans, fold it in half, and let the air fryer do the work. ' +
      'The result is a restaurant-quality crunch that a regular microwave or stovetop just cannot replicate. ' +
      'Serve with store-bought salsa and sour cream for a meal that feels way more impressive than the 12 minutes it takes.',
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
            step: 'Lay the tortilla flat. Spread black beans on one half, top with shredded cheese, then fold in half to form a half-moon.',
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
    id: 900003,
    title: 'Gourmet Kettle Ramen',
    image: 'https://image.pollinations.ai/prompt/ramen%20noodles%20in%20a%20bowl%20with%20spinach%20and%20egg,%20high%20resolution%20food%20photography',
    readyInMinutes: 8,
    servings: 1,
    summary:
      '<b>Gourmet Kettle Ramen</b> turns a 25-cent packet into something you would actually be proud to eat. ' +
      'Boiling water from your electric kettle does all the cooking — just pour it over the noodles, then stir in peanut butter and soy sauce for a rich, almost restaurant-quality broth. ' +
      'Finish with sliced green onions, a handful of fresh spinach (it wilts instantly in the hot broth), and a soft egg if you have one nearby. ' +
      'The whole thing comes together in under 10 minutes with zero cooking equipment beyond a kettle and a bowl.',
    extendedIngredients: [
      { id: 98903, originalName: 'instant ramen packet', name: 'instant ramen packet', amount: 1, unit: 'packet', image: 'ramen.png' },
      { id: 16098, originalName: 'peanut butter', name: 'peanut butter', amount: 1, unit: 'tbsp', image: 'peanut-butter.png' },
      { id: 6150, originalName: 'soy sauce', name: 'soy sauce', amount: 1, unit: 'tbsp', image: 'soy-sauce.png' },
      { id: 11291, originalName: 'green onions, sliced', name: 'green onions', amount: 2, unit: 'stalks', image: 'spring-onions.png' },
      { id: 10011457, originalName: 'fresh spinach', name: 'fresh spinach', amount: 0.5, unit: 'cup', image: 'spinach.png' },
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
            step: 'Place ramen noodles and seasoning packet in a bowl. Pour boiling water over the top, add spinach, and cover with a plate for 3 minutes.',
            ingredients: [
              { id: 98903, name: 'ramen', localizedName: 'ramen', image: 'ramen.png' },
              { id: 10011457, name: 'spinach', localizedName: 'spinach', image: 'spinach.png' },
            ],
            equipment: [{ id: 5678, name: 'electric kettle', localizedName: 'electric kettle', image: 'kettle.png' }],
          },
          {
            number: 3,
            step: 'Stir in peanut butter and soy sauce until fully dissolved. Top with green onions and egg.',
            ingredients: [
              { id: 16098, name: 'peanut butter', localizedName: 'peanut butter', image: 'peanut-butter.png' },
              { id: 6150, name: 'soy sauce', localizedName: 'soy sauce', image: 'soy-sauce.png' },
              { id: 11291, name: 'green onions', localizedName: 'green onions', image: 'spring-onions.png' },
            ],
            equipment: [],
          },
        ],
      },
    ],
  },

  {
    id: 900004,
    title: 'Air Fryer Pizza Bagels',
    image: 'https://image.pollinations.ai/prompt/pizza%20bagels%20with%20pepperoni%20and%20melted%20cheese,%20high%20resolution%20food%20photography',
    readyInMinutes: 10,
    servings: 1,
    summary:
      '<b>Air Fryer Pizza Bagels</b> are the ultimate late-night dorm snack — ready in 10 minutes and endlessly customizable. ' +
      'Mini bagels are topped with pizza sauce, mozzarella, and pepperoni, then air-fried until the cheese is bubbly and the edges of the bagel are perfectly crisp. ' +
      'They reheat beautifully and are far superior to the frozen version because you control exactly what goes on top.',
    extendedIngredients: [
      { id: 18023, originalName: 'mini bagels', name: 'mini bagels', amount: 2, unit: 'whole', image: 'bagel.png' },
      { id: 6168, originalName: 'pizza sauce', name: 'pizza sauce', amount: 3, unit: 'tbsp', image: 'pizza-sauce.png' },
      { id: 1026, originalName: 'shredded mozzarella', name: 'shredded mozzarella', amount: 0.25, unit: 'cup', image: 'mozzarella.png' },
      { id: 10110, originalName: 'pepperoni slices', name: 'pepperoni', amount: 8, unit: 'slices', image: 'pepperoni.png' },
      { id: 2064, originalName: 'dried Italian seasoning', name: 'Italian seasoning', amount: 0.25, unit: 'tsp', image: 'italian-seasoning.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Slice each bagel in half and spread pizza sauce over the cut side of each half.',
            ingredients: [
              { id: 18023, name: 'bagels', localizedName: 'bagels', image: 'bagel.png' },
              { id: 6168, name: 'pizza sauce', localizedName: 'pizza sauce', image: 'pizza-sauce.png' },
            ],
            equipment: [],
          },
          {
            number: 2,
            step: 'Top each bagel half with shredded mozzarella, pepperoni slices, and a pinch of Italian seasoning.',
            ingredients: [
              { id: 1026, name: 'mozzarella', localizedName: 'mozzarella', image: 'mozzarella.png' },
              { id: 10110, name: 'pepperoni', localizedName: 'pepperoni', image: 'pepperoni.png' },
            ],
            equipment: [],
          },
          {
            number: 3,
            step: 'Air fry at 375°F (190°C) for 5–6 minutes until cheese is melted and bubbly and bagel edges are golden. Serve immediately.',
            ingredients: [],
            equipment: [{ id: 1234, name: 'air fryer', localizedName: 'air fryer', image: 'air-fryer.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900005,
    title: 'Microwave Loaded Baked Potato',
    image: 'https://image.pollinations.ai/prompt/loaded%20baked%20potato%20with%20sour%20cream%20and%20bacon,%20high%20resolution%20food%20photography',
    readyInMinutes: 12,
    servings: 1,
    summary:
      '<b>Microwave Loaded Baked Potato</b> is a surprisingly hearty, real meal that comes together in about 12 minutes. ' +
      'A russet potato is pierced all over and microwaved until fluffy on the inside, then split open and piled high with shredded cheddar, sour cream, and real bacon bits. ' +
      'It is high in carbs and protein, genuinely filling, and costs almost nothing — making it one of the best value meals a dorm student can make.',
    extendedIngredients: [
      { id: 11362, originalName: 'large russet potato', name: 'russet potato', amount: 1, unit: 'large', image: 'russet-potato.png' },
      { id: 1041009, originalName: 'shredded cheddar cheese', name: 'shredded cheddar cheese', amount: 0.25, unit: 'cup', image: 'cheddar-cheese.png' },
      { id: 1056, originalName: 'sour cream', name: 'sour cream', amount: 2, unit: 'tbsp', image: 'sour-cream.png' },
      { id: 10123, originalName: 'real bacon bits', name: 'bacon bits', amount: 2, unit: 'tbsp', image: 'bacon.png' },
      { id: 11291, originalName: 'green onions, sliced', name: 'green onions', amount: 1, unit: 'stalk', image: 'spring-onions.png' },
      { id: 1001, originalName: 'butter', name: 'butter', amount: 1, unit: 'tbsp', image: 'butter.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Scrub the potato and pierce it all over with a fork (at least 10 times). This prevents it from bursting in the microwave.',
            ingredients: [{ id: 11362, name: 'russet potato', localizedName: 'russet potato', image: 'russet-potato.png' }],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 2,
            step: 'Place on a microwave-safe plate and microwave on high for 5 minutes. Flip and microwave for another 3–5 minutes until a fork slides in easily.',
            ingredients: [],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
          {
            number: 3,
            step: 'Cut open the potato, fluff with a fork, and top with butter, shredded cheddar, sour cream, bacon bits, and green onions.',
            ingredients: [
              { id: 1001, name: 'butter', localizedName: 'butter', image: 'butter.png' },
              { id: 1041009, name: 'cheddar cheese', localizedName: 'cheddar cheese', image: 'cheddar-cheese.png' },
              { id: 1056, name: 'sour cream', localizedName: 'sour cream', image: 'sour-cream.png' },
              { id: 10123, name: 'bacon bits', localizedName: 'bacon bits', image: 'bacon.png' },
            ],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
        ],
      },
    ],
  },

  {
    id: 900006,
    title: 'Microwave Mug Brownie',
    image: 'https://image.pollinations.ai/prompt/rich%20fudge%20brownie%20in%20a%20mug,%20high%20resolution%20food%20photography',
    readyInMinutes: 5,
    servings: 1,
    summary:
      '<b>Microwave Mug Brownie</b> is a rich, fudgy chocolate dessert that you can make in the same mug you eat it from. ' +
      'The batter comes together in under 2 minutes — just stir flour, cocoa powder, sugar, oil, and milk directly in the mug, ' +
      'then microwave for about 60 to 90 seconds until the top is just set but the center is still gooey. ' +
      'Let it cool for a minute before eating — it will be extremely hot. Top with a spoonful of peanut butter or a few chocolate chips for extra indulgence.',
    extendedIngredients: [
      { id: 20081, originalName: 'all-purpose flour', name: 'all-purpose flour', amount: 3, unit: 'tbsp', image: 'flour.png' },
      { id: 19165, originalName: 'unsweetened cocoa powder', name: 'cocoa powder', amount: 2, unit: 'tbsp', image: 'cocoa-powder.png' },
      { id: 19335, originalName: 'granulated sugar', name: 'sugar', amount: 3, unit: 'tbsp', image: 'sugar.png' },
      { id: 4582, originalName: 'vegetable oil', name: 'vegetable oil', amount: 2, unit: 'tbsp', image: 'vegetable-oil.png' },
      { id: 1077, originalName: 'whole milk', name: 'whole milk', amount: 2, unit: 'tbsp', image: 'milk.png' },
      { id: 19081, originalName: 'chocolate chips', name: 'chocolate chips', amount: 1, unit: 'tbsp', image: 'chocolate-chips.png' },
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'Add flour, cocoa powder, and sugar to a large microwave-safe mug. Stir the dry ingredients together.',
            ingredients: [
              { id: 20081, name: 'flour', localizedName: 'flour', image: 'flour.png' },
              { id: 19165, name: 'cocoa powder', localizedName: 'cocoa powder', image: 'cocoa-powder.png' },
              { id: 19335, name: 'sugar', localizedName: 'sugar', image: 'sugar.png' },
            ],
            equipment: [],
          },
          {
            number: 2,
            step: 'Add vegetable oil and milk. Stir until a smooth batter forms with no dry streaks. Fold in chocolate chips.',
            ingredients: [
              { id: 4582, name: 'vegetable oil', localizedName: 'vegetable oil', image: 'vegetable-oil.png' },
              { id: 1077, name: 'milk', localizedName: 'milk', image: 'milk.png' },
              { id: 19081, name: 'chocolate chips', localizedName: 'chocolate chips', image: 'chocolate-chips.png' },
            ],
            equipment: [],
          },
          {
            number: 3,
            step: 'Microwave on high for 60–90 seconds until the top is just set. The center should still look slightly moist — that is the fudgy part. Let cool 1 minute before eating.',
            ingredients: [],
            equipment: [{ id: 404784, name: 'microwave', localizedName: 'microwave', image: 'microwave.png' }],
          },
        ],
      },
    ],
  },
]
