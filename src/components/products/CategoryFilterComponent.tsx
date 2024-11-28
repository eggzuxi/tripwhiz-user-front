import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCategories, getSubCategories} from "../../api/categoryAPI.ts";


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
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

    // 상위 카테고리 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
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
        if (selectedCategory === null) {
            setSubCategories([]);
            return;
        }

        const fetchSubCategories = async () => {
            try {
                const data = await getSubCategories(selectedCategory);
                setSubCategories(data);
            } catch (error) {
                console.error(`Error fetching subcategories for category ${selectedCategory}:`, error);
            }
        };

        fetchSubCategories();
    }, [selectedCategory]);

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
        <div className="category-filter">
            <div className="mb-4">
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
                <div className="overflow-x-auto scrollbar-hide py-2">
                    <div className="flex space-x-4">
                        {/* "전체" 버튼 */}
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