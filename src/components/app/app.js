import { Component } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Header from '../header/header.js';
import Menu from '../menu/menu';
import Mainsection from '../mainsection/mainsection';
import Factory from '../factory/factory';
import StorePage from '../storePage/storePage.js';
import Category from '../category/category.js';
import ShoppingBasket from '../shoppingBasket/shoppingBasket.js';
import Order from '../order/order.js';

import '../styles/bootstrap-grid.min.css'; 
import '../styles/styles.css';


export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="mainclass">
                    <Header />
                    <Menu />
                    <main>
                        <Routes>
                            <Route path="/factory" element={<Factory/>} />
                            <Route path="/" element={<Mainsection/>} />
                            <Route path="/products" element={<StorePage/>} />
                            <Route path="/category/:id" element={<Category/>} />
                            <Route path="/basket" element={<ShoppingBasket/>} />
                            <Route path="/order" element={<Order/>} />
                        </Routes>  
                    </main>         
                </div>
            </Router>
        );
    }
}

