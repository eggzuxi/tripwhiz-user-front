import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/product.ts";
import { getOne } from "../../api/productAPI.ts";
import {cartStore} from "../../store/CartStore.ts";

const initialState: IProduct = {
    pno: 0,
    pname: "",
    price: 0,
    pdesc: "",
    cno: 0,
    scno: 0,
    tno: 0,
    delflag: false,
    uploadFileNames: [],
};

// const imageUrl = 'http://10.10.10.92/ddb4aafb-6645-480c-b634-35e7b8046ef9_c2_m1_01.jpg';

function ProductReadComponent() {
    const navigate = useNavigate();
    const { pno } = useParams();
    const addToCart = cartStore((state) => state.addToCart);
    // const email = useAuthStore((state) => state.email);

    const [product, setProduct] = useState<IProduct>(initialState);

    const moveToCart = () => {
        addToCart(product);
        console.log("Added to cart:", product);
        navigate("/cart");
    };

    useEffect(() => {
        if (!pno) {
            console.warn("Invalid product number");
            return;
        }

        const pnoNum = Number(pno);
        if (isNaN(pnoNum)) {
            console.error("Invalid product number:", pno);
            return;
        }

        // 상품 정보를 가져오는 API 호출
        getOne(pnoNum)
            .then((result) => {
                setProduct(result);
            })
            .catch((err) => {
                console.error("Failed to fetch product:", err);
            });
    }, [pno]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-white p-6">
            {/* 이미지 - 화면에 꽉 차게 설정 */}
            <div className="w-full h-80 mb-6">
                <img
                    src="/public/images/read/인형.png" // 상품 이미지 URL을 이미지 표시
                    alt={product.pname}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* 용량 선택 */}
            <div className="flex gap-4 mb-6">
                <button className="bg-white border-2 border-yellow-400 text-yellow-600 py-2 px-4 rounded-full">150 ml</button>
                <button className="bg-white border-2 border-yellow-400 text-yellow-600 py-2 px-4 rounded-full">250 ml</button>
                <button className="bg-white border-2 border-yellow-400 text-yellow-600 py-2 px-4 rounded-full">350 ml</button>
            </div>

            {/* 상품 제목과 가격 - 좌우로 배치 */}
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-800">{product.pname}</h2>
                <span className="text-2xl font-semibold text-amber-500">
                    {product.price.toLocaleString()} 원
                </span>
            </div>

            {/* 상품 설명 */}
            <p className="text-lg text-gray-600 mb-4">{product.pdesc}</p>

            {/* 버튼들 */}
            <div className="flex justify-center gap-6 mb-6">
                <button
                    type="button"
                    className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 focus:outline-none transition duration-300"
                    onClick={moveToCart}
                >
                    Add to Cart
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-400 focus:outline-none transition duration-300"
                    onClick={() => navigate("/product/list")}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default ProductReadComponent;
