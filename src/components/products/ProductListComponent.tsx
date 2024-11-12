import { useEffect, useState, useCallback, useRef } from 'react';
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";
import {useNavigate} from "react-router-dom";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProductListComponent = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null); // IntersectionObserver reference
    const lastProductRef = useRef<HTMLDivElement | null>(null); // Reference to the last product

    const moveToDetails = (pno: number) => {

        navigate({
            pathname: `/product/read/${pno}`,
        })

    }

    // 페이지 번호에 따른 상품 리스트를 가져오는 함수
    const fetchProducts = useCallback(async () => {

        if (!hasMore) return;

        setLoading(true);

        setTimeout(async () => {

            const data = await getList(page);

            if (Array.isArray(data)) {

                setProducts(prevProducts => [...prevProducts, ...data]);
                setHasMore(data.length > 0); // Check if there is more data

            } else {
                setHasMore(false)
            }

            setLoading(false);

        }, 600); // Delay of 600 milliseconds

    }, [page]);

    // Intersection Observer 설정
    useEffect(() => {
        if (loading || !hasMore) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1); // 다음 페이지로 이동
            }
        });

        if (lastProductRef.current) observerRef.current.observe(lastProductRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, hasMore]);

    // 페이지가 변경될 때마다 데이터를 가져옴
    useEffect(() => {
        if (hasMore) fetchProducts();
    }, [page, fetchProducts, hasMore]);

    return (
        <div className="p-4 pt-20"> {/* Added top padding to avoid overlapping with the header */}
            <h2 className="text-xl font-bold mb-4">상품 목록</h2>
            <div className="grid grid-cols-2 gap-4">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={product.pno}
                            className="relative border p-6 rounded-lg shadow-md" // Increased padding and box size
                            onClick={() => moveToDetails(product.pno)}
                            ref={index === products.length - 1 ? lastProductRef : null} // 마지막 상품에 ref 적용
                        >
                            {product.fileName && (
                                <img
                                    src={`/images/${product.fileName}`}
                                    alt={product.fileName}
                                    className="w-full h-40 object-cover mb-3" // Adjusted image height
                                />
                            )}
                            <h3 className="text-lg font-semibold">{product.pname}</h3>
                            <p className="text-gray-700">{product.price}원</p>
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
            {loading && <p className="p-4 m-4">로딩 중...</p>}
            {!hasMore && <p className="p-4 m-4">더 이상 상품이 없습니다.</p>}
        </div>
    );
};

export default ProductListComponent;
