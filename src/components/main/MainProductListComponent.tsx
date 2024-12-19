import {useEffect, useState} from "react";
import {getList} from "../../api/productAPI.ts";

interface Product{
    pno: number;
    pname: string;
    price: number;
    cno: number;
    attachFiles: { file_name: string }[]; // attachFiles 배열 추가
}

interface Category {
    cno: number;
    cname: string;
}

interface MainProductListProps {
    categories: Category[]; // 카테고리 데이터를 상위에서 전달받음
}

const IMAGE_BASE_URL = "http://localhost:8082/api/admin/product/image";

const MainProductListComponent: React.FC<MainProductListProps> = ({ categories }) => {

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]); // 상품 데이터를 가져올 상태
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // 필터링된 상품 상태

    //카테고리 클릭 처리
    const handleCategoryClick = (cno: number | null) => {
        setSelectedCategory(cno); // 선택된 카테고리 업데이트

    };


    // 상품 필터링 함수
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 여기서 API 호출을 통해 상품 데이터를 가져옵니다.
                const productData = await getList(1, null, selectedCategory, null);
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (selectedCategory !== null) {
            fetchProducts();
        }
    }, [selectedCategory]);

    // 상품 필터링 및 랜덤 추출
    useEffect(() => {
        if (selectedCategory !== null) {
            const filtered = products.filter(product => product.cno === selectedCategory);
            const randomProducts = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
            setFilteredProducts(randomProducts);
        }
    }, [selectedCategory, products]);

    // 초기 카테고리 설정
    useEffect(() => {
        if (categories.length > 0) {
            const defaultCategory = categories.find((category) => category.cno === 1); // 기본값: cno === 1
            if (defaultCategory) {
                setSelectedCategory(defaultCategory.cno);
            }
        }
    }, [categories]);

    return (
        <div>
            {/* 카테고리 선택 */}
            <div className="bg-white-200 px-4 py-2 pt-4">
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide w-full">
                    {categories.map((category) => (
                        <div
                            key={category.cno}
                            onClick={() => handleCategoryClick(category.cno)}
                            className={`text-gray-500 text-base cursor-pointer transition-all duration-300 relative whitespace-nowrap ${
                                selectedCategory === category.cno ? "text-gray-800" : "hover:text-gray-800"
                            }`}
                        >
                            {category.cname}
                            {selectedCategory === category.cno && (
                                <div className="w-full h-[2px] bg-yellow-400 mt-1"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product.pno}
                        className="bg-white border rounded-lg shadow-sm overflow-hidden"
                    >
                        <div className="relative">
                            {/* attachFiles의 첫 번째 이미지 표시 */}
                            {product.attachFiles && product.attachFiles.length > 0 ? (
                                <img
                                    src={`${IMAGE_BASE_URL}/s_${product.attachFiles[0]?.file_name}`}
                                    alt={product.pname}
                                    className="w-full h-[100px] object-cover"
                                />
                            ) : (
                                <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center">
                                    이미지 없음
                                </div>
                            )}
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm text-gray-800 font-medium">{product.pname}</h3>
                            <div className="text-base font-bold text-gray-800">{product.price}원</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainProductListComponent;