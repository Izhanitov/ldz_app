import { useEffect, useState } from 'react';

//fieldType can take the following values: name, surname, subname, email, phone, city, region, building

const useValidateInput = (initialValue, fieldType) => {
    const [value, setValue] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState("");
    const type = fieldType;
    let test;

    const onChange = event => {
        setValue(event.target.value);
    }

    useEffect(() => {        
        if(value === "") {
            setErrorMessage("");
        } else {
            switch(type) {
                case 'email':
                    test = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(value);
                    test ? setErrorMessage("") : setErrorMessage("E-Mail должен быть в формате имя@домен.доменнаязона, например example@example.ru и не может содержать спецсимволы.");
                    break
                case 'name':
                case 'surname':
                case 'subname':
                    test = /^[А-Яа-яЁё]+$/.test(value);
                    test ? setErrorMessage("") : setErrorMessage("Поле может содержать только буквы без цифр, пробелов и спецсимволов.");
                    break
                case 'phone':
                    test = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
                    test ? setErrorMessage("") : setErrorMessage("Телефон введен некорректно.");               
                    break 
                case 'city':
                case 'region':
                    test = /^[А-Яа-яЁё\s\-]+$/.test(value);
                    test ? setErrorMessage("") : setErrorMessage("Поле может содержать буквы, пробелы и символ тире. И не может содержать цифры и спецсимволы."); 
                    break
                case 'building':
                    test = /^[А-Яа-яЁё0-9\s\-\/]+$/.test(value); 
                    test ? setErrorMessage("") : setErrorMessage("Поле может содержать буквы, цифры, пробелы, тире и косую черту."); 
                    break        
                default: 
                break
            }
        }   
    }, [value]);

    return {value, onChange, errorMessage}
}

export default useValidateInput;