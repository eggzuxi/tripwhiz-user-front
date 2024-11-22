import { useEffect, useState, useCallback, useRef } from 'react';
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartStore } from "../../store/CartStore.ts";

const initialState: IProduct[] = [
    {
        pno: 0, // 상품 번호 초기값
        pname: "", // 상품 이름 초기값
        price: 0, // 상품 가격 초기값
        pdesc: "", // 상품 설명 초기값
        categoryCno: 0, // 상위 카테고리 초기값
        subCategoryScno: 0, // 하위 카테고리 초기값
        themeTno: 0, // 테마 카테고리 초기값
        delflag: false, // 삭제 플래그 초기값
        uploadFileNames: [] // 파일 배열 초기값
    }
];

// 발표 끝나면 없앨 아이들.... JH
const imageUrls = [
    'http://10.10.10.169/s_5d104edf-aba6-4fc0-8baa-b4e80561130f_c1_m1_01.jpg',
    'http://10.10.10.169/s_1f262ba0-22ef-4157-ba69-6c7d023e78bf_c1_m2_02.jpg',
    'http://10.10.10.169/s_0f7e471d-4c97-4336-9f52-2d8f20a741f9_c1_m3_02.jpg',
    'http://10.10.10.169/s_47401454-7bf3-4f1e-8187-53f3c2173817_c1_m3_04.jpg',
    'http://10.10.10.169/s_544ac755-cd1b-4e67-b108-a6422e55dbc3_c1_m4_03.jpg',
    'http://10.10.10.169/s_ddb4aafb-6645-480c-b634-35e7b8046ef9_c2_m1_01.jpg',
    'http://10.10.10.169/s_2f91968a-e7d6-40b6-8eba-54de3c780a27_c2_m2_02.jpg',
    'http://10.10.10.169/s_4e6b285a-ef6a-4eb9-9cac-cf82e64b3953_c2_m4_02.jpg',
    'http://10.10.10.169/s_b416065f-ff42-4617-9312-f9ad9f202d47_c2_m5_03.jpg',
    'http://10.10.10.169/s_24f9f2a4-1820-4c97-9586-3406b6c59c85_c3_m1_01.jpg',
    'http://10.10.10.169/s_f3762a44-edbd-47bf-b92a-76fbe0e8c817_c3_m2_02.jpeg',
    'http://10.10.10.169/s_d3437ae5-ef1d-439b-baa0-f2120c353e00_c4_m1_04.jpeg',
    'http://10.10.10.169/s_e77b7def-b39c-4f92-8e47-2401c4e2beaa_c4_m4_04.jpg',
    'http://10.10.10.169/s_56f486ee-d1d9-407f-b20b-222b4a68de3e_c5_m2_02.jpg',
    'http://10.10.10.169/s_e4156e59-8c16-4073-8ec7-437c8552b26e_c5_m3_01.jpg',
    'http://10.10.10.169/s_f5d59066-ccef-4d7a-9b62-4b283eb248de_c5_m4_04.jpg',
    'http://10.10.10.169/s_cdeeff14-02be-4522-a7f2-5a5e1c0b0e64_c5_m7_03.jpeg',
    'http://10.10.10.169/s_0a2b7470-13ee-4e24-a359-c4fd6514d8c0_c5_m8_04.jpg',
    'http://10.10.10.169/s_4bfb78ea-9efe-4365-90a1-4f871a018337_c6_m2_03.jpg',
    'http://10.10.10.169/s_28a9da77-ed18-43f1-b629-ad0e55427791_c6_m5_03.jpg',
    'http://10.10.10.169/s_e4a42ae0-6afb-4cc5-b6c6-8b5a3bb9ebec_c6_m6_01.jpg',
    'http://10.10.10.169/s_747d9263-cd6a-4b61-a6d4-4dd8652cbebe_c7_m1_03.jpg',

];

const ProductListComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>([...initialState]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

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
            // 선택한 상품과 수량을 장바구니에 추가
            for (let i = 0; i < quantity; i++) {
                // @ts-ignore
                addToCart(selectedProduct, 1); // 수량만큼 반복하여 추가
            }
            closePanel();
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <div
                className="p-4 pt-20 h-full overflow-y-auto custom-scrollbar"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
                <h2 className="text-xl font-bold mb-4">상품 목록</h2>
                <div className="grid grid-cols-2 gap-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                key={`${product.pno}-${index}`}
                                className="relative border p-6 rounded-lg shadow-md"
                                onClick={() => moveToDetails(product.pno)}
                                ref={index === products.length - 1 ? lastProductRef : null}
                            >
                                {/* 이미지 경로를 순환하여 랜덤 출력 */}
                                <img
                                    src={imageUrls[index % imageUrls.length]}
                                    alt={product.pname}
                                    className="w-full h-40 object-cover mb-3"
                                />
                                <h3 className="text-lg font-semibold">{product.pname}</h3>
                                <p className="text-gray-700">{product.pdesc}</p>
                                <p className="text-gray-700">가격: {product.price}원</p>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="text-gray-700 text-xl absolute bottom-2 right-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openPanel(product); // 슬라이드 패널 열기
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
