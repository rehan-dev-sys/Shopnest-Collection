import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductList from '../components/ProductList';

function CategoryPage() {
  const { category } = useParams();

  const match = products.find(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  if (!match) {
    return (
      <div className="page">
        <h2>Category not found</h2>
        <Link to="/products" className="btn">View All Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-banner">
        <h1>{match.category}</h1>
        <p>Explore our {match.category} collection</p>
      </div>
      <ProductList category={category} />
    </div>
  );
}

export default CategoryPage;