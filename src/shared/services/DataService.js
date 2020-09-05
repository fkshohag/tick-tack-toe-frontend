import axios from "axios";
import { environment } from "../../environment/envrionment";

class DataService {

      base_url =  environment.base_url

      constructor(url) {
            this.base_url = this.base_url + '/' + url;
      }

      getAll() {
            return axios.get(this.base_url);
      }
      
      getById(id) {
            return axios.get(`${this.base_url}/${id}`);
      }

      create(resouce) {
            return axios.post(this.base_url, resouce);
      }
      
      update(id, resource) {
            return axios.put(`${this.base_url}/${id}`, resource, this.config);
      }

      delete(id) {
            return axios.get(this.base_url);
      }
}

export default DataService