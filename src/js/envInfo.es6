/**
 * Created by liudaoyu on 16/4/12.
 */

// 获取环境的目前使用者

var avatarMap = {
    duanjun: 'https://s3.amazonaws.com/profile_photos/46726092963020.zVgqpdMce91NH5YUDWvh_36x36.png',
    daoyu: 'https://s3.amazonaws.com/profile_photos/51340817909754.2AiujcNdlo4zspiR3ygG_36x36.png',
    rentao: 'https://s3.amazonaws.com/profile_photos/46709988664048.lROLFja8YJH0vmYFZmQh_36x36.png',
    liuyong: 'http://zjx.umucdn.cn/themes/zh-cn/images/avatar.png',
    liuwayong: 'http://zjx.umucdn.cn/themes/zh-cn/images/avatar.png',
    zhangxingjia: 'https://s3.amazonaws.com/profile_photos/76366747621438.hTRHdqy4ojotiVUd7Yn2_36x36.png',
    liudaoyu: 'https://s3.amazonaws.com/profile_photos/51340817909754.2AiujcNdlo4zspiR3ygG_36x36.png',
    dashui: 'https://s3.amazonaws.com/profile_photos/49805373656954.qIy0AeyYIp72PaYYgKqx_36x36.png',
    xuemin: 'https://s3.amazonaws.com/profile_photos/45778255451309.YVDNQ7Vu9yeW2owKjgII_36x36.png',
    yixiao: 'https://s3.amazonaws.com/profile_photos/62644716150644.NlNsnJ9brQrCOqR44gx0_36x36.png',
    root: 'http://7sbqxj.com2.z0.glb.qiniucdn.com/o_1ag9dk80v1iiq1cp1le7u071anj9.png'

};

var defaultAvatarUrl = 'images/avatar.png';

(function () {

    function getTimeDuration(sec) {
        var duration = Math.floor((+sec) / 1000);
        var days = 0; //Math.floor(duration / (24 * 3600));
        var hours = Math.floor((duration - days * 24 * 3600) / 3600);
        var minutes = Math.floor((duration - days * 24 * 3600 - hours * 3600) / 60);
        var seconds = (duration - days * 24 * 3600 - hours * 3600 - minutes * 60);
        duration = ('0' + hours).substr(-2, 2) + ":" + ('0' + minutes).substr(-2, 2) + ":" + ('0' + seconds).substr(-2, 2);
        return duration;
    };

    function getEnvInfo() {

        let defaultText = '未知,请喊一声';

        // 地址 http://wap.yx.umucdn.cn/themes/zh-cn/env.json
        let hostName = window.location.hostname.replace('test.', '');
        let currentlang = getCookie('_lang') || 'zh-cn';
        let url = 'http://' + hostName + '/themes/' + currentlang + '/env.json?' + (new Date()).getTime();
        let defaultAvatarUrl = "http://zjx.umucdn.cn/themes/zh-cn/images/avatar.png";

        $.getJSON(url, function (data) {
            let name = data.name || defaultText;
            let time = data.time || defaultText;
            let compileDate;
            let now = new Date();
            let duration;
            let avatar;

            if (time != defaultText) {
                compileDate = new Date(time);
                duration = getTimeDuration(now - compileDate);

                $('#chrome-ext-umu-lang-compile-time').html(`<span title="${time}">${duration} 以前</span>`);

                avatar = avatarMap[name.toLowerCase()] || defaultAvatarUrl;

                // let avatar = chrome.extension.getURL(avatar);
                $('#chrome-ext-umu-lang-env').html(`<img class="chrome-ext-umu-avatar" src="${avatar}" title="${name}">`);

            }


        });
    }

    if (isDevEnv()) {
        getEnvInfo();
        // setInterval(getEnvInfo, 1000 * 60 * 5);
    }

})();

