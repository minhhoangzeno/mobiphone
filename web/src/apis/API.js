import axios from 'axios';


export const SERVER = {
    BASE_URL: "http://localhost:3000",//CHANGE HERE
    // token: JSON.parse(localStorage.getItem("token")),
    URL_IMAGE: "http://localhost:3000/image/"
}

export const publicGetApi = async (url) => {
    let resp = await axios({
        method: 'GET',
        url: `${SERVER.BASE_URL}${url}`
    })
    return resp.data;
}

export const privateGetApi = async (url) => {
    let resp = await axios({
        method: 'GET',
        url: `${SERVER.BASE_URL}${url}`,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}

export const publicPostApi = async (url, data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data
    })
    return resp.data;
}

export const privatePostApi = async (url, data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}

export const privatePostFileApi = async (url,data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}

export const privateDeleteApi = async (url) => {
    let resp = await axios({
        method: 'DELETE',
        url: `${SERVER.BASE_URL}${url}`,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}
