import { useEffect, useState } from "react";
import { fetchOrderList } from "../../api/orderAPI"; // API 함수 임포트
import { OrderListDTO } from "../../types/ordertype";
import {useNavigate} from "react-router-dom";

function MyOrderComponent() {
    const [orders, setOrders] = useState<OrderListDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [size] = useState(10); // 한 페이지에 보여줄 아이템 수
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await fetchOrderList(page, size);
                setOrders(data.dtoList);
                setTotalElements(data.totalElements);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [page, size]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h1>
            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : orders.length === 0 ? (
                <div className="text-center text-gray-600">No orders found.</div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div
                            key={order.ono}
                            className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                Order #{order.ono}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Status:{" "}
                                <span className={`font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Pickup Date: {order.pickUpDate}
                            </p>
                            <p className="text-sm text-gray-600">
                                Total Amount: {order.totalAmount}
                            </p>
                            <p className="text-sm text-gray-600">
                                Total Price: ${order.totalPrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                                Ordered At: {new Date(order.createTime).toLocaleString()}
                            </p>
                            <button
                                className="mt-4 w-full bg-yellow-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg"
                                onClick={() => navigate("/details")}
                            >
                                Order Details
                            </button>
                            <button
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg"
                                onClick={() => handleCancelOrder(order.ono)}
                            >
                                Cancel Order
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-6 flex justify-center items-center">
                <button
                    className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span className="mx-2 text-sm text-gray-600">
                    Page {page + 1} of {Math.ceil(totalElements / size)}
                </span>
                <button
                    className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={orders.length < size}
                >
                    Next
                </button>
            </div>
        </div>
    );

    function getStatusColor(status: string) {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Completed":
                return "text-green-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    }

    async function handleCancelOrder(ono: number) {
        try {
            // Cancel order API 호출 로직 추가
            alert(`Order ${ono} cancelled.`);
        } catch (error) {
            console.error("Failed to cancel order", error);
        }
    }
}

export default MyOrderComponent;
