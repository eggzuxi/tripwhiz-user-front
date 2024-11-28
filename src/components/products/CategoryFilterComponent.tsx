import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";

function CategoryFilterComponent({ onFilterChange }: { onFilterChange: (cno: number | null, scno: number | null) => void }) {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const categories = [
        { cno: 1, cname: "수납/편의" },
        { cno: 2, cname: "의류" },
        { cno: 3, cname: "안전/위생" },
        { cno: 4, cname: "악세사리" },
        { cno: 5, cname: "액티비티 용품" },
    ];

    const subcategories = [
        { scno: 1, sname: "파우치", cno: 1 },
        { scno: 2, sname: "케이스/커버", cno: 1 },
        { scno: 3, sname: "안대/목베개", cno: 1 },
        { scno: 4, sname: "와이파이 유심", cno: 1 },
        { scno: 5, sname: "아우터", cno: 2 },
        { scno: 6, sname: "상의/하의", cno: 2 },
        { scno: 7, sname: "잡화", cno: 2 },
        { scno: 8, sname: "뷰티케어", cno: 3 },
        { scno: 9, sname: "세면도구", cno: 3 },
        { scno: 10, sname: "상비약", cno: 3 },
        { scno: 11, sname: "전기/전자용품", cno: 4 },
        { scno: 12, sname: "여행 아이템", cno: 4 },
        { scno: 13, sname: "캠핑/등산", cno: 5 },
        { scno: 14, sname: "수영", cno: 5 },
        { scno: 15, sname: "야외/트래킹", cno: 5 },
    ];

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

    // 카테고리 선택 처리
    const handleCategoryChange = (cno: number) => {
        setSelectedCategory(cno);
        setSelectedSubCategory(null); // 하위 카테고리 초기화
        onFilterChange(cno, null); // 필터 변경 전달
        const params = new URLSearchParams(searchParams.toString());
        params.set("cno", cno.toString());
        params.delete("scno"); // 하위 카테고리 삭제
        navigate(`/product/list?${params.toString()}`);
    };

    // 하위 카테고리 선택 처리
    const handleSubCategoryChange = (scno: number) => {
        setSelectedSubCategory(scno);
        onFilterChange(selectedCategory, scno); // 필터 변경 전달
        const params = new URLSearchParams(searchParams.toString());
        params.set("scno", scno.toString());
        navigate(`/product/list?${params.toString()}`);
    };

    // 하위 카테고리 필터링
    const filteredSubCategories = selectedCategory
        ? subcategories.filter((sub) => sub.cno === selectedCategory)
        : [];

    return (
        <div className="category-filter">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">카테고리</label>
                <select
                    value={selectedCategory || ""}
                    onChange={(e) => handleCategoryChange(Number(e.target.value))}
                    className="border rounded px-4 py-2 w-full"
                >
                    <option value="">전체</option>
                    {categories.map((category) => (
                        <option key={category.cno} value={category.cno}>
                            {category.cname}
                        </option>
                    ))}
                </select>
            </div>
            {filteredSubCategories.length > 0 && (
                <div>
                    <label className="block text-gray-700 font-bold mb-2">하위 카테고리</label>
                    <select
                        value={selectedSubCategory || ""}
                        onChange={(e) => handleSubCategoryChange(Number(e.target.value))}
                        className="border rounded px-4 py-2 w-full"
                    >
                        <option value="">전체</option>
                        {filteredSubCategories.map((subcategory) => (
                            <option key={subcategory.scno} value={subcategory.scno}>
                                {subcategory.sname}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default CategoryFilterComponent;