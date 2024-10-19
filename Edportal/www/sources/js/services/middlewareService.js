import apiService from "./apiService";

export default class middlewareService extends apiService {
    
    constructor(data = {}) {
        document.getElementById('RootUrl').value
        const options = Object.assign(data, {
           baseURL: document.getElementById('RootUrl').value,
        })
        super(options)
    }
}