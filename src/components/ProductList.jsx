
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const highestPrice = Math.max(...products.map((p) => p.price));

function ProductList({ category }) {
  const { getStock } = useCart();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [sort, setSort] = useState('default');

  const allCategories = ['All', ...new Set(products.map((p) => p.category))];

  const list = products.filter((p) => {
    const matchPage = !category || p.category.toLowerCase() === category.toLowerCase();
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price <= maxPrice;

    return matchPage && matchCategory && matchSearch && matchPrice;
  });

  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setMaxPrice(highestPrice);
    setSort('default');
  };

  return (
    <div className="page">
      <div className="listing">
        <aside className="sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!category && (
            <div className="filter-group">
              <label>Category</label>

              {allCategories.map((c) => (
                <label className="radio-row" key={c}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === c}
                    onChange={() => setSelectedCategory(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          )}

          <div className="filter-group">
            <label>Max Price: Rs. {maxPrice}</label>
            <input
              type="range"
              min="500"
              max={highestPrice}
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <button className="btn btn-outline" onClick={resetFilters}>
            Reset Filters
          </button>
        </aside>

        <div className="listing-main">
          <p className="result-count">{list.length} products found</p>

          <div className="product-grid">
            {list.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                stock={getStock(product.id)}
              />
            ))}
          </div>

          {list.length === 0 && <p>No products match your filters.</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
