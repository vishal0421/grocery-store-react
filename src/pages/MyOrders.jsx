import { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    setMyOrders(dummyOrders || []);
  }, []);

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Orders</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
          </div>
          <p className="text-white/85 mt-4">
            {myOrders.length} {myOrders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        {myOrders.length > 0 ? (
          <div className="space-y-6">
            {myOrders.map((order, index) => (
              <Card key={index} className="p-6 shadow-xl border border-white/12 glass hover:shadow-2xl transition-shadow duration-300">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/12">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Order ID</p>
                      <p className="font-bold text-white">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Payment</p>
                      <p className="font-bold text-white">{order.paymentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Date</p>
                      <p className="font-bold text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={getStatusVariant(order.status)} className="shadow-md">
                      {order.status}
                    </Badge>
                    <p className="text-xl font-bold text-primary">
                      ${order.amount}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 ${
                        order.items.length !== itemIndex + 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-white/6 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-white/70">{item.product.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 text-sm">
                        <div className="text-center">
                          <p className="text-white/70 font-medium">Qty</p>
                          <p className="font-bold text-white">{item.quantity || 1}</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-white/70 font-medium">Price</p>
                          <p className="font-bold text-white">
                            ${item.product.offerPrice}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/70 font-medium">Total</p>
                          <p className="font-bold text-white">
                            ${item.product.offerPrice * (item.quantity || 1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-full"></div>
              <div className="absolute inset-4 bg-white/10 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              You haven't placed any orders yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;