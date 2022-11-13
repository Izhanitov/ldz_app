import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import RestService from "../../services/restService";
import ProductList from "../productList/productList";

const Category = () => {

    const restService = new RestService();

    const { id } = useParams();     

    const src = useMemo(() => "../img/categories/cat" + id + ".png", [id]);

    const [category, setCategory] = useState({data: null});
    const [checkLoad, setCheckLoad] = useState(false);
    
    useEffect(() => {
       restService.getCategory(id)
            .then((cat) => {
            setCheckLoad(true);    
            setCategory({data: cat});
            console.log(category.data);
        });
    }, []);

    if(checkLoad === true) {
        return(
            <div className='container'>
                <div className="row">
                    <div className="col-6">
                        <h3>{category.data.categoryName}</h3>
                        {category.data.categoryDescription}                       
                    </div>
                    <div className="col-6">
                        <div>
                            <img alt={category.data.categoryName} className="cat-image" src={process.env.PUBLIC_URL + src}></img>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ProductList catid={id} catName={category.data.categoryName}/>
                </div>
            </div>
        )
    } else {
        return(
            <>
                Загрузка...
            </>
        )
    }
}

export default Category;