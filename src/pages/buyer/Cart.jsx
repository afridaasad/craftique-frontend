import React, { useState } from 'react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Handmade Ceramic Mug', price: 25.99, quantity: 2, image: '🍶' },
        { id: 2, name: 'Wooden Cutting Board', price: 45.50, quantity: 1, image: '🪵' },
        { id: 3, name: 'Knitted Scarf', price: 35.00, quantity: 1, image: '🧣' },
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ddd'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '24px' }}>{item.image}</span>
                                    <p><strong>{item.name}</strong></p>
                                    <p>${item.price}</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        style={{ width: '50px' }}
                                    />
                                    <button onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                        <p>Total: ${total.toFixed(2)}</p>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}