/**
 * Created by liudaoyu on 16/3/29.
 *     -webkit-user-select: auto!important;
 */


function includeStyleElement(styles, styleId = 'umu_dev_maodao') {
    if (document.getElementById(styleId)) {
        return;
    }
    var style = document.createElement("style");
    style.id = styleId;
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    style.appendChild(document.createTextNode(styles));
}


//  入口程序
function maodaoMain() {
    let styles = "* { -webkit-user-select: auto!important; -webkit-user-select: auto!important; -moz-user-select: auto!important; -ms-user-select: auto!important; -select: auto!important;}";
    includeStyleElement(styles);
}




maodaoMain();