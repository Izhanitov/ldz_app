import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addProduct, delProduct } from "../../actions"

const ShoppingBasketItem = ({product}) => {
    const {price, id, catid, catname, productname, sizeid, sizename, count } = product

    const [countitem, setCount] = useState(count);
    const [firstload, setFirstLoad] = useState(true);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!firstload) {
            const obj = {
                id,
                productname, 
                count: countitem, 
                catid,
                catname,
                sizeid,
                sizename,
                price
            }
    
            if(countitem === 0) {
                dispatch(delProduct(obj))
            } else {             
                dispatch(addProduct(obj))
            }
        }
        setFirstLoad(false);
    }, [countitem, product])

    if(countitem === 0) {
        return <></>
    } else {
        return(
            <>
                <div className="col-7 d-flex">
                    <div className="align-self-center">{`${catname}. ${productname}. ${price} ₽/шт.`}</div>
                </div>
                <div className="col-2 text-center">
                    <button className="product-button-manipulate" onClick={() => setCount(countitem - 1)}>-</button>
                    <input className="product-count-input" onChange={e => setCount(parseInt(e.currentTarget.value))} value={countitem}></input>
                    <button className="product-button-manipulate" onClick={() => setCount(countitem + 1)}>+</button>
                </div> 
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <div className="">{price*countitem}</div>
                </div> 
                <div className="col-1 text-center">
                    <button className="product-button-delete" onClick={() => setCount(0)}>x</button>
                </div>              
            </>
        )
    }
}

export default ShoppingBasketItem; 