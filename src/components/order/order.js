import React, { useMemo, useState } from "react";
import { useStore, useDispatch } from "react-redux";
import { cleanProducts } from "../../actions";


import RestService from "../../services/restService";

const Order = () => {
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [building, setBuilding] = useState("");



    const dispatch = useDispatch();
    
    const store = useStore();
    const products = useMemo(() => store.getState().products, [store]);

    const checkContacts = () => {
        if(name === "") {
            console.log("Укажите имя!");
        }
        if(surname === "") console.log("Укажите фамилию!");
        if(phone === "") console.log("Укажите телефон!");
        if(mail === "") console.log("Укажите меил!");
        if(region === "") console.log("Укажите регион!");
        if(city === "") console.log("Укажите город!");
        if(building === "") console.log("Укажите здание!");
    }

    const cleanStore = () => {
        if(name === "") {
            setName("Укажите имя!");            
        }
        dispatch(cleanProducts());
    }

    const confirmOrder = () => {
        const neworder = {
            contact: "",
            products
        }


    }

    return (
        <div className="container">
            <div className="row">
                <h4>Имя</h4>
                <input onChange={e => setName(e.currentTarget.value)} value={name}></input>
                <h4>Фамилия</h4>
                <input onChange={e => setSurname(e.currentTarget.value)} value={surname}></input>
                <h4>Телефон</h4>
                <input onChange={e => setPhone(e.currentTarget.value)} value={phone}></input>
                <h4>Email</h4>
                <input onChange={e => setMail(e.currentTarget.value)} value={mail}></input>
                <h4>Регион</h4>
                <input onChange={e => setRegion(e.currentTarget.value)} value={region}></input>
                <h4>Город</h4>
                <input onChange={e => setCity(e.currentTarget.value)} value={city}></input>
                <h4>Дом</h4>
                <input onChange={e => setBuilding(e.currentTarget.value)} value={building}></input>

                <button onClick={() => cleanStore()}>Отправить</button>
            </div>
        </div>
    )
}

export default Order;