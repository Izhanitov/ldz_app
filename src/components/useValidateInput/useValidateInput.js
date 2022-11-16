import { useEffect, useState } from 'react';

//fieldType can take the following values: name, surname, subname, email, phone, city, region, building

const useValidateInput = (initialValue, fieldType) => {
    const [value, setValue] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkInput, setCheckInput] = useState(false);
    const type = fieldType;
    let test;
    

    const onChange = event => {
        setValue(event.target.value);
    }

    useEffect(() => {  
        let errorMessageLocal;
        
        if(value === "") {
            setErrorMessage("");
            setCheckInput(false);
        } else {
            switch(type) {
                case 'email':
                    errorMessageLocal = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(value) 
                        ? "" : "E-Mail должен быть в формате имя@домен.доменнаязона, например example@example.ru и не может содержать спецсимволы."
                    //test = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(value);
                    //test ? setErrorMessage("") : setErrorMessage("E-Mail должен быть в формате имя@домен.доменнаязона, например example@example.ru и не может содержать спецсимволы.");
                    break;
                case 'name':
                case 'surname':
                case 'subname':
                    errorMessageLocal = /^[А-Яа-яЁё]+$/.test(value) 
                    ? "" : "Поле может содержать только буквы без цифр, пробелов и спецсимволов."
                    //test = /^[А-Яа-яЁё]+$/.test(value);
                    //test ? setErrorMessage("") : setErrorMessage("Поле может содержать только буквы без цифр, пробелов и спецсимволов.");
                    break;
                case 'phone':
                    errorMessageLocal = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) 
                    ? "" : "Телефон введен некорректно."
                    //test = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
                    //test ? setErrorMessage("") : setErrorMessage("Телефон введен некорректно.");               
                    break; 
                case 'city':
                case 'region':
                    errorMessageLocal = /^[А-Яа-яЁё\s\-]+$/.test(value) 
                    ? "" : "Поле может содержать буквы, пробелы и символ тире. И не может содержать цифры и спецсимволы."
                    //test = /^[А-Яа-яЁё\s\-]+$/.test(value);
                    //test ? setErrorMessage("") : setErrorMessage("Поле может содержать буквы, пробелы и символ тире. И не может содержать цифры и спецсимволы."); 
                    break;
                case 'building':
                    errorMessageLocal = /^[А-Яа-яЁё0-9\s\-\/]+$/.test(value)
                    ? "" : "Поле может содержать буквы, цифры, пробелы, тире и косую черту."
                    //test = /^[А-Яа-яЁё0-9\s\-\/]+$/.test(value); 
                    //test ? setErrorMessage("") : setErrorMessage("Поле может содержать буквы, цифры, пробелы, тире и косую черту."); 
                    break;       
                default: 
                break;
            }

            setErrorMessage(errorMessageLocal);
            setCheckInput(!errorMessageLocal);
        }  

    }, [value]);

    return {value, onChange, errorMessage, checkInput}
}

export default useValidateInput;