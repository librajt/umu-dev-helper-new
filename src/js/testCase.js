/**
 * Created by liudaoyu on 16/3/7.
 */

 var questionLib_cn = [
     {
        question:'基本问题',
        answer: ['什么是UMU互动平台？','UMU有哪些特性？', '什么是UMU互动号码？','什么是问卷环节？怎样添加问卷？','什么是提问环节？怎样添加提问？']
     },

     {
        question:'怎样向参与者分享互动环节？',
        answer: ['怎样审核发言？','怎样在大屏幕展示互动结果？', '怎样下载互动数据','将互动数据生成活动报告','将互动数据导出为Excel文件']
     },


     {
        question:'操作流程',
        answer: ['怎样创建活动？','怎样创建互动环节？', '怎样激活一个互动环节？','怎样参与现场互动？','']
     },


     {
        question:'互动环节',
        answer: ['什么是讨论环节？怎样添加讨论？','什么是拍照上墙环节？怎样拍照上墙？', '什么是游戏环节？怎样添加游戏？','什么是签到环节？怎样添加签到？','什么是模板？怎样使用模板？']
     },

     {
        question:'账户权限',
        answer: ['免费版','高级版', '企业版','','']
     },

     {
        question:'UMU企业版',
        answer: ['什么是UMU企业版？','企业版有哪些特性？', '企业版怎样使用？','','']
     },
      {
        question:'UMU App',
        answer: ['怎样下载UMU App？','怎样新建活动，添加互动环节？', '怎样管理活动？','怎样激活互动环节？','怎样分享互动环节或问题至微信群？']
     },
      {
        question:'怎样使用拍照上墙功能？',
        answer: ['什么是扫一扫功能，怎样使用扫一扫？','其它问题', '怎样升级账号？','1','2']
     },
      {
        question:'怎样提交反馈？',
        answer: ['我的数据是否安全？','浏览器要求', '1','2','3']
     }

 ];




// 触发change事件
function triggerEvent(eventType,obj) {
  if(!obj) {
    return;
  }
    var event = document.createEvent("UIEvents");
    event.initUIEvent(eventType, true, true, window, 1);
    obj.dispatchEvent(event);
}

// 触发change事件
function triggerChangeEvent(obj) {
    triggerEvent("change", obj);
}
// 触发change事件
function triggerClickEvent(obj) {
    triggerEvent("click", obj);
}





function triggerKeyEvent(obj) {
    var event = document.createEvent('KeyboardEvent'); // create a key event
// define the event
event.initKeyboardEvent("keypress",       // typeArg,
                   true,             // canBubbleArg,
                   true,             // cancelableArg,
                   null,             // viewArg,  Specifies UIEvent.view. This value may be null.
                   false,            // ctrlKeyArg,
                   false,            // altKeyArg,
                   false,            // shiftKeyArg,
                   false,            // metaKeyArg,
                    97,               // keyCodeArg,
                    97);              // charCodeArg);

 obj.dispatchEvent(event);
}

function getDate() {
    return new Date().toLocaleString();
}

// 获取全局次数
function getUid () {
    var uid;
    var key = "__umu_dev_helper_key";

    function __set (uid) {
        window.localStorage.setItem(key, uid);

    }

    function __get () {
       uid = parseInt(window.localStorage.getItem(key)||'0')+1;
       __set(uid);
    }
     __get();
    return uid;

}

function selectQuestionType () {
  var radGroup = $('.question:visible').find('.radList');
  var groupLength = radGroup.length;
  for (var i = 0; i < groupLength; i++) {
       var radList = $(radGroup[i]).find('.radBox');
       triggerClickEvent(radList[i%4]);
  }

}


// 自动填充问题
function fillTextarea() {
   var questionList =  $('.question:visible').find('.textWrap textarea');
   var titleList =  $('.question:visible').find('.qTitle .inputBox');
   var sectionList = $('.paragraphSection:visible .paragraph textarea');
   var discussList = $('.question:visible:not(.disabled)').find('.qTitle textarea');

   for (var i =0 ; i < questionList.length; i++) {
        var randomIndex = Math.floor(Math.random() * 8);
        var val = '';
        for (var m = 1 ; m < 5; m++) {
            val += (i+1) + '-' + m + questionLib_cn[randomIndex].answer[m-1] + '\n';
        }

        var qusetionVal = $(questionList[i]).val();
        if (!qusetionVal) {
            $(questionList[i]).val(val);
            triggerChangeEvent(questionList[i]);
        }

        var title = $(titleList[i]).val();
        if (!title) {
           $(titleList[i]).val('q'+(i+1) + questionLib_cn[randomIndex].question);
           triggerChangeEvent(titleList[i]);
        }
   }

   for (var i =0; i < sectionList.length; i++) {
       var index ='段落'+ (i + 1);
       var setcion = $(sectionList[i]).val();
       if (!setcion) {
        $(sectionList[i]).val('段落'+ (i+1));
        triggerChangeEvent(sectionList[i]);
       }
   }

   for (var i =0; i < discussList.length; i++) {
       var randomIndex = Math.floor(Math.random() * 8);
       var index ='提问或讨论'+ (i + 1) + questionLib_cn[randomIndex].question;
       var discuss = $(discussList[i]).val();
       if (!discuss) {
        $(discussList[i]).val(index);
        triggerChangeEvent(discussList[i]);
       }
   }

}


// 获取老师名称
function getTeacherName () {
   return $('.loginState .user .name').html();
}

// 设置title的名字
function setNewCourseTitle() {

    var $testObj = $('#manage .courseName .inputBox');
    if ($testObj.length == 1) {

        var title =  $testObj.val();
        if (!title) {
            title = getTeacherName() + '--' + getUid() +'--'+ getDate() + '（自动填写）';
            $testObj.val(title);
            
            setTimeout(function() {
                triggerChangeEvent($testObj[0]); 
            }, 10);
            
        }
    }
}

function setNewCourseNum() {
    var $testObj = $('#manage .num .inputBox');
    if ($testObj.length == 1) {
        var num = $testObj.val();
        if (num == '') {
             $testObj.val('1');
             setTimeout(function(){
                triggerChangeEvent($testObj[0]);
             },10);
             
        }
       
    }

}





function testCaseMain () {
    var testCaseUrl = window.location.href;
    if (testCaseUrl && testCaseUrl.indexOf('#/coursemanagement/new/date/')) {
        setNewCourseTitle();
        setNewCourseNum();
    }
}

