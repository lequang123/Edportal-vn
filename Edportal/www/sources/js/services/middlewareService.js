import apiService from "./apiService";

export default class middlewareService extends apiService {
    
    constructor(data = {}) {
        const options = Object.assign(data, {
           baseURL: document.getElementById('RootUrl')?.value || '/',
        })
        super(options)
    }
}