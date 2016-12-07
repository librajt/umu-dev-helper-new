/**
 *
 * liudaoyu on 16/10/9.
 */


function saveSession() {

    var sessionData = {};

    var teacherId = '564';
    var groupId = '12411';
    var sessionId = '76411';

    var sessionInfo = sessionData.sessionInfo;
    sessionInfo.teacherId = teacherId;
    sessionInfo.sessionId = sessionId;
    sessionInfo.groupId = groupId;

    for (var i = 0, len = sessionData.sectionArr.length; i < len; i++) {
        var question = sessionData.sectionArr[i];
        var questionInfo = question.questionInfo;
        questionInfo.questionId = '';
        questionInfo.sessionId = sessionId;
        questionInfo.showIndex = '';

        var answerArr = question.answerArr;
        for (var j = 0, jlen = answerArr.length; j < jlen; j++) {
            var answer = answerArr[j];
            answer.questionId = '';
            answer.answerId = '';
        }


    }

    var jsonData = JSON.stringify(sessionData);

    var postData = {
        session_data: jsonData,
        group_id: groupId
    };

    $('body').append($('<div class="save__btn" style="z-index: 10000;background: red">保存</div>'));
    $('.save__btn').click(function () {
        $.ajax({
            //提交数据的类型 POST GET
            type: "POST",
            //提交的网址
            url: "/ajax/session/savesession",
            //提交的数据
            data: postData,
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //在请求之前调用的函数
            beforeSend: function () {
                // $("#msg").html("logining");
            },
            //成功返回之后调用的函数
            success: function (data) {
                // $("#msg").html(decodeURI(data));
            },
            //调用执行后调用的函数
            complete: function (XMLHttpRequest, textStatus) {
                // alert(XMLHttpRequest.responseText);
                console.log(textStatus);
                //HideLoading();
            },
            //调用出错执行的函数
            error: function () {
                //请求出错处理
            }
        });
    });

}
