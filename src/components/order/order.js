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
    const surname = useValidateInput("", "surname");
    const region = useValidateInput("", "region");
    const city = useValidateInput("", "city");
    const building = useValidateInput("", "building");

    const allFields = useMemo(() => [phone, email, name, surname, region, city, building], [phone, email, name, surname, region, city, building]);

    const dispatch = useDispatch();
    const restService = new RestService();

    const store = useStore();
    const products = useMemo(() => store.getState().products, [store]);    

    const checkContacts = useCallback(() => {
        const check = allFields.every(field => field.checkInput)
        setCheckValidInputs(check);
        setBeforeConfirm(false);
        return check;
    }, [allFields]);

    const cleanStore = () => {
        dispatch(cleanProducts());
    }

    const sendData = () => {
        const bundle = {
            name: name.value,
            surname: surname.value,
            region: region.value, 
            city: city.value, 
            building: building.value, 
            phone: phone.value, 
            email: email.value, 
            products
        }
        
        restService.sendOrder(bundle)
                    .then(res => res === 200 ? cleanStore() : null)
                    .error(err => console.log(err));
    }

    const confirmOrder = () => {
        if(checkContacts())
            sendData(); 
    };

    const renderInputError = (type) => {
        return type.errorMessage === "" ? null : <span>{type.errorMessage}</span>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <h4>Имя</h4>
                    <input onChange={name.onChange} value={name.value} style={{borderColor: name.errorMessage ? "Red" : "initial"}}></input>
                    {renderInputError(name)}
                    <h4>Фамилия</h4>
                    <input onChange={surname.onChange} value={surname.value}></input>
                    {renderInputError(surname)}
                    <h4>Телефон</h4>
                    <input onChange={phone.onChange} value={phone.value}></input>
                    {renderInputError(phone)}
                    <h4>Email</h4>
                    <input onChange={email.onChange} value={email.value}></input>
                    {renderInputError(email)}
                    <h4>Регион</h4>
                    <input onChange={region.onChange} value={region.value}></input>
                    {renderInputError(region)}
                    <h4>Город</h4>
                    <input onChange={city.onChange} value={city.value}></input>
                    {renderInputError(city)}
                    <h4>Дом</h4>
                    <input onChange={building.onChange} value={building.value}></input>
                    {renderInputError(building)}                    
                </div>
            </div>
            <div>                
                <button onClick={() => confirmOrder()}>Отправить</button>
                {checkValidInputs || beforeConfirm ? null : <span>Все поля должны быть заполнены!</span>} 
            </div>
        </div>
    )
}

export default Order;