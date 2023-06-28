import axios from 'axios';

export function getSentence() {
    let msg = ""
    var config = {
    method: 'get',
    url: 'https://v1.hitokoto.cn/?c=i',
    };

    axios(config)
        .then(function (response) {
            let data = response.data;
            msg = data.hitokoto + " ——" + data.from_who
            console.log(msg)
            return msg
        })
        .catch(function (error) {
            console.log(error);
            return "最爱东山晴后雪，软红光里涌银山。——杨万里"
    });
}

export function getSentenceNo() {
    let msg = ""
    var config = {
    method: 'get',
    url: 'https://v1.hitokoto.cn/',
    };

    axios(config)
        .then(function (response) {
        let data = response.data;
        msg = data.hitokoto
        })
        .catch(function (error) {
        console.log(error);
    });
    return msg
}
