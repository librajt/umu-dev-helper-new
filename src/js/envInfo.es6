/**
 * Created by liudaoyu on 16/4/12.
 */

// 获取环境的目前使用者

(function () {
    let envInfo;

    function getEnvInfo() {

        // 地址 http://wap.yx.umucdn.cn/themes/zh-cn/env.json
        let hostName = window.location.hostname.replace('test.', '');
        let currentlang = getCookie('_lang') || 'zh-cn';
        let url = 'http://' + hostName + '/themes/' + currentlang + '/env.json';

        $.getJSON(url, function (data) {
            let name = data.name || '未知,请喊一声';
            let time = data.time || '未知,请喊一声';

            $('#chrome-ext-umu-lang-env').html(`<span title="">${name}:${time}</span>`);
        });
    }

    getEnvInfo();

})();

