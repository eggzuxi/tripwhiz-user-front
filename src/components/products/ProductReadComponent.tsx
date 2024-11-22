import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/product.ts";
import { getOne } from "../../api/productAPI.ts";
import { cartStore } from "../../store/CartStore.ts";

const initialState: IProduct = {
    pno: 0,
    pname: "",
    price: 0,
    pdesc: "",
    categoryCno: 0,
    subCategoryScno: 0,
    themeTno: 0,
    delflag: false,
    uploadFileNames: [],
};

function ProductReadComponent() {
    const navigate = useNavigate();
    const { pno } = useParams();

    const addToCart = cartStore((state) => state.addToCart);

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

        getOne(pnoNum)
            .then((result) => {
                setProduct(result);
            })
            .catch((err) => {
                console.error("Failed to fetch product:", err);
            });
    }, [pno]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-white py-12">
            {/* 이미지 */}
            <img
                src={`http://10.10.10.169/a6189c02-9628-444d-b86d-48d6753e3d17_c6_m4_02.jpg`}
                alt={product.pname}
                className="w-60 h-60 object-cover mb-8"
            />

            {/* 상품 이름 */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.pname}</h2>

            {/* 상품 설명 */}
            <p className="text-lg text-gray-600 mb-4">{product.pdesc}</p>

            {/* 가격 */}
            <div className="text-xl font-bold text-amber-500 mb-6">
                {product.price.toLocaleString()} 원
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
                <button
                    type="button"
                    className="bg-amber-400 text-white font-bold py-2 px-6 rounded hover:bg-amber-500 transition duration-300"
                    onClick={moveToCart}
                >
                    Add to Cart
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded hover:bg-gray-400 transition duration-300"
                    onClick={() => navigate("/product/list")}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default ProductReadComponent;
