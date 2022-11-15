import { Component } from 'react';
import {NavLink} from 'react-router-dom';

import RestService from '../../services/restService';

export default class StorePage extends Component {
    restService = new RestService();
    state = {
        categories: null
    }

    componentDidMount() {
        this.updateData();
    }

    onCategoriesLoaded = (categories) => {               
        this.setState({categories}); 
    }

    updateData = () => {
        this.restService.getAllTasks()
            .then(this.onCategoriesLoaded);
    }
    
    renderItem = (item) => {
        
            const { categoryId, categoryName, lowPrice } = item;

            const src = "./img/categories/cat" + categoryId + ".png";

            const url = "/category/" + categoryId;

            return (
                    <div key={categoryId} className='col product row'>
                        <div className='col-6 product-image'>
                            <img alt={categoryName} className='image-p' src={src}></img>
                        </div>
                        <div className='col-6 product-name'> 
                            <h3>{categoryName}</h3>
                        </div>
                        <div className='row prod-info-block'>
                            <div className='col-6 prod-info'>
                                цена от {lowPrice} руб
                            </div>
                            <div className='col-6 prod-info'>
                                <NavLink className='info-link' to={url}>ПОДРОБНЕЕ</NavLink>
                            </div> 
                        </div>                      
                    </div>
            )     
            
            
    }
   

    render() {

        const { categories } = this.state;

        if (!categories) {
            return <h1>Загрузка</h1>
        }     

        return(
            <div className='container'>
                {categories.$values.map((item, index) => 
                    index % 2 === 1 ? null : (
                        <div className='row la'>
                           {
                                this.renderItem(item)
                           }
                           {
                                index + 1 < categories.$values.length ? 
                                this.renderItem(categories.$values[index + 1]) : null
                            }
                        </div> 
                    )                    
                )}            
            </div>
        );
    }
}