import { useEffect, useState } from 'react';
import { IProduct } from "../../types/product";
import { getList } from "../../api/productAPI";

const ProductListComponent = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const size = 10;

    useEffect(() => {
        getList(page, size)
            .then(data => {
                setProducts(data.dtoList || []);
                setTotalCount(data.totalCount || 0);
            })
            .catch(error => {
                console.error('상품 데이터를 가져오는 데 실패했습니다:', error);
                setProducts([]);
            });
    }, [page]);

    const totalPages = Math.ceil(totalCount / size);

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">상품 목록</h2>
            <div className="grid grid-cols-1 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.pno} className="border p-4 rounded shadow">
                            {product.img && (
                                <img
                                    src={`/images/${product.img}`}
                                    alt={product.pname}
                                    className="w-full h-32 object-cover mb-2"
                                />
                            )}
                            <h3 className="text-lg font-semibold">{product.pname}</h3>
                            <p className="text-gray-700">{product.pdesc}</p>
                            <p className="text-gray-700">가격: {product.price}원</p>
                            <p className="text-sm text-gray-500">카테고리: {product.cname}</p>
                            <p className="text-sm text-gray-500">부서: {product.dname}</p>
                        </div>
                    ))
                ) : (
                    <p>상품이 없습니다.</p>
                )}
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    이전
                </button>
                <span>페이지 {page} / {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default ProductListComponent;
