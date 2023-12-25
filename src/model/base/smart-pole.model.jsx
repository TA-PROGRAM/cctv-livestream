import { BaseFetch } from "../main-model"
export default class SmartPoleModel extends BaseFetch {
    getDeviceBy = (data) =>
    this.directFetch_Smart_Pole({
      url: "device",
      method: "GET",
      body: JSON.stringify(data),
    })
    getDeviceById = (data) =>
    this.directFetch_Smart_Pole({
      url: "device"+`/${data.id}`,
      method: "GET",
      body: JSON.stringify(data),
    })
    getHistoryById = (data) =>
    this.directFetch_Smart_Pole({
      url: "history"+`/${data.id}`,
      method: "GET",
      body: JSON.stringify(data),
    })

    getHistoryByLenght = (data) =>
    this.directFetch_Smart_Pole({
      url: "history"+`/${data.id}`+`/${data.length}`,
      method: "GET",
      body: JSON.stringify(data),
    })
    
}
