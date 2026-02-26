import React, { useState } from 'react';

export default function Orders() {
    const [orders] = useState([
        {
            id: 'ORD-001',
            date: '2024-01-15',
            total: '$45.99',
            status: 'Delivered',
            items: 3
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            total: '$120.50',
            status: 'In Transit',
            items: 2
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            total: '$89.99',
            status: 'Processing',
            items: 1
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'text-green-600';
            case 'In Transit':
                return 'text-blue-600';
            case 'Processing':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow p-6 flex justify-between items-center hover:shadow-lg transition">
                            <div>
                                <p className="font-semibold text-lg">{order.id}</p>
                                <p className="text-gray-500 text-sm">{order.date} • {order.items} items</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{order.total}</p>
                                <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}