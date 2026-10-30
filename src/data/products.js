
const img = (name) => `/images/${name}`;

export const products = [
  // ---------- Clothing ----------
  {
    id: 1,
    name: "Black Hoodie",
    price: 2500,
    category: "Clothing",
    image: img("Black Hoodie.webp"),
    description: "Warm and comfortable hoodie for everyday wear.",
    stock: 10
  },
  {
    id: 9,
    name: "Cotton T-Shirt",
    price: 1200,
    category: "Clothing",
    image: img("Cotton T-Shirt.webp"),
    description: "Soft cotton t-shirt, perfect for summer days.",
    stock: 15
  },
  {
    id: 10,
    name: "Slim Fit Jeans",
    price: 3200,
    category: "Clothing",
    image: img("Slim Fit Jeans.webp"),
    description: "Stretchable slim fit jeans with a modern cut.",
    stock: 5
  },
  {
    id: 11,
    name: "Winter Sweater",
    price: 2800,
    category: "Clothing",
    image: img("Winter Sweater.webp"),
    description: "Thick woolen sweater to keep you warm in winter.",
    stock: 0
  },

  // ---------- Footwear ----------
  {
    id: 3,
    name: "Running Shoes",
    price: 5500,
    category: "Footwear",
    image: img("Running Shoes.webp"),
    description: "Lightweight shoes, perfect for running and gym.",
    stock: 8
  },
  {
    id: 8,
    name: "Casual Sneakers",
    price: 3800,
    category: "Footwear",
    image: img("Casual Sneakers.webp"),
    description: "Comfortable sneakers for daily use.",
    stock: 6
  },
  {
    id: 12,
    name: "Leather Sandals",
    price: 2200,
    category: "Footwear",
    image: img("Leather Sandals.webp"),
    description: "Durable leather sandals with a soft sole.",
    stock: 12
  },
  {
    id: 13,
    name: "Formal Shoes",
    price: 6500,
    category: "Footwear",
    image: img("Formal Shoes.webp"),
    description: "Polished formal shoes for office and events.",
    stock: 4
  },
  {
    id: 14,
    name: "Comfort Slides",
    price: 1500,
    category: "Footwear",
    image: img("Comfort Slides.webp"),
    description: "Light and easy slides for home and outings.",
    stock: 10
  },

  // ---------- Accessories ----------
  {
    id: 2,
    name: "Classic Wrist Watch",
    price: 4000,
    category: "Accessories",
    image: img("Classic Wrist Watch.webp"),
    description: "Stylish watch with a leather strap.",
    stock: 7
  },
  {
    id: 15,
    name: "Leather Belt",
    price: 1400,
    category: "Accessories",
    image: img("Leather Belt.webp"),
    description: "Genuine leather belt with a metal buckle.",
    stock: 9
  },
  {
    id: 16,
    name: "Silk Scarf",
    price: 1600,
    category: "Accessories",
    image: img("Silk Scarf.webp"),
    description: "Smooth silk scarf available in beautiful colors.",
    stock: 0
  },
  {
    id: 17,
    name: "Leather Wallet",
    price: 1900,
    category: "Accessories",
    image: img("Leather Wallet.webp"),
    description: "Slim wallet with card slots and a coin pocket.",
    stock: 8
  },

  // ---------- Bags ----------
  {
    id: 4,
    name: "Leather Backpack",
    price: 3500,
    category: "Bags",
    image: img("Leather Backpack.webp"),
    description: "Spacious backpack for college and travel.",
    stock: 5
  },
  {
    id: 18,
    name: "Travel Duffel Bag",
    price: 4800,
    category: "Bags",
    image: img("Travel Duffel Bag.webp"),
    description: "Large duffel bag, ideal for trips and the gym.",
    stock: 4
  },
  {
    id: 19,
    name: "Laptop Bag",
    price: 3900,
    category: "Bags",
    image: img("Laptop Bag.webp"),
    description: "Padded laptop bag that fits up to 15.6 inch laptops.",
    stock: 6
  },
  {
    id: 20,
    name: "Ladies Handbag",
    price: 4200,
    category: "Bags",
    image: img("Ladies Handbag.webp"),
    description: "Elegant handbag with multiple compartments.",
    stock: 3
  },

  // ---------- Electronics ----------
  {
    id: 7,
    name: "Wireless Headphones",
    price: 6000,
    category: "Electronics",
    image: img("Wireless Headphones.webp"),
    description: "Clear sound with long battery life.",
    stock: 5
  },
  {
    id: 23,
    name: "Bluetooth Speaker",
    price: 4500,
    category: "Electronics",
    image: img("Bluetooth Speaker.webp"),
    description: "Portable speaker with powerful bass.",
    stock: 7
  },
];
