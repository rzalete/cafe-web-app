export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
  };
  
  export type MenuSection = {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
  };
  
  export const menuSections: MenuSection[] = [
    {
      id: "coffee",
      name: "Signature Coffee",
      description: "House espresso, manual brew options, and seasonal beans.",
      items: [
        {
          id: "espresso",
          name: "Espresso",
          description: "Bold single-origin espresso with a rich crema.",
          price: "$3.50",
        },
        {
          id: "cappuccino",
          name: "Cappuccino",
          description: "Balanced espresso with silky steamed milk and foam.",
          price: "$4.50",
        },
        {
          id: "pour-over",
          name: "Pour Over",
          description: "Hand-brewed coffee with rotating seasonal beans.",
          price: "$5.00",
        },
      ],
    },
    {
      id: "pastries",
      name: "Fresh Pastries",
      description: "Daily baked croissants, danishes, and sweet cafe favorites.",
      items: [
        {
          id: "butter-croissant",
          name: "Butter Croissant",
          description: "Flaky laminated pastry baked fresh each morning.",
          price: "$3.75",
        },
        {
          id: "almond-danish",
          name: "Almond Danish",
          description: "Soft pastry filled with almond cream and toasted slices.",
          price: "$4.25",
        },
        {
          id: "banana-bread",
          name: "Banana Bread",
          description: "Moist house loaf served in generous cafe slices.",
          price: "$3.25",
        },
      ],
    },
    {
      id: "brunch",
      name: "Brunch Plates",
      description: "Simple savory dishes designed for a relaxed cafe experience.",
      items: [
        {
          id: "avocado-toast",
          name: "Avocado Toast",
          description: "Sourdough topped with smashed avocado and chili flakes.",
          price: "$8.50",
        },
        {
          id: "egg-sandwich",
          name: "Egg Sandwich",
          description: "Soft brioche with egg, cheese, and house aioli.",
          price: "$7.75",
        },
        {
          id: "granola-bowl",
          name: "Granola Bowl",
          description: "Yogurt, fruit, and crunchy granola for a lighter start.",
          price: "$6.50",
        },
      ],
    },
  ];
  