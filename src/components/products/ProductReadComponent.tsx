import { FaHeart, FaRegHeart} from "react-icons/fa"; // 하트와 뒤로가기 아이콘 추가
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../types/product.ts";
import { getOne } from "../../api/productAPI.ts";
import { getCategories, getSubCategories } from "../../api/categoryAPI.ts";
import { cartStore } from "../../store/CartStore.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {ICartItems} from "../../types/cart.ts";

const initialState: IProduct = {
    pno: 0,
    pname: "",
    price: 0,
    pdesc: "",
    cno: 0,
    scno: 0,
    tno: 0,
    delflag: false,
    attachFiles: [],
};

function ProductReadComponent() {
    const navigate = useNavigate();
    const {pno} = useParams();
    const addToCart = cartStore((state) => state.addToCart);
    const [activeTab, setActiveTab] = useState("detail");

    const IMAGE_BASE_URL = "https://tripwhiz.store/api/admin/product/image";
    // const IMAGE_BASE_URL = "http://localhost:8082/api/admin/product/image";

    const [product, setProduct] = useState<IProduct>(initialState);
    const [categoryNames, setCategoryNames] = useState({
        cname: "",
        sname: "",
    });
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리


    const toggleLike = () => {
        setIsLiked((prev) => !prev);
    };

    const moveToCart = (product: IProduct, userEmail: string) => {
        const cartItem: ICartItems = {
            email: userEmail,       // 사용자 이메일
            bno: product.pno,       // 상품 번호를 bno로 매핑 (필요시 별도 처리 가능)
            pno: product.pno,       // 상품 번호
            pname: product.pname,   // 상품 이름
            price: product.price,   // 상품 가격
            qty: 1,                 // 기본 수량
            delFlag: false          // 기본 삭제 플래그
        };

        addToCart(cartItem);         // 카트에 추가
        navigate("/cart");           // 카트 페이지로 이동
    };

    const handleMoveToCart = () => {
        const email = localStorage.getItem('userEmail'); // 또는 sessionStorage

        if (product && email) {
            moveToCart(product, email);
        } else {
            console.error('Product or userEmail is missing!');
        }
    };





    useEffect(() => {
        if (!pno) return;

        const pnoNum = Number(pno);
        if (isNaN(pnoNum)) return;

        getOne(pnoNum)
            .then((result) => {
                setProduct(result);

                const fetchCategoryNames = async () => {
                    try {
                        if (result.cno) {
                            const categories: { cno: number; cname: string }[] = await getCategories();
                            const cname = categories.find((cat) => cat.cno === result.cno)?.cname || "";
                            setCategoryNames((prev) => ({ ...prev, cname }));
                        }
                        if (result.scno && result.cno) {
                            const subCategories: { scno: number; sname: string }[] = await getSubCategories(result.cno);
                            const sname = subCategories.find((sub) => sub.scno === result.scno)?.sname || "";
                            setCategoryNames((prev) => ({ ...prev, sname }));
                        }
                    } catch (error) {
                        console.error("Error fetching category names:", error);
                    }
                };

                fetchCategoryNames();
            })
            .catch((err) => {
                console.error("Failed to fetch product:", err);
            });
    }, [pno]);


    return (
        <div className="flex flex-col bg-gray-100 h-screen relative">
            {/* 뒤로가기 버튼 */}
            <button
                className="absolute top-3 left-3 bg-gray-400 bg-opacity-70 hover:bg-opacity-90 z-20 p-2 rounded-full shadow-md flex items-center justify-center"
                onClick={() => navigate(-1)}
                style={{height: "40px", width: "40px"}}
            >
                <FontAwesomeIcon icon={faChevronLeft} style={{color: "#ffffff"}} className="text-lg"/>
            </button>

            {/* 이미지 캐러셀 */}
            <div className="relative w-full h-[70vh]">
                <Swiper
                    className="w-full h-full object-cover"
                    modules={[Pagination]}
                    loop={true}
                    pagination={{
                        el: ".swiper-pagination",
                        type: "custom",
                        renderCustom: (_, current, total) => {
                            return `<span class="block text-right mr-4 font-bold text-base text-white">${current} / ${total}</span>`;
                        },
                    }}
                >
                    {product.attachFiles.length > 0 ? (
                        product.attachFiles.map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full">
                                    <img
                                        src={`${IMAGE_BASE_URL}/${product.attachFiles[0]?.file_name}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* 첫 번째 슬라이드에만 좋아요 하트 버튼 표시 */}
                                    {index === 0 && (
                                        <button
                                            onClick={toggleLike}
                                            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-10"
                                        >
                                            {isLiked ? (
                                                <FaHeart className="text-red-500 text-2xl" />
                                            ) : (
                                                <FaRegHeart className="text-gray-400 text-2xl" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200">
                            <p className="text-gray-500">이미지가 없습니다.</p>
                        </div>
                    )}
                </Swiper>
            </div>

            {/* 컨텐츠 영역 */}
            <div
                className="relative bg-white rounded-t-3xl z-10 px-6 pt-8 pb-16 -mt-20"
                style={{ minHeight: "55vh" }}
            >
                {/* 카테고리 */}
                <div className="w-full mb-2 text-left">
                    {categoryNames.cname && (
                        <span className="text-base text-gray-500">
                {categoryNames.cname}
                            {categoryNames.sname && ` > ${categoryNames.sname}`}
            </span>
                    )}
                </div>

                {/* pname과 가격 */}
                <div className="w-full mb-4 flex justify-between items-center">
                    <h2 className="text-3xl font-semibold text-[#1D2D5F] text-left">{product.pname}</h2>
                    <span className="text-2xl font-semibold text-gray-700 text-right">
            {product.price.toLocaleString()} 원
        </span>
                </div>

                {/* 탭 메뉴 */}
                <div className="w-full flex justify-center mb-4 border-b border-gray-300">
                    <button
                        className={`px-6 py-2 text-1xl font-semibold ${
                            activeTab === "detail" ? "text-gray-700 border-b-2 border-gray-700" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("detail")}
                    >
                        상세정보
                    </button>
                    <button
                        className={`px-6 py-2 text-1xl font-semibold ${
                            activeTab === "guide" ? "text-gray-700 border-b-2 border-gray-700" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("guide")}
                    >
                        이용안내
                    </button>
                    <button
                        className={`px-6 py-2 text-1xl font-semibold ${
                            activeTab === "notice" ? "text-gray-700 border-b-2 border-gray-700" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("notice")}
                    >
                        유의사항
                    </button>
                </div>

                {/* 탭 내용 */}
                <div className="w-full">
                    {activeTab === "detail" && (
                        <div>
                            <p className="text-gray-600 text-sm text-left">
                                {product.pdesc || "상품에 대한 상세 정보가 제공되지 않았습니다."}
                            </p>
                        </div>
                    )}
                    {activeTab === "guide" && (
                        <div>
                            <p className="text-gray-600 text-sm text-left">
                                이 상품은 예약 및 결제 후 사용 가능합니다. 사용 전 반드시 예약 확인을 해주시기 바랍니다.
                            </p>
                        </div>
                    )}
                    {activeTab === "notice" && (
                        <div>
                            <p className="text-gray-600 text-sm text-left">
                                환불 및 교환은 상품 수령 후 7일 이내에 가능합니다. 단, 상품의 사용 흔적이 있거나 훼손된 경우 불가능합니다.
                            </p>
                        </div>
                    )}
                </div>



                {/* 버튼들 */}
                <div className="fixed bottom-6 left-0 w-full flex justify-center gap-6 px-6">
                    <button
                        type="button"
                        className="min-w-[150px] bg-white text-[#1D2D5F] font-bold py-3 px-8 rounded-lg border border-[#2452a3] hover:bg-[#2452a3] hover:text-white focus:outline-none transition duration-300"
                        onClick={handleMoveToCart}
                    >
                        장바구니
                    </button>


                    <button
                        type="button"
                        className="min-w-[150px] bg-[#1D2D5F] text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-400 focus:outline-none transition duration-300"
                        onClick={() =>  navigate("/order/spot")}
                    >
                        바로구매
                    </button>
                </div>
            </div>
        </div>


    );

}


export default ProductReadComponent;
