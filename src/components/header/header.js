import React from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';

const Header = () => {

    const counter = useSelector(state => state.products.length)

    console.log("!!!!!!!!!!!!!!!!!!!!");
    console.log(counter);
    return (
        <div className="container container-logo">
            <div className="row">
                <div className="col-6 image_container">
                    <div>
                        <NavLink to="/">
                            <img alt="main logo" src="/img/logo.png" className="main_img" />
                        </NavLink>
                    </div>
                    <div className="text_logo">
                        <span className="span_first">Лесосибирский</span>
                        <span className="span_second">деревоперерабатывающий завод</span>
                    </div>
                </div>
                <div className="col-6">
                    <div className="contacts-container">
                            <b>+7 (391) 214-07-01</b>                            
                            <img alt="mail" src="/img/email.svg" className="menu_img" />
                            <img alt="whatsapp" src="/img/whatsapp.svg" className="menu_img2" />
                            <img alt="whatsapp" src="/img/vk.svg" className="menu_img3" />
                    </div>
                    <div className="contacts-container">
                        <NavLink to="/basket">Корзина: { counter } товаров</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;