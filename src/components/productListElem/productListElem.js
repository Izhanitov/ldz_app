import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, delProduct } from "../../actions"
import Spinner from "../spinner/spinner";

const ProductListElem = ({price, productid, catid, catname, productname, sizeid, sizename}) => {  

    const dispatch = useDispatch();

    const [countitem, setCount] = useState(0);
    const [firstload, setFirstLoad] = useState(true);

    const itemInStore = useSelector(state => state.products.filter(item => item.id === productid && item.sizeid === sizeid));
    
    useEffect(() => {
        if(firstload === true) {
            if(itemInStore.length > 0) {
                setCount(itemInStore[0].count);
            }
            setFirstLoad(false);
        }
        else {
        
            const obj = {
                id: productid,
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
    }, [countitem]);

    if(firstload === false) {
        if(countitem === 0) {
            return(
                <>
                    <div className="col-6 d-flex justify-content-center align-items-center">{price + " ₽/шт."}</div>
                    <button className="col-6 product-button-add" onClick={() => setCount(1)}>В корзину</button>
                </>
            ) 
        } else {
            return(
                <>
                    <div className="col-6 d-flex justify-content-center align-items-center">{price + " ₽/шт."}</div>
                    <div className="col-6">
                        <div className="text-center">
                            <button className="product-button-added text-center" onClick={() => setCount(0)}>✔</button>
                        </div>
                        <div className="d-flex mt-1 justify-content-center">
                            <button className="product-button-manipulate" onClick={() => setCount(countitem - 1)}>-</button>
                            <input className="product-count-input" onChange={e => setCount(parseInt(e.currentTarget.value))} value={countitem}></input>
                            <button className="product-button-manipulate" onClick={() => setCount(countitem + 1)}>+</button>
                        </div>
                    </div>
                </>
            )
        }
    }
    else {
        
        return <Spinner />
    }
}

export default ProductListElem;