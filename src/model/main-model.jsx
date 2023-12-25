import GLOBAL from '../GLOBAL'
import { token } from '../config/access-token'

class MainModel {
    directEndpointFetch = (endpoint, data) => fetch(endpoint, {
        method: data.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        //mode: 'no-cors',
        body: data.body || null,
    }).then((response) => response.json().then((e) => e)).catch((error) => ({ require: false, data: [], error, }))
    directEndpointFetchSmartPoleByGet = async (endpoint, data) => await fetch(endpoint, {
        method: data.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        //mode: 'no-cors',

    }).then((response) => response.json().then((e) => e)).catch((error) => ({ require: false, data: [], error, }))
    authEndpointFetch = async (endpoint, data) => {
        let check_school = ''
        const response = await fetch(endpoint, {
            method: data.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token['x-access-token'],
            },
            body: data.body,
        }).then((response) => response.json().then((e) => e)).catch((error) => ( { require: false, data: [], error, }))

        if (response.unauthorized) {
            console.log('unauthorized', response.error)
            localStorage.clear()
            window.location.reload()
        }

        return response
    }

    authUploadFile = async (endpoint, data) => {
        const response = await fetch(endpoint, {
            method: data.method,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token['x-access-token'],
            },
            body: data.body,
        })
        .then(response => response)
        .then(result => result)
        .catch(error => console.log('error', error));

        if (response.unauthorized) {
            console.log('unauthorized', response.error)
            localStorage.clear()
            window.location.reload()
        }
        return response
    }

    authParamsUploadFile = async (endpoint, data) => {
        const response = await fetch(endpoint, {
            method: data.method,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token['x-access-token'],
            },
            body: data.body,
        })
        .then(response => response)
        .then(result => result)
        .catch(error => console.log('error', error));

        if (response.unauthorized) {
            console.log('unauthorized', response.error)
            localStorage.clear()
            window.location.reload()
        }
        return response
    }

    authDeleteUploadFile = async (endpoint, data) => {
        const response = await fetch(endpoint, {
            method: data.method,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token['x-access-token'],
            },
            body: data.body,
        })
        .then(response => response)
        .then(result => result)
        .catch(error => console.log('error', error));

        if (response.unauthorized) {
            console.log('unauthorized', response.error)
            localStorage.clear()
            window.location.reload()
        }
        return response
    }

}

export class BaseFetch extends MainModel {
    directFetch = (data) => this.directEndpointFetch(`${GLOBAL.BASE_SERVER.URL}${data.url}`, data)
    directFetch_Smart_Pole = (data) => this.directEndpointFetchSmartPoleByGet(`${GLOBAL.SMART_POLE_SEVER.URL}${data.url}`, data)

    authFetch = (data) => this.authEndpointFetch(`${GLOBAL.BASE_SERVER.URL}${data.url}`, data)
    authUpload = (data) => this.authUploadFile(`${GLOBAL.BASE_SERVER.URL}${data.url}`, data)
    authParamsUpload = (data) => this.authParamsUploadFile(`${GLOBAL.BASE_SERVER.URL}${data.url}/${data.body}`,{method: data.method})
    .then((response) => response.blob())
    .then((blob) => {
      // Create a temporary URL for the downloaded file
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = data.body; // Specify the desired filename
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.log("error", error));

    authDeleteUpload = (data) => this.authDeleteUploadFile(`${GLOBAL.BASE_SERVER.URL}${data.url}/${data.body}`,{method: data.method})
    .then((response) => response)
      .then((e) => e)
      .catch((error) => console.log("error", error));

}
