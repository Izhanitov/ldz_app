import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Menu extends Component {
    render(){
        return (
            <div className="container menu">
                <div className="row">
                    <div className="col">О КОМПАНИИ</div>
                    <div className="col">
                        <NavLink to="/products">ПРОДУКЦИЯ</NavLink></div>
                    <div className="col">
                        <NavLink to="/factory">ПРОИЗВОДСТВО</NavLink>
                    </div>                
                    <div className="col">ПОГОНАЖНЫЙ ЦЕХ</div>
                    <div className='col'>ДОСТАВКА</div>
                    <div className="col">КОНТАКТЫ</div>                    
                </div>
            </div>
        );
    }
}
