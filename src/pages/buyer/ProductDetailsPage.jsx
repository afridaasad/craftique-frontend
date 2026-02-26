import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    // Demo product data
    const product = {
        id: productId || 1,
        name: 'Handcrafted Wooden Vase',
        price: 45.99,
        rating: 4.5,
        reviews: 128,
        description: 'Beautiful handmade wooden vase, perfect for any home decor.',
        image: '/images/product-demo.jpg',
        inStock: true,
        category: 'Home Decor',
        artisan: 'Master Craftsman',
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.name} to cart`);
    };

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, parseInt(e.target.value)));
    };

    return (
        <div className="product-details-page">
            <div className="product-container">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    
                    <div className="rating">
                        <span className="stars">★★★★☆</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                    </div>

                    <div className="price">
                        <h2>${product.price}</h2>
                        <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <p className="description">{product.description}</p>

                    <div className="artisan-info">
                        <p><strong>Artisan:</strong> {product.artisan}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                    </div>

                    <div className="purchase-section">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button 
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;