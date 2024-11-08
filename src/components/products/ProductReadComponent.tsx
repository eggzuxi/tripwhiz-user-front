import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IProduct} from "../../types/product.ts";
import {getOne} from "../../api/productAPI.ts";

const initialState:IProduct = {
    cno: 0,
    dno: 0,
    pno: 0,
    cname: '',
    dname: '',
    pname: '',
    pdesc: '',
    price: 0,
    img: '',
    delflag: false
}

function ProductReadComponent() {

    const navigate = useNavigate()

    const {pno} = useParams()

    const moveToCart = () => {
        navigate({
            pathname: `/cart`,
        })
    }

    const [product, setProduct] = useState(initialState)

    useEffect(() => {
        const pnoNum = Number(pno)
        getOne(pnoNum).then(result => {
            setProduct(result)
        })
    },[pno])

    return (
        <div className='w-full h-full flex flex-col space-y-4 w-96 mx-auto'>

            <span>{product.cname}</span>

            <label className="text-sm font-semibold text-gray-700">PNO</label>
            <input
                type="text"
                name="pno"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none transition duration-300 cursor-default"
                value={product.pno}
                readOnly={true}
            />

            <label className="text-sm font-semibold text-gray-700">Product</label>
            <input
                type="text"
                name="product"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none transition duration-300 cursor-default"
                value={product.pname}
                readOnly={true}
            />
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <input
                type="text"
                name="pdesc"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none transition duration-300 cursor-default"
                value={product.pdesc}
                readOnly={true}
            />
            <label className="text-sm font-semibold text-gray-700">Price</label>
            <input
                type="text"
                name="dueDate"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none transition duration-300 cursor-default"
                value={product.price}
                readOnly={true}
            />
            <div className='flex justify-center gap-2'>
                <button type="button"
                        className="bg-amber-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-amber-400 focus:outline-none transition duration-300"
                        onClick={moveToCart}
                >
                    CART
                </button>

            </div>

        </div>
    );
}

export default ProductReadComponent;
