const axios  = require('axios');
const FormData = require('form-data');


const getMusicDetail = async (url) => {
    const {data} = await axios({
        url,
        method: 'POST',
        headers: {
            "x-requested-with": "XMLHttpRequest"
        },
        params: {setup: 1}
    });
    return data;
};

const getHost = async (url) => {
    let type = 'mp3';
    if(url.indexOf('podcast') !== -1) type = 'podcast';
    const MAP_TYPE = {
        podcast: 'https://www.radiojavan.com/podcasts/podcast_host',
        mp3: 'https://www.radiojavan.com/mp3s/mp3_host'
    };
    const MyForm = new FormData();
    let ID = url.split('/')[url.split('/').length - 1].split("?")[0].split("#")[0];
    MyForm.append('id', ID);

    const {data} = await axios({
        url: MAP_TYPE[type],
        method: 'POST',
        data: MyForm,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            'Content-Type': 'multipart/form-data;'
        },
    });
    return data
}

const getRadioJavanUrl = async (url) => {
    //TODO: validate url
    //TODO: redirect 302 -> https://rj.app/m/bE35ZJDl
    const details = await getMusicDetail(url);
    const host = await getHost(url);
    return host.host + '/media/' + details['currentMP3Url'] + '.mp3';
}

module.exports = {getRadioJavanUrl}