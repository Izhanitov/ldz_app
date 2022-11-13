import React, { useEffect, useState, useMemo } from "react";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
//import { getProducts } from "../../actions";
import ShoppingBasketItem from "../shoppingBasketItem/shoppingBasketItem";

const ShoppingBasket = () => {    
    const store = useStore();
    const products = useMemo(() => store.getState().products, [store]);
    const [summary, setSummary] = useState(0);
    //const [firstload, setFirstLoad] = useState(true);

    //store.subscribe(() => console.log(products));
    store.subscribe(() => {
        /*let mem = 0;
        store.getState().products.map((product) => mem += product.count * product.price);
        setSummary(mem);*/
        CountProducts();
    });

    useEffect(() => {
        CountProducts();
    }, [])

    const CountProducts = () => {
        let mem = 0;
        store.getState().products.map((product) => mem += product.count * product.price);
        setSummary(mem);
    }
    /*const collectStore = () => {
        setSummary(0);
        products.map((product) => setSummary(summary + product.count * product.price));
    }*/

    /*useEffect(() => {
        console.log("USESOSAT");
        state.products.map(product => setSummary(summary + product.count * product.price));
    }, [mem])*/

    //const products = useMemo(() => state.products, []); 
    
    /*const summary = useMemo(() => {
        console.log("КАБЛЯ!");
        let count = 0;
        products.map(product => count += product.count * product.price);
        return count;
    }, [mem])*/

    const RenderSummary = () => {        
        //collectStore();
        return (
            <>
                <div>
                    <h3>Суммарно: {summary}₽</h3>
                </div>
                <div>
                    <NavLink to="/order"><button>Оформить заказ</button></NavLink>    
                </div>           
            </>

            )
    }

    const RenderProducts = () => {
        return products.map(product => {            
            console.log("ААААААТЬ");
            return(
                <div>
                    <ShoppingBasketItem product={product} />
                </div>     
            )
        })
    }

    return (
        products?.length ? 
            
                <div className="container">
                    <div className="row">
                        <div className="col-8">{RenderProducts()}</div>
                        <div className="col-4">{RenderSummary()}</div>
                    </div>
                </div>            
         :
            
            <>
                    <div>В корзине пусто</div>
                    <div>Перейдите в каталог</div>               

                    <NavLink to="/products"><button>Перейти в каталог</button></NavLink>
                </>           
    )
}



export default ShoppingBasket;