import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCategories, getSubCategories} from "../../api/categoryAPI.ts";

//SY 작품
interface Category {
    cno: number;
    cname: string;
}

interface SubCategory {
    scno: number;
    sname: string;
    cno: number;
}


function CategoryFilterComponent({ onFilterChange }: { onFilterChange: (cno: number | null, scno: number | null) => void }) {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubCategories] = useState<SubCategory[]>([]);

    // 쿼리스트링에서 'cno' 값을 읽어서 숫자로 변환하거나 값이 없으면 null
    const initialCno = searchParams.get("cno") ? parseInt(searchParams.get("cno")!, 10) : null;
    // 쿼리스트링에서 'scno' 값을 읽어서 숫자로 변환하거나 값이 없으면 null
    const initialScno = searchParams.get("scno") ? parseInt(searchParams.get("scno")!, 10) : null;

    const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCno);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(initialScno);

    // 상위 카테고리 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // API 호출을 통해 상위 카테고리를 가져온 뒤 상태에 저장
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // 하위 카테고리 가져오기
    useEffect(() => {
        // 상위 카테고리가 선택되지 않은 경우 하위 카테고리 상태를 초기화
        if (selectedCategory === null) {
            setSubCategories([]);
            return;
        }

        const fetchSubCategories = async () => {
            try {
                // API 호출을 통해 선택된 상위 카테고리에 속하는 하위 카테고리를 가져옴
                const data = await getSubCategories(selectedCategory);
                setSubCategories(data);
            } catch (error) {
                console.error(`Error fetching subcategories for category ${selectedCategory}:`, error);
            }
        };

        fetchSubCategories();
    }, [selectedCategory]);

    // URL에서 값 동기화
    useEffect(() => {
        if (initialCno) {
            setSelectedCategory(initialCno); // URL의 'cno' 값을 상태에 반영
            if (initialScno) {
                setSelectedSubCategory(initialScno); // URL의 'scno' 값을 상태에 반영
            }
        }
    }, [initialCno, initialScno]); // initialCno 또는 initialScno가 변경될 때 실행

    // 카테고리 선택 처리
    const handleCategoryChange = (cno: number | null) => {
        setSelectedCategory(cno);
        setSelectedSubCategory(null); // 하위 카테고리 초기화
        onFilterChange(cno, null); // 필터 변경 전달
        const params = new URLSearchParams(searchParams.toString());
        if (cno !== null) {
            params.set("cno", cno.toString());
        } else {
            params.delete("cno"); // "전체"를 선택한 경우 필터 제거
        }
        params.delete("scno"); // 하위 카테고리 삭제
        navigate(`/product/list?${params.toString()}`);
    };

    // 하위 카테고리 선택 처리
    const handleSubCategoryChange = (scno: number | null) => {
        setSelectedSubCategory(scno);
        onFilterChange(selectedCategory, scno); // 필터 변경 전달
        const params = new URLSearchParams(searchParams.toString());
        if (scno !== null) {
            params.set("scno", scno.toString());
        } else {
            params.delete("scno"); // "전체"를 선택한 경우 필터 제거
        }
        navigate(`/product/list?${params.toString()}`);
    };

    // 하위 카테고리 필터링
    const filteredSubCategories = selectedCategory
        ? subcategories.filter((sub) => sub.cno === selectedCategory)
        : [];

    return (
        <div className={`category-filter ${selectedCategory === null ? "pb-4" : ""}`}>
            <div>
                {/* 상위 카테고리 */}
                <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide w-full">
                    <button
                        onClick={() => handleCategoryChange(null)}
                        className={`px-4 py-2 whitespace-nowrap rounded-lg ${
                            selectedCategory === null ? "bg-yellow-400 text-white" : "bg-gray-200"
                        }`}
                    >
                        전체
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.cno}
                            onClick={() => handleCategoryChange(category.cno)}
                            className={`px-4 py-2 whitespace-nowrap rounded-lg ${
                                selectedCategory === category.cno ? "bg-yellow-400 text-white" : "bg-gray-200"
                            }`}
                        >
                            {category.cname}
                        </button>
                    ))}
                </div>
            </div>

            {/* 하위 카테고리 */}
            {filteredSubCategories.length > 0 && (
                <div className="overflow-x-auto scrollbar-hide py-2 pb-4">
                    <div className="flex space-x-4 pl-2">
                        <button
                            onClick={() => handleSubCategoryChange(null)}
                            className={`text-lg whitespace-nowrap ${
                                selectedSubCategory === null ? "font-bold text-black" : "text-gray-500"
                            }`}
                        >
                            전체
                        </button>

                        {filteredSubCategories.map((subcategory) => (
                            <button
                                key={subcategory.scno}
                                onClick={() => handleSubCategoryChange(subcategory.scno)}
                                className={`text-lg whitespace-nowrap ${
                                    selectedSubCategory === subcategory.scno
                                        ? "font-bold text-black"
                                        : "text-gray-500"
                                }`}
                            >
                                {subcategory.sname}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryFilterComponent;