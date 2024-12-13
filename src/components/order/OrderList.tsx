import React, { useState, useEffect } from "react";
import { fetchOrderList } from "../../api/orderAPI";
import { OrderListDTO } from "../../types/ordertype";

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<OrderListDTO[]>([]); // 주문 목록 상태
    const [email, setEmail] = useState(""); // 유저 이메일
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    // 주문 목록을 가져오는 함수
    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await fetchOrderList(page, 10); // API 호출
            setOrders(data.dtoList);
            setTotalPages(Math.ceil(data.totalElements / 10)); // 총 페이지 계산
        } catch (error) {
            console.error("Failed to fetch order list:", error);
        } finally {
            setLoading(false);
        }
    };

    // 이메일이나 페이지가 변경될 때 주문 목록 로드
    useEffect(() => {
        if (email) {
            loadOrders();
        }
    }, [email, page]);

    // 페이지를 이전으로 변경
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    // 페이지를 다음으로 변경
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <h1>Order List</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={loadOrders}>Load Orders</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul>
                        {orders.map((order) => (
                            <li key={order.ono}>
                                Order #{order.ono}: {order.status} - {order.totalPrice} USD
                            </li>
                        ))}
                    </ul>
                    {/* 페이지 네비게이션 */}
                    <div>
                        <button onClick={handlePrevPage} disabled={page === 1}>
                            Previous
                        </button>
                        <span>
              Page {page} of {totalPages}
            </span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderList;
