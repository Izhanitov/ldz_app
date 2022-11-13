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

    getAllTasks = async () => {
        const res = await this.getData(`Product`);
        return res;
    }

    getCategory = async (id) => {
        const res = await this.getData(`category?id=${id}`);
        return res;        
    }

    getCategoryProducts = async (id) => {
        const res = await this.getData(`products?id=${id}`);
        return res;        
    }    
}