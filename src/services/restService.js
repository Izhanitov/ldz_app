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
    
    getAllTasks = async () => await this.getData(`Product`);

    getCategory = async (id) => await this.getData(`category?id=${id}`)

    getCategoryProducts = async (id) => await this.getData(`products?id=${id}`);          
        
    sendOrder = async (sendObject) => await this.sendData(`SendOrder`, sendObject);
}