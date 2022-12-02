import { useMemo, useState, useCallback } from "react";
import { useStore, useDispatch } from "react-redux";
import { cleanProducts } from "../../actions";
import useValidateInput from "../useValidateInput/useValidateInput";

import RestService from "../../services/restService";

const Order = () => {
  const [checkValidInputs, setCheckValidInputs] = useState(false);
  const [beforeConfirm, setBeforeConfirm] = useState(true);

  const phone = useValidateInput("", "phone");
  const email = useValidateInput("", "email");
  const name = useValidateInput("", "name");
  const secondname = useValidateInput("", "name");
  const surname = useValidateInput("", "surname");
  const region = useValidateInput("", "region");
  const city = useValidateInput("", "city");
  const building = useValidateInput("", "building");

  const allFields = useMemo(
    () => [phone, email, name, surname, region, city, building],
    [phone, email, name, surname, region, city, building]
  );

  const dispatch = useDispatch();
  const restService = useMemo(() => new RestService(), [])

  const store = useStore();
  const products = useMemo(() => store.getState().products, [store]);

  const checkContacts = useCallback(() => {
    const check = allFields.every((field) => field.checkInput);
    setCheckValidInputs(check);
    setBeforeConfirm(false);
    return check;
  }, [allFields]);

  const cleanStore = useCallback(() => {
    dispatch(cleanProducts());
  }, [dispatch])

  const sendData = useCallback(() => {
    const bundle = {
      name: name.value,
      surname: surname.value,
      region: region.value,
      city: city.value,
      building: building.value,
      phone: phone.value,
      email: email.value,
      products,
    };

    restService
      .sendOrder(bundle)
      .then((res) => (res === 200 ? cleanStore() : null))
      .error((err) => console.log(err));
  }, [cleanStore, products, name.value, surname.value, region.value, city.value, building.value, phone.value, email.value, restService])

  const confirmOrder = useCallback(() => {
    if (checkContacts()) sendData();
  }, [checkContacts, sendData])

  const renderInputError = useCallback((type) => {
    return type.errorMessage === "" ? null : <span className="text-danger">{type.errorMessage}</span>;
  }, [])

  return (
    <div className="container mt-5">
      <div className="row mb-2">
        <div className="text-center">Контактные данные</div>
      </div>      
      <div className="row">
        <div className="col-7">
          <div>Имя</div>
          <input className="form-control"
            onChange={name.onChange}
            value={name.value}
            style={{ borderColor: name.errorMessage ? "Red" : "initial" }}
          ></input>
          {renderInputError(name)}
          <div>Фамилия</div>
          <input className="form-control" onChange={surname.onChange} value={surname.value}></input>
          {renderInputError(surname)}
          <div>Телефон</div>
          <input className="form-control" onChange={phone.onChange} value={phone.value}></input>
          {renderInputError(phone)}
          <div>Email</div>
          <input className="form-control" onChange={email.onChange} value={email.value}></input>
          {renderInputError(email)}
          <div>Регион</div>
          <input className="form-control" onChange={region.onChange} value={region.value}></input>
          {renderInputError(region)}
          <div>Город</div>
          <input className="form-control" onChange={city.onChange} value={city.value}></input>
          {renderInputError(city)}
          <div>Дом</div>
          <input className="form-control" onChange={building.onChange} value={building.value}></input>
          {renderInputError(building)}
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-center mt-4">
            <img src="/img/end.png" alt="погрузчик" className="order-img"/>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="basket-summary-confirmed" onClick={() => confirmOrder()}>Отправить</button>
          </div>
          {checkValidInputs || beforeConfirm ? null : (
            <span className="text-danger text-center">Все поля должны быть заполнены!</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default Order;
