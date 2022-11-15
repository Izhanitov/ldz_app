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
    }, [countitem])

    if(countitem === 0) {
        return <></>
    } else {
        return(
            <>
                <div>{catname + "." + productname + "    Цена: " + price + " ₽/шт. Количество: " + countitem + " шт. Всего: " + price*countitem + " ₽" }</div>
                <button onClick={() => setCount(0)}>Удалить</button>
                <button onClick={() => setCount(countitem - 1)}>-</button>
                <input onChange={e => setCount(parseInt(e.currentTarget.value))} value={countitem}></input>
                <button onClick={() => setCount(countitem + 1)}>+</button>
            </>
        )
    }
}

export default ShoppingBasketItem; 