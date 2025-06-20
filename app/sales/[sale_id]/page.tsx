import { notFound } from "next/navigation";
import { ShoppingCart, Edit, ArrowLeft, Truck, Package, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Helper to get params in a server component
function getSaleId(params: { sale_id?: string }) {
    if (!params.sale_id) notFound();
    return params.sale_id;
}

type Props = {
    params: { sale_id?: string };
};

export default function OrderDetails({ params }: Props) {
    const id = getSaleId(params);

    // Mock data - replace with your backend call
    const order = {
        id: id,
        customer: {
            name: "Acme Corporation",
            email: "contact@acme-corp.com",
            phone: "+1 (555) 123-4567",
            address: "123 Business St, Corporate City, CC 12345"
        },
        date: "2024-06-20",
        status: "Completed",
        total: 5250.00,
        items: [
            { id: 1, name: "Widget Pro", sku: "WGT-001-PRO", quantity: 3, unitPrice: 299.99, total: 899.97 },
            { id: 2, name: "Smart Device X", sku: "SMT-DEV-X", quantity: 2, unitPrice: 149.99, total: 299.98 },
            { id: 3, name: "Premium Tool Kit", sku: "PTK-001", quantity: 1, unitPrice: 450.00, total: 450.00 }
        ],
        shipping: {
            method: "Express Delivery",
            cost: 25.00,
            trackingNumber: "TRK123456789",
            estimatedDelivery: "2024-06-22"
        },
        payment: {
            method: "Credit Card",
            status: "Paid",
            transactionId: "TXN789012345"
        },
        notes: "Customer requested expedited processing. Handle with care."
    };

    const subtotal = order.items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + tax + order.shipping.cost;

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'Pending': 'bg-red-100 text-red-800',
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Shipped': 'bg-blue-100 text-blue-800',
            'Completed': 'bg-green-100 text-green-800',
            'Paid': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800',
            'Refunded': 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href='/sales' className="inline-flex p-1">
                                <ArrowLeft />
                              </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order {order.id}</h1>
                        <p className="text-gray-600">Placed on {order.date}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Order
                    </Button>
                    <Button variant="outline">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Shipment
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Name</label>
                                <p className="text-gray-900">{order.customer.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{order.customer.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="text-gray-900">{order.customer.phone}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Address</label>
                                <p className="text-gray-900">{order.customer.address}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Package className="h-5 w-5 mr-2" />
                                Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Item</th>
                                            <th className="text-left py-2">SKU</th>
                                            <th className="text-left py-2">Qty</th>
                                            <th className="text-left py-2">Unit Price</th>
                                            <th className="text-left py-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="py-3">{item.name}</td>
                                                <td className="py-3 text-gray-600">{item.sku}</td>
                                                <td className="py-3">{item.quantity}</td>
                                                <td className="py-3">${item.unitPrice}</td>
                                                <td className="py-3 font-medium">${item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {order.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <NotebookPen className="h-5 w-5 mr-2" />
                                    Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{order.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Current Status</label>
                                <div className="mt-1">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Payment Status</label>
                                <div className="mt-1">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.payment.status)}`}>
                                        {order.payment.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Payment Method</label>
                                <p className="text-gray-900">{order.payment.method}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Method</label>
                                <p className="text-gray-900">{order.shipping.method}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tracking Number</label>
                                <p className="text-blue-600 font-medium">{order.shipping.trackingNumber}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Estimated Delivery</label>
                                <p className="text-gray-900">{order.shipping.estimatedDelivery}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>${order.shipping.cost.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold text-lg">${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}