import React, { useState, useEffect } from 'react';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockProducts = [
            { id: 1, name: 'Handmade Ceramic Vase', price: 45.99, category: 'ceramics', image: 'vase.jpg' },
            { id: 2, name: 'Wooden Cutting Board', price: 32.50, category: 'woodwork', image: 'board.jpg' },
            { id: 3, name: 'Knitted Sweater', price: 65.00, category: 'textiles', image: 'sweater.jpg' },
            { id: 4, name: 'Leather Wallet', price: 28.99, category: 'leather', image: 'wallet.jpg' },
            { id: 5, name: 'Handpainted Mug', price: 22.00, category: 'ceramics', image: 'mug.jpg' },
            { id: 6, name: 'Macramé Wall Hanging', price: 55.75, category: 'textiles', image: 'macrame.jpg' },
        ];
        
        setProducts(mockProducts);
        setLoading(false);
    }, []);

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    const categories = ['all', 'ceramics', 'woodwork', 'textiles', 'leather'];

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-8">All Products</h1>
            
            {/* Filter Section */}
            <div className="mb-8 flex gap-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded capitalize ${
                            filter === cat 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 text-sm mb-4 capitalize">{product.category}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}