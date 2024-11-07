import {useParams} from "react-router-dom";
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

    const {pno} = useParams()

    const [product, setProduct] = useState(initialState)

    useEffect(() => {
        const pnoNum = Number(pno)
        getOne(pnoNum).then(result => {
            setProduct(result)
        })
    },[pno])

    return (
        <div className='w-full h-full flex flex-col space-y-4 w-96 mx-auto'>

            <label className="text-sm font-semibold text-gray-700">PNO</label>
            <input
                type="text"
                name="pno"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300"
                value={product.pno}
                readOnly={true}
            />

            <label className="text-sm font-semibold text-gray-700">Product</label>
            <input
                type="text"
                name="product"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300"
                value={product.pname}
                readOnly={true}
            />
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <input
                type="text"
                name="pdesc"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300"
                value={product.pdesc}
                readOnly={true}
            />
            <label className="text-sm font-semibold text-gray-700">Price</label>
            <input
                type="text"
                name="dueDate"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300"
                value={product.price}
                readOnly={true}
            />

        </div>
    );
}

export default ProductReadComponent;
