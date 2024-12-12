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

    const IMAGE_BASE_URL = "http://localhost:8082/api/admin/product/image"; // 이미지 파일의 기본 경로 설정

    // 쿼리스트링에서 값 가져오기 및 숫자로 변환_SY
    const tno = searchParams.get("tno") ? parseInt(searchParams.get("tno") as string, 10) : null;
    const cno = searchParams.get("cno") ? parseInt(searchParams.get("cno") as string, 10) : null;
    const scno = searchParams.get("scno") ? parseInt(searchParams.get("scno") as string, 10) : null;

    // 장바구니 슬라이드 패널 상태
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [qty, setQty] = useState(1);

    // const addToCart = cartStore((state) => state.addToCart);

const ProductReadComponent: React.FC = () => {
    const { pno } = useParams<{ pno: string }>();
    const [product, setProduct] = useState<ProductReadDTO | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            if (!pno) {
                setError('상품 번호(pno)가 없습니다.');
                return;
            }

            try {
                const productData = await fetchProductById(Number(pno));
                if (isMounted) {
                    setProduct(productData);
                }
            } catch (error) {
                if (isMounted) {
                    setError('상품 정보를 불러오는 데 실패했습니다.');
                }
            }
        };

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, [pno]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading product...</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '10px' }}>{product.pname}</h1>
            <p style={{ marginBottom: '10px' }}>{product.pdesc}</p>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Price: {product.price}원</p>

            {product.category && (
                <p style={{ marginBottom: '5px' }}>
                    <strong>Category:</strong> {product.category.cname}
                </p>
            )}

            {product.subCategory && (
                <p style={{ marginBottom: '5px' }}>
                    <strong>SubCategory:</strong> {product.subCategory.sname}
                </p>
            )}

            {product.tnos?.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <strong>Theme Categories:</strong>
                    <ul>
                        {product.tnos.map((tno) => (
                            <li key={tno}>Theme ID: {tno}</li>
                        ))}
                    </ul>
                </div>
            )}

            {product?.attachFiles?.length > 0 ? (
                <div style={{ marginTop: '20px' }}>
                    <h3>Images:</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {product.attachFiles.map((file, index) => (
                            <img
                                key={index}
                                src={`http://localhost:8082/api/admin/product/image/${file.file_name}`}
                                alt={`Attachment ${index + 1}`}
                                style={{ width: '200px', height: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>No images available.</p>
            )}
        </div>
    );
};

export default ProductReadComponent;
