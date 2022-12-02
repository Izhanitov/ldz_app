import { useEffect, useState, useMemo, useCallback } from "react";
import RestService from "../../services/restService";


import ProductListElem from "../productListElem/productListElem";
import Spinner from "../spinner/spinner";

const ProductList = ({catid, catName}) => {

    const restService = useMemo(() => new RestService(), [])

    const [products, setProducts] = useState({data: null});
    const [checkLoad, setCheckLoad] = useState(false);

    const sizeList = useMemo(() => {
        return products?.data?.sizes?.$values?.map(size => {
            return {sizeid: size.sizeid, desc: size.desc};            
        })    
    }, [products?.data?.sizes?.$values]);

    useEffect(() => {
        restService.getCategoryProducts(catid)
             .then((cat) => {
             setCheckLoad(true);    
             setProducts({data: cat});
         });
     }, []);    
    

    const printProducts = useCallback((products) => { 

        return products.products.$values.map(product => { 
            const pkey = "product" + product.$id;

            const productName = product.name + " " + product.description;
                
            return (
                <div className="row product-row justify-content-around mt-2" key={pkey}>
                    <div className="col-4">{productName}</div>                    
                    { product.sizePrices.$values.map(size => {
                        const sizename = sizeList.find(item => item.sizeid === size.sizeid).desc;  

                        return ( 
                            <div className="col-2 d-flex">
                                <ProductListElem 
                                                    price={size.price} 
                                                    productid={product.productid} 
                                                    catid={catid}
                                                    catname={catName}
                                                    productname={productName}
                                                    sizeid={size.sizeid}
                                                    sizename={sizename}
                                                    />
                            </div> 
                        )
                    }) }
                </div>
                )
        })
    }, [catName, catid, sizeList]) 

    const printSizes = useCallback((sizes) => {
        return sizes.sizes.$values.map(size => {
            return <div className="col-2 text-center" key={"size" + size.sizeid}>{size.desc + " мм. "}</div>
        })    
    }, [])

    if(checkLoad === true) {
        return(
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-4 text-center">Наименование</div>
                    {printSizes(products.data)}                    
                </div>
                {printProducts(products.data)}
            </div>
        )
    } else {
        return(
            <Spinner />
        )
    }
}

export default ProductList;