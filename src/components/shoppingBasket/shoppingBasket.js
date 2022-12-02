import { useEffect, useState, useMemo, useCallback } from "react";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";

import ShoppingBasketItem from "../shoppingBasketItem/shoppingBasketItem";

const ShoppingBasket = () => {    
    const store = useStore();
    const products = useMemo(() => store.getState().products, [store]);
    const [summary, setSummary] = useState(0);

    store.subscribe(() => {
        countProducts();
    });

    useEffect(() => {
        countProducts();
    }, [])

    const countProducts = useCallback(() => {
        let mem = 0;
        store.getState().products.map((product) => mem += product.count * product.price);
        setSummary(mem);
    }, [store]) 

    const renderSummary = useCallback(() => { 
        return (
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <img src="/img/calc.png" alt="калькулятор" className="basket-summary-img" />
                </div>
                <div className="d-flex justify-content-center">
                    <h3>Суммарно: {summary}₽</h3>
                </div>
                <div className="d-flex justify-content-center">
                    <NavLink to="/order"><button className="basket-summary-confirmed mb-5">Оформить заказ</button></NavLink>    
                </div>           
            </div>

            )
    }, [summary])

    const renderBasketItems = useCallback(() => {
        return products.map(product => {  
            return(
                <div className="row mt-1">
                    <ShoppingBasketItem product={product} />
                </div>     
            )
        })
    }, [products])

    const renderProducts = useCallback(() => {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-7">Наименование</div>
                    <div className="col-2">Количество</div>
                    <div className="col-2">Итого, ₽</div>
                    <div className="col-1"></div>
                </div>
                {renderBasketItems()}
            </div>
        )
    }, [renderBasketItems])

    return (
        products?.length ? 
                <div className="mt-2">
                    <div className="text-center">Корзина</div>
                    <div className="container basket-img">
                        <div style={{"height" : "200px"}}></div>
                        <div className="row basket-place">
                            <div className="col-8">{renderProducts()}</div>
                            <div className="col-4">{renderSummary()}</div>
                        </div>
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