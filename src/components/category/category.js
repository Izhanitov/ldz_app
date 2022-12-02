import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import RestService from "../../services/restService";
import ProductList from "../productList/productList";
import Spinner from "../spinner/spinner";

const Category = () => {
  const restService = useMemo(() => new RestService(), [])

  const { id } = useParams();

  const src = useMemo(() => `../img/categories/cat${id}.png`, [id]);

  const [category, setCategory] = useState({ data: null });
  const [checkLoad, setCheckLoad] = useState(false);

  useEffect(() => {
    restService.getCategory(id).then((cat) => {
      setCheckLoad(true);
      setCategory({ data: cat });
    });
  }, []);

  if (checkLoad === true) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3 className="text-center ms-5">{category.data.categoryName}</h3>
            <div className="ms-5">{category.data.categoryDescription}</div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div>
              <img
                alt={category.data.categoryName}
                className="cat-image"
                src={process.env.PUBLIC_URL + src}
              ></img>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">Размеры и цены</div>
        <div className="row">
          <ProductList catid={id} catName={category.data.categoryName} />
        </div>
      </div>
    );
  } else {
    return <Spinner />
  }
};

export default Category;
