import { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

import RestService from '../../services/restService';

const StorePage = () => {
    const restService = new RestService();

    const [categories, setCategories] = useState({data: null});
    const [checkLoad, setCheckLoad] = useState(false);

    useEffect(() => {
        updateData();
    }, []);

    const updateData = () => {
        restService.getAllTasks()
        .then(categories => {
            setCategories({data: categories})
            setCheckLoad(true);        
        });
    }
    
    const renderItem = (item) => {
        
        const { categoryId, categoryName, lowPrice } = item;

        const src = `./img/categories/cat${categoryId}.png`;

        const url = `/category/${categoryId}`;

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

    if (!checkLoad) {
        return <h1>Загрузка</h1>
    }  else {
        return(
            <div className='container'>
                {categories.data.$values.map((item, index) => 
                    index % 2 === 1 ? null : (
                        <div className='row la'>
                            {
                                renderItem(item)
                            }
                            {
                                index + 1 < categories.data.$values.length ? 
                                renderItem(categories.data.$values[index + 1]) : null
                            }
                        </div> 
                    )                    
                )}            
            </div>
        );
    } 
}

export default StorePage;