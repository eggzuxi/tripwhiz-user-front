import { useEffect, useState, useCallback, useRef } from "react";
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { cartStore } from "../../store/CartStore.ts";
import CategoryFilterComponent from "./CategoryFilterComponent.tsx";
import {addCart} from "../../api/cartAPI.ts";

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
        attachFiles: [],
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

    // const IMAGE_BASE_URL = "/api/admin/product/image"; // 이미지 파일의 기본 경로 설정
    const IMAGE_BASE_URL = import.meta.env.VITE_BUCKET_URL; // 이미지 파일의 기본 경로 설정

    console.log(IMAGE_BASE_URL)

    // 쿼리스트링에서 값 가져오기 및 숫자로 변환_SY
    const tno = searchParams.get("tno") ? parseInt(searchParams.get("tno") as string, 10) : null;
    const cno = searchParams.get("cno") ? parseInt(searchParams.get("cno") as string, 10) : null;
    const scno = searchParams.get("scno") ? parseInt(searchParams.get("scno") as string, 10) : null;

    // 장바구니 슬라이드 패널 상태
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [qty, setQty] = useState(1);

    // const addToCart = cartStore((state) => state.addToCart);

    const moveToDetails = (pno: number) => {
        navigate(`/product/read/${pno}`);
    };

    const fetchProducts = useCallback(async () => {
        if (!hasMore) return;

        setLoading(true);
        setTimeout(async () => {
            const data = await getList(page, tno, cno, scno);
            if (Array.isArray(data)) {
                setProducts((prevProducts) => [...prevProducts, ...data]);
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

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
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
        setQty(1);
        setIsPanelOpen(true);
    };

    // 슬라이드 패널 닫기 함수
    const closePanel = () => {
        setIsPanelOpen(false);
        setSelectedProduct(null);
    };

    // 수량 조절 함수
    const increaseQty = () => setQty((prev) => prev + 1);
    const decreaseQty = () => setQty((prev) => Math.max(1, prev - 1));

    // 장바구니에 선택한 수량만큼 상품 추가
    const handleAddToCart = async () => {
        if (!selectedProduct) {
            console.warn("선택된 상품이 없습니다.");
            return;
        }

        try {
            // 선택된 상품의 번호와 수량으로 API 호출
            await addCart(selectedProduct.pno, selectedProduct.pname,selectedProduct.price, qty);

            console.log("장바구니에 상품이 추가되었습니다!");
            closePanel(); // 선택 패널 닫기 (선택 사항)
        } catch (error) {
            console.error("장바구니에 상품 추가 실패:", error);
            // 사용자에게 알림 또는 에러 처리
            alert("장바구니에 상품 추가에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <div className="p-4 h-full overflow-y-auto custom-scrollbar">
                <CategoryFilterComponent
                    onFilterChange={() => {
                        setPage(1); // 페이지 초기화
                        setProducts([]); // 기존 상품 리스트 초기화
                        setHasMore(true); // hasMore 상태 초기화
                        setLoading(false); // 로딩 상태 초기화
                    }}
                />
                <div className="grid grid-cols-2 gap-4">
                    {products.length > 0 ? (
                        products.map((product, index) => {
                            if (product.price === 0) return null; // 0원 상품은 렌더링하지 않음
                            return (
                                <div
                                    key={`${product.pno}-${index}`}
                                    className="relative border p-6 rounded-lg shadow-md"
                                    onClick={() => moveToDetails(product.pno)}
                                    ref={index === products.length - 1 ? lastProductRef : null}
                                >
                                    {/* 이미지 표시 */}
                                    {product.attachFiles.length > 0 && (
                                        <img
                                            src={`${IMAGE_BASE_URL}/${product.attachFiles[0].file_name}`}
                                            alt={product.pname}
                                            className="mb-2 w-full h-40 object-cover rounded"
                                        />
                                    )}
                                    {/* 상품명 */}
                                    <h3 className="text-sm text-gray-800 mb-10 text-left">
                                        {product.pname}
                                    </h3>
                                    {/* 가격과 장바구니 아이콘 (하단 정렬) */}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                        {/* 가격 */}
                                        <p className="text-lg font-bold text-gray-700 text-left">
                                            {new Intl.NumberFormat("ko-KR").format(product.price)}
                                        </p>
                                        {/* 장바구니 아이콘 */}
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            className="text-gray-700 text-lg cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openPanel(product);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>상품이 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 장바구니 슬라이드 패널 */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 transition-transform transform ${
                    isPanelOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{selectedProduct?.pname}</h2>
                    <button onClick={closePanel} className="text-gray-500 text-lg font-bold">
                        X
                    </button>
                </div>
                {selectedProduct && (
                    <>
                        <p className="text-gray-700 mb-4">
                            총 가격: <span className="font-bold">{selectedProduct.price * qty}원</span>
                        </p>
                        <div className="flex justify-end items-center mb-4">
                            <button onClick={decreaseQty} className="p-2 border rounded-l">
                                -
                            </button>
                            <span className="px-4 border-t border-b">{qty}</span>
                            <button onClick={increaseQty} className="p-2 border rounded-r">
                                +
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
                                장바구니 추가
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListComponent;
