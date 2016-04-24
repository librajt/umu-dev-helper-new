/**
 * Created by liudaoyu on 16/4/24.
 */

function jenkinsMain() {
    let styles = `
    #main-panel .parameters  select {
    -webkit-appearance: none;
    font-size: 20px;
    padding: 0 5px;
    width: 250px;
}

#main-panel .parameters .setting-name {
font-size:1.2rem;
}


`;
    includeStyleElement(styles, 'umu-dev-jenkins-custom');


}

if (window.location.href.indexOf('jenkins.umucdn.cn') > -1) {
    jenkinsMain();
}
