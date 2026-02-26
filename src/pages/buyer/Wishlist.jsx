import React, { useState } from 'react';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([
        { id: 1, name: 'Handmade Ceramic Mug', price: 25, image: 'mug.jpg' },
        { id: 2, name: 'Wooden Craft Box', price: 45, image: 'box.jpg' },
        { id: 3, name: 'Knitted Scarf', price: 35, image: 'scarf.jpg' },
    ]);

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <div className="wishlist-container">
            <h1>My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map(item => (
                        <div key={item.id} className="wishlist-item">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => removeFromWishlist(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}