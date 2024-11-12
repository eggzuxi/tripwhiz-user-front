import { useEffect, useState, useCallback, useRef } from 'react';
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductListComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    const moveToDetails = (pno: number) => {
        navigate(`/product/read/${pno}`);
    };

    const fetchProducts = useCallback(async () => {
        if (!hasMore) return;

        setLoading(true);
        setTimeout(async () => {
            const data = await getList(page);
            if (Array.isArray(data)) {
                setProducts(prevProducts => [...prevProducts, ...data]);
                setHasMore(data.length > 0);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }, 600);
    }, [page, hasMore]);

    useEffect(() => {
        if (loading || !hasMore) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (lastProductRef.current) observerRef.current.observe(lastProductRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, hasMore]);

    useEffect(() => {
        if (hasMore) fetchProducts();
    }, [page, fetchProducts, hasMore]);

    return (
        <div className="h-screen overflow-hidden"> {/* 바깥 스크롤 숨김 */}
            <div
                className="p-4 pt-20 h-full overflow-y-auto custom-scrollbar"
                style={{ maxHeight: 'calc(100vh - 80px)' }} // 내부 스크롤 영역 설정
            >
                <h2 className="text-xl font-bold mb-4">상품 목록</h2>
                <div className="grid grid-cols-2 gap-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                key={product.pno}
                                className="relative border p-6 rounded-lg shadow-md"
                                onClick={() => moveToDetails(product.pno)}
                                ref={index === products.length - 1 ? lastProductRef : null}
                            >
                                {product.img && (
                                    <img
                                        src={`/images/${product.img}`}
                                        alt={product.pname}
                                        className="w-full h-40 object-cover mb-3"
                                    />
                                )}
                                <h3 className="text-lg font-semibold">{product.pname}</h3>
                                <p className="text-gray-700">{product.pdesc}</p>
                                <p className="text-gray-700">가격: {product.price}원</p>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="text-gray-700 text-xl absolute bottom-2 right-2"
                                />
                            </div>
                        ))
                    ) : (
                        <p>상품이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListComponent;
