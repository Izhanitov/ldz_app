import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, delProduct } from "../../actions"

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
                    <div>{price + " ₽/шт."}</div>
                    <button onClick={() => setCount(1)}>В корзину</button>
                </>
            ) 
        } else {
            return(
                <>
                    <div>{price + " ₽/шт."}</div>
                    <div>
                        <button onClick={() => setCount(0)}>✔ В корзине</button>
                        <button onClick={() => setCount(countitem - 1)}>-</button>
                        <input onChange={e => setCount(parseInt(e.currentTarget.value))} value={countitem}></input>
                        <button onClick={() => setCount(countitem + 1)}>+</button>
                    </div>
                </>
            )
        }
    }
    else {
        
        return <>Загрука...</>
    }
}

export default ProductListElem;