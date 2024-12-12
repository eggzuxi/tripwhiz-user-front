import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductReadDTO } from '../../types/product';
import { fetchProductById } from '../../api/productAPI';

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
