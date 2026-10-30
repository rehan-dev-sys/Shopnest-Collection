import ProductList from '../components/ProductList';

function Products() {
  return (
    <div>
      <div className="page-banner">
        <h1>All Products</h1>
        <p>Browse our complete collection</p>
      </div>
      <ProductList />
    </div>
  );
}

export default Products;