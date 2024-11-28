import { useEffect, useState, useCallback, useRef } from "react";
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";
import {useNavigate, useSearchParams} from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartStore } from "../../store/CartStore.ts";
import CategoryFilterComponent from "./CategoryFilterComponent.tsx";

const initialState: IProduct[] = [
    {
        pno: 0,
        pname: "",
        price: 0,
        pdesc: "",
        cno: 0,
        scno: 0,
        tno: 0,
        delflag: false,
        uploadFileNames: [],
    },
];

const ProductListComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>([...initialState]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    const [searchParams] = useSearchParams();

    // 쿼리스트링에서 값 가져오기
    const tno = searchParams.get("tno");
    const cno = searchParams.get("cno");
    const scno = searchParams.get("scno");


    // 장바구니 슬라이드 패널 상태
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [quantity, setQuantity] = useState(1);

    const addToCart = cartStore((state) => state.addToCart);

    const moveToDetails = (pno: number) => {
        navigate(`/product/read/${pno}`);
    };

    const fetchProducts = useCallback(async () => {
        if (!hasMore) return;

        setLoading(true);
        setTimeout(async () => {
            const data = await getList(page, tno, cno, scno);
            if (Array.isArray(data)) {
                setProducts(prevProducts => [...prevProducts, ...data]);
                setHasMore(data.length > 0);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }, 600);
    }, [page, hasMore, tno, cno, scno]);

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

    // 슬라이드 패널 열기 함수
    const openPanel = (product: IProduct) => {
        setSelectedProduct(product);
        setQuantity(1);
        setIsPanelOpen(true);
    };

    // 슬라이드 패널 닫기 함수
    const closePanel = () => {
        setIsPanelOpen(false);
        setSelectedProduct(null);
    };

    // 수량 조절 함수
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

    // 장바구니에 선택한 수량만큼 상품 추가
    const handleAddToCart = () => {
        if (selectedProduct) {
            for (let i = 0; i < quantity; i++) {
                // @ts-ignore
                addToCart(selectedProduct, 1); // 수량만큼 반복하여 추가
            }
            closePanel();
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <div className="p-4 h-full overflow-y-auto custom-scrollbar">
                <h2 className="text-xl font-bold mb-4">상품 목록</h2>
                <CategoryFilterComponent/>
                <div className="grid grid-cols-2 gap-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                key={`${product.pno}-${index}`}
                                className="relative border p-6 rounded-lg shadow-md"
                                onClick={() => moveToDetails(product.pno)}
                                ref={index === products.length - 1 ? lastProductRef : null}
                            >
                                {/*<img*/}
                                {/*    src={imageUrls[index % imageUrls.length]}*/}
                                {/*    alt={product.pname}*/}
                                {/*    className="w-full h-40 object-cover mb-3"*/}
                                {/*/>*/}
                                <h3 className="text-lg font-semibold">{product.pname}</h3>
                                <p className="text-gray-700">{product.pdesc}</p>
                                <p className="text-gray-700">가격: {product.price}원</p>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="text-gray-700 text-xl absolute bottom-2 right-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openPanel(product);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p>상품이 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 장바구니 슬라이드 패널 */}
            <div className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 transition-transform transform ${isPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{selectedProduct?.pname}</h2>
                    <button onClick={closePanel} className="text-gray-500 text-lg font-bold">X</button>
                </div>
                {selectedProduct && (
                    <>
                        <p className="text-gray-700 mb-4">가격: {selectedProduct.price}원</p>
                        <div className="flex justify-end items-center mb-4">
                            <button onClick={decreaseQuantity} className="p-2 border rounded-l">-</button>
                            <span className="px-4 border-t border-b">{quantity}</span>
                            <button onClick={increaseQuantity} className="p-2 border rounded-r">+</button>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">장바구니 추가</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListComponent;