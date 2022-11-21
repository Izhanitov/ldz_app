export default class RestService {
    constructor() {
        this._apiBase = `https://localhost:7241/`;
    }

    getData = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Counld not fetch $(url)`);
        }
        return await res.json();
    }

    sendData = async (url, sendObject) => {
        const res = await fetch(`${this._apiBase}${url}`, {method: "POST",
                                        body: JSON.stringify(sendObject),
                                        headers: {  'Content-type': 'application/json' }});  

        return res.status;
    }
    "ControllerName/ActionName"
    
    getCategories = async () => await this.getData(`Product/GetCategories`);

    getCategory = async (id) => await this.getData(`Product/GetCategory?id=${id}`)

    getCategoryProducts = async (categoryId) => await this.getData(`Product/GetProducts?categoryId=${categoryId}`);          
        
    sendOrder = async (sendObject) => await this.sendData(`Order/AddOrder`, sendObject);
}