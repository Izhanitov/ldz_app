import React, { useEffect, useState, useMemo } from "react";
import RestService from "../../services/restService";
import { useDispatch } from "react-redux";


import ProductListElem from "../productListElem/productListElem";

const ProductList = ({catid, catName}) => {

    const restService = new RestService();

    const dispatch = useDispatch();

    const [products, setProducts] = useState({data: null});
    const [checkLoad, setCheckLoad] = useState(false);
    //const [sizeList, setSizeList] = useState([]);

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

    
    

    const printProducts = (products) => {
        //const name = product.name + " " + product.description  

        return products.products.$values.map(product => { 
            const pkey = "product" + product.$id;

            const productName = product.name + " " + product.description;
                
            return (
                <div className="row" key={pkey}>
                    <div className="col">{productName}</div>                    
                    { product.sizePrices.$values.map(size => {
                        const sizename = sizeList.find(item => item.sizeid === size.sizeid).desc;  

                        return ( 
                            <div className="col price_tbl_elem">
                                <ProductListElem className="col price_tbl_elem" 
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
    } 

    const printSizes = (sizes) => {
        return sizes.sizes.$values.map(size => {
            return <div className="col price_tbl_elem" key={"size" + size.sizeid}>{size.desc + " мм. "}</div>
        })    
    }

    if(checkLoad === true) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">Наименование</div>
                    {printSizes(products.data)}                    
                </div>
                {printProducts(products.data)}
            </div>
        )
    } else {
        return(
            <>
                Загрузка...
            </>
        )
    }
}

export default ProductList;