import { type InsertPrompt, categories, styles, themes, audiences } from "@shared/schema";

interface PromptTemplate {
  category: string;
  style: string;
  theme: string;
  audience: string;
  templates: string[];
  productTypes: string[];
}

const promptTemplates: PromptTemplate[] = [
  {
    category: "apparel",
    style: "minimalist",
    theme: "nature",
    audience: "general",
    templates: [
      "Design a minimalist line art illustration of a {natureElement} using only black lines on a white background. Perfect for eco-conscious {audience}.",
      "Create a simple geometric representation of {natureElement} with clean lines and negative space. Ideal for modern {audience}.",
      "Design a minimalist silhouette of {natureElement} with subtle typography saying '{inspirationalText}'. Perfect for {audience}."
    ],
    productTypes: ["T-Shirt", "Hoodie", "Tank Top"]
  },
  {
    category: "accessories",
    style: "abstract",
    theme: "geometric",
    audience: "general",
    templates: [
      "Create an abstract geometric pattern using interlocking {shapes} in a palette of {colors}. Perfect for modern {audience}.",
      "Design a flowing abstract composition with {shapes} and gradient effects in {colors}. Ideal for {audience}.",
      "Create a minimalist geometric pattern with {shapes} arranged in a rhythmic composition using {colors}."
    ],
    productTypes: ["Phone Case", "Laptop Sleeve", "Tablet Cover"]
  },
  {
    category: "home",
    style: "funny",
    theme: "animals",
    audience: "general",
    templates: [
      "Create a humorous illustration of a {animal} with the text '{funnyText}' in a playful hand-lettered font.",
      "Design a cartoon-style {animal} doing {activity} with a witty caption '{funnyText}'.",
      "Illustrate a grumpy {animal} with the text '{funnyText}' in a bold, playful typeface."
    ],
    productTypes: ["Mug", "Pillow", "Wall Art"]
  },
  {
    category: "art",
    style: "typography",
    theme: "motivational",
    audience: "adults",
    templates: [
      "Design an inspiring typography poster with the quote '{motivationalQuote}' using a modern sans-serif font with a gradient background from {color1} to {color2}.",
      "Create a motivational print featuring '{motivationalQuote}' in elegant script typography with decorative elements.",
      "Design a bold typographic composition with '{motivationalQuote}' using varied font weights and sizes."
    ],
    productTypes: ["Poster", "Canvas Print", "Framed Print"]
  },
  {
    category: "bags",
    style: "vintage",
    theme: "travel",
    audience: "adults",
    templates: [
      "Design a vintage-style travel illustration featuring {landmark} with distressed textures and retro color palette.",
      "Create a nostalgic travel poster design with '{travelQuote}' and vintage airplane or compass motifs.",
      "Design a retro-style map illustration of {destination} with vintage typography and aged paper texture."
    ],
    productTypes: ["Tote Bag", "Backpack", "Messenger Bag"]
  },
  {
    category: "stationery",
    style: "modern",
    theme: "floral",
    audience: "general",
    templates: [
      "Design a modern floral pattern with {flowers} in a contemporary color palette of {colors}.",
      "Create an elegant botanical illustration featuring {flowers} with clean lines and modern styling.",
      "Design a minimalist floral border with {flowers} and subtle geometric elements."
    ],
    productTypes: ["Notebook", "Planner", "Greeting Card"]
  },
  {
    category: "seasonal",
    style: "festive",
    theme: "holiday",
    audience: "families",
    templates: [
      "Design a festive {holiday} illustration with {holidayElements} in a warm, family-friendly style.",
      "Create a cozy {holiday} design featuring {holidayElements} with the text '{holidayGreeting}'.",
      "Design a whimsical {holiday} pattern with repeating {holidayElements} in cheerful colors."
    ],
    productTypes: ["Holiday Card", "Ornament", "Seasonal Shirt"]
  },
  {
    category: "apparel",
    style: "vintage",
    theme: "food",
    audience: "general",
    templates: [
      "Design a vintage-style illustration of {food} with retro typography and distressed textures.",
      "Create a nostalgic diner-style design featuring {food} with classic '50s aesthetic.",
      "Design a retro food poster with '{foodQuote}' and vintage culinary motifs."
    ],
    productTypes: ["T-Shirt", "Hoodie", "Apron"]
  },
  {
    category: "home",
    style: "vintage",
    theme: "food",
    audience: "general",
    templates: [
      "Create a vintage kitchen poster featuring {food} with retro typography and aged textures.",
      "Design a nostalgic recipe card style illustration of {food} with classic cooking motifs.",
      "Illustrate a retro-style {food} advertisement with vintage color palette and typography."
    ],
    productTypes: ["Kitchen Towel", "Cutting Board", "Wall Art"]
  },
  {
    category: "apparel",
    style: "modern",
    theme: "food",
    audience: "general",
    templates: [
      "Create a modern, clean illustration of {food} with contemporary typography and bold colors.",
      "Design a sleek, minimalist {food} graphic with modern geometric elements.",
      "Illustrate {food} in a fresh, contemporary style with clean lines and vibrant colors."
    ],
    productTypes: ["T-Shirt", "Tank Top", "Chef's Apron"]
  },
  {
    category: "accessories",
    style: "funny",
    theme: "food",
    audience: "general",
    templates: [
      "Create a humorous {food} illustration with the text '{funnyFoodText}' in a playful font.",
      "Design a cartoon-style {food} character with a witty food pun '{funnyFoodText}'.",
      "Illustrate a funny food scene with {food} and the caption '{funnyFoodText}'."
    ],
    productTypes: ["Phone Case", "Laptop Sticker", "Keychain"]
  }
];

const templateVariables = {
  natureElement: ["mountain landscape", "forest silhouette", "ocean waves", "desert cactus", "pine tree", "wildflowers"],
  animal: ["cat", "dog", "sloth", "penguin", "llama", "owl", "fox", "bear"],
  shapes: ["triangles", "circles", "hexagons", "diamonds", "rectangles"],
  colors: ["mint green, coral pink, and gold", "navy blue, white, and silver", "coral, teal, and cream", "rose gold, blush, and ivory"],
  activity: ["drinking coffee", "reading a book", "wearing sunglasses", "listening to music", "doing yoga"],
  audience: ["everyone", "nature lovers", "outdoor enthusiasts", "design lovers", "art enthusiasts", "creative minds", "free spirits"],
  funnyText: [
    "I don't do mornings... or people... or mornings with people",
    "Powered by coffee and sarcasm",
    "I'm not lazy, I'm in energy-saving mode",
    "Currently running on caffeine and inappropriate thoughts",
    "I'm not arguing, I'm just explaining why I'm right"
  ],
  food: ["pizza", "burger", "coffee", "tacos", "donuts", "ice cream", "sushi", "pasta", "avocado", "cupcake"],
  foodQuote: [
    "Life is what you bake it",
    "Donut worry, be happy",
    "Espresso yourself",
    "You're brew-tiful",
    "Olive you very much"
  ],
  funnyFoodText: [
    "I followed my heart and it led me to the fridge",
    "I'm on a seafood diet. I see food and I eat it",
    "Relationship status: In a committed relationship with pizza",
    "I like people who love good food",
    "Will work for tacos"
  ],
  motivationalQuote: [
    "Dreams don't work unless you do",
    "Be yourself; everyone else is already taken",
    "The only impossible journey is the one you never begin",
    "Life is what happens when you're busy making other plans",
    "Success is not final, failure is not fatal"
  ],
  inspirationalText: [
    "Adventure Awaits",
    "Find Your Wild",
    "Nature Calls",
    "Explore More",
    "Stay Wild"
  ],
  landmark: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Golden Gate Bridge", "Machu Picchu"],
  destination: ["Paris", "London", "New York", "Tokyo", "Barcelona"],
  travelQuote: [
    "Not all who wander are lost",
    "Adventure is out there",
    "Collect moments, not things",
    "Life is a journey, not a destination"
  ],
  flowers: ["roses", "peonies", "eucalyptus", "wildflowers", "cherry blossoms"],
  holiday: ["Christmas", "Halloween", "Valentine's Day", "Easter", "Thanksgiving"],
  holidayElements: ["snowflakes", "pumpkins", "hearts", "bunnies", "autumn leaves"],
  holidayGreeting: ["Merry Christmas", "Happy Halloween", "Be Mine", "Happy Easter", "Give Thanks"],
  color1: ["deep navy", "forest green", "burgundy", "charcoal"],
  color2: ["bright coral", "golden yellow", "sky blue", "lavender"]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function fillTemplate(template: string, variables: typeof templateVariables): string {
  let result = template;
  
  // Replace all placeholders with actual values
  Object.entries(variables).forEach(([key, values]) => {
    const placeholder = `{${key}}`;
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, getRandomElement(values));
  });
  
  return result;
}

export function generatePrompts(options: {
  category: string;
  style: string;
  theme: string;
  audience: string;
  count: number;
}): InsertPrompt[] {
  const { category, style, theme, audience, count } = options;
  
  // Find matching templates with more flexible matching
  let templatesToUse = promptTemplates;
  
  // Filter by category first if specific category is selected
  if (category !== "all") {
    const categoryFiltered = promptTemplates.filter(template => template.category === category);
    if (categoryFiltered.length > 0) {
      templatesToUse = categoryFiltered;
    }
  }
  
  // Apply style filter if specific style is selected
  if (style !== "any") {
    const styleFiltered = templatesToUse.filter(template => template.style === style);
    if (styleFiltered.length > 0) {
      templatesToUse = styleFiltered;
    }
  }
  
  // Apply theme filter if specific theme is selected
  if (theme !== "any") {
    const themeFiltered = templatesToUse.filter(template => template.theme === theme);
    if (themeFiltered.length > 0) {
      templatesToUse = themeFiltered;
    }
  }
  
  // Apply audience filter if specific audience is selected
  if (audience !== "general") {
    const audienceFiltered = templatesToUse.filter(template => template.audience === audience);
    if (audienceFiltered.length > 0) {
      templatesToUse = audienceFiltered;
    }
  }
  

  
  const results: InsertPrompt[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = getRandomElement(templatesToUse);
    const templateText = getRandomElement(template.templates);
    const productType = getRandomElement(template.productTypes);
    
    // Create enhanced template variables with specific values
    const enhancedVariables = {
      ...templateVariables,
      audience: templateVariables.audience // Use the audience from template variables
    };
    
    const content = fillTemplate(templateText, enhancedVariables);
    
    // Create tags based on the template and options
    const tags = [
      productType,
      template.style.charAt(0).toUpperCase() + template.style.slice(1),
      template.theme.charAt(0).toUpperCase() + template.theme.slice(1)
    ];
    
    results.push({
      content,
      category: template.category,
      style: template.style,
      theme: template.theme,
      audience: template.audience,
      tags,
      isFavorite: false
    });
  }
  
  return results;
}

export function getRandomPrompt(category?: string): InsertPrompt {
  const options = {
    category: category || getRandomElement([...categories]),
    style: getRandomElement([...styles]),
    theme: getRandomElement([...themes]),
    audience: getRandomElement([...audiences]),
    count: 1
  };
  
  return generatePrompts(options)[0];
}
