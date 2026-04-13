const categories = ["Electronics", "Fashion", "Gaming", "Home"];

export const products = Array.from({ length: 120 }, (_, i) => ({
  id: `product-${i + 1}`,
  title: `Product ${i + 1}`,
  price: 1000 + ((i * 137) % 20000), // stable (no hydration issues)
  image: `https://picsum.photos/300?random=${i + 1}`,
  description: `High quality product ${i + 1}`,
  category: categories[i % categories.length],
}));