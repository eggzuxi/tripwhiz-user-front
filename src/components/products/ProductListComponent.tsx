import {getList} from "../../api/cartAPI.ts";


const fetchProducts = async () => {
    try {
        const filter = { page: 1, cno: 2 };
        const products = await getList(filter);
        console.log("Product list:", products);
    } catch (error) {
        console.error("Error fetching product list:", error);
    }
};

fetchProducts();
