import React, { useMemo, useState } from "react";
import { useStore, useDispatch } from "react-redux";
import { cleanProducts } from "../../actions";
import useValidateInput from "../useValidateInput/useValidateInput";

import RestService from "../../services/restService";

const Order = () => {  

    const phone = useValidateInput("", "phone");
    const email = useValidateInput("", "email");
    const name = useValidateInput("", "name");
    const surname = useValidateInput("", "surname");
    const region = useValidateInput("", "region");
    const city = useValidateInput("", "city");
    const building = useValidateInput("", "building");

    const dispatch = useDispatch();
    
    const store = useStore();
    const products = useMemo(() => store.getState().products, [store]);

    const checkContacts = () => {
        //return 
    }

    const cleanStore = () => {
        dispatch(cleanProducts());
    }

    const confirmOrder = () => {
        checkContacts() ? console.log("Ошибок нет") : console.log("Ошибки");

        /*const neworder = {
            contact: "",
            products
        }*/
    }  

    const renderInputError = (type) => {
        return type.errorMessage === "" ? null : <span>{type.errorMessage}</span>
    }

    return (
        <div className="container">
            <div className="row">
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

                <button onClick={() => confirmOrder()}>Отправить</button>
            </div>
        </div>
    )
}

export default Order;