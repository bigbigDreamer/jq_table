/**
 * @time  2019/9/2 22:04
 * @author  Eric Wang <vuejs@vip.qq.com>
 * @desc  jQuery + BootStrap 动态表格核心代码
 * @todo  全局UI样式有待美化，算法效率有待提升。
 * @license  MIT
 */


// 开启严格模式
'use strict';

// 核心代码
$(() => {

    // 初始化行索引
    let rowIndex = 0;

    // 初始化提示信息过渡效果
    $("#myAlert").css({transition: "all 800ms"});

    // 表单信息
    const ROW_INFO = {};

    // log保存日志
    const LOG = [];

    // 深拷贝对象方法
    const DEEP_CLONE = obj => JSON.parse(JSON.stringify(obj));

    // 表单验证
    const VERIFY_FORM = {
        /**
         * @desc 验证姓名
         * @param _name {String}  -姓名
         * @return {boolean}
         */
        VERIFY_NAME(_name) {
            return /.{2,5}/g.test(_name);
        },

        /**
         * @desc 验证电话
         * @param _phone {String}  -电话
         * @return {boolean}
         */
        VERIFY_PHONE(_phone) {
            return /^1[345678]\d{9}$/g.test(_phone);
        },

        /**
         * @desc 验证在职状态
         * @param _status {String}  -状态
         * @return {boolean}
         */
        VERIFY_STATUS(_status) {
            return /(在职|不在职)/g.test(_status);
        }
    };

    // 验证防抖，监测用户输入状态，暂停输入后开始验证
    /**
     * @param domObj {Object} - 监听输入的用户对象
     * @param delay {Number} - 设置多久验证一次, 默认单位ms
     * @param attrs {String} - 校验对象
     * @return {boolean}
     */

    const AntiShakeVerification = (domObj, delay, attrs) => {
        let timer = null;
        let res = false;
        domObj && domObj.addEventListener("input", (e) => {

            // 用户每次输入就重置定时器
            clearTimeout(timer);

            // 启动定时器
            timer = setTimeout(() => {
                // 过滤验证属性，调用方案
                switch (attrs) {

                    case "name" :
                        res = VERIFY_FORM.VERIFY_NAME(e.target.value);
                        if (res) {
                            domObj.style.border = "1px green solid";
                        } else {
                            domObj.style.border = "1px red solid";
                        }
                        break;

                    case "phone" :
                        res = VERIFY_FORM.VERIFY_PHONE(e.target.value);
                        if (res) {
                            domObj.style.border = "1px green solid";
                        } else {
                            domObj.style.border = "1px red solid";
                        }
                        break;

                    case "status" :
                        res = VERIFY_FORM.VERIFY_STATUS(e.target.value);
                        if (res) {
                            domObj.style.border = "1px green solid";
                        } else {
                            domObj.style.border = "1px red solid";
                        }
                        break;
                    default :
                        return false;
                }

            }, delay)
        }, false);

        return res;
    };


    // 添加DOM元素
    $("#addBtn").click(() => {

        // 追加DOM节点
        $("tbody").append(`
          <tr id="row${rowIndex}"> 
            <td>${rowIndex}</td>
            <td>
                <input type="text" placeholder="请输入姓名" class="form-control input${rowIndex}" name="name"/>
                <span class="table_tip${rowIndex}" data-name="name">此处待添加</span>
                </td>       
            <td>
                <input type="text" class="form-control  input${rowIndex}" placeholder="请输入电话" name="phone"/>
                <span  class="table_tip${rowIndex}" data-name="phone">此处待添加</span>
                </td>
            <td>
               <input type="text" class="form-control input${rowIndex}" placeholder="请输入在职状态" name="status"/>
               <span  class="table_tip${rowIndex}" data-name="status">此处待添加</span>
                </td>
            <td>
            <button class="btn btn-primary " id="insert${rowIndex}">添加</button>
            <button class="btn btn-danger delRow" id="delRow${rowIndex}">删除</button>
            </td>
           </tr>
        `);

        // 删除按钮事件
        $(`#delRow${rowIndex}`).click((e) => {

            // 提示信息
            $("#myAlert span").text(`你确定要删除id为${e.target.id.slice(6,)}的行吗？`);
            $("#myAlert").show();
            $("#confirmBtn").click(() => {
                $("tr").remove(`#row${e.target.id.slice(6,)}`);
                $("#myAlert").hide();
            });
        });


        // 添加按钮事件   jq版本
        // 预计按钮有三种状态
        // status 1: "添加"
        // status 2: "保存"
        // status 3: "修改"
        $(`#insert${rowIndex}`).click((e) => {

            // 解构赋值获取目标属性
            const {innerText} = e.target;

            // 加一层判断
            if (e.target.innerText && innerText === "添加") {

                // 控制按钮的文字提示
                e.target.innerText = "保存";

                // 提示信息的隐藏（必须让它不占用空间）
                // 由于获取的DOM数组是伪数组，所以用到Array.from用来转换为真实的数组对象，旨在于能够迭代它
                Array.from($(`.table_tip${e.target.id.slice(6,)}`))
                    .map(item => {
                        item.style.display = "none";
                    });


                // 输入框的显示
                Array.from($(`.input${e.target.id.slice(6,)}`))
                    .map(item => {
                        item.style.display = "block";
                        // 过滤目标name，分别传入attr
                        if (item.name === "name") {
                            AntiShakeVerification(item, 800, "name");
                        } else if (item.name === "phone") {
                            AntiShakeVerification(item, 800, "phone");
                        } else if (item.name === "status") {
                            AntiShakeVerification(item, 800, "status");
                        }
                    });


            } else if (e.target.innerText && e.target.innerText === "保存") {

                e.target.innerText = "修改";

                // 输入框的隐藏
                Array.from($(`.input${e.target.id.slice(6,)}`))
                    .map(item => {
                        item.style.display = "none";
                        ROW_INFO[item.name] = item.value;
                    });


                // 提示信息的显示
                Array.from($(`.table_tip${e.target.id.slice(6,)}`))
                    .map((item, index) => {

                        switch (index) {
                            case 0:
                                item.innerText = ROW_INFO.name;
                                break;
                            case 1:
                                item.innerText = ROW_INFO.phone;
                                break;
                            case 2:
                                item.innerText = ROW_INFO.status;
                                break;
                            default :
                                return false;
                        }

                        item.style.display = "block";
                    });

                // 当前时间戳
                // 不可定义为全局，因为每次点击保存的时间戳都应该是再次赋值
                const TIME_STAMP = Date.now();

                // 记录日志
                // 此处一定要用到深克隆，不然内存引用始终指向的是同一块内存
                LOG.push({
                    time: new Date(TIME_STAMP),
                    content: DEEP_CLONE(ROW_INFO),
                });


            } else if (e.target.innerText && e.target.innerText === "修改") {

                e.target.innerText = "保存";
                // 提示信息的隐藏
                Array.from($(`.table_tip${e.target.id.slice(6,)}`))
                    .map(item => {
                        item.style.display = "none";

                        // 很重要的一个点，通过自定义属性取得name值
                        ROW_INFO[item.getAttribute("data-name")] = item.innerText;
                    });


                // 输入框的显示，把原来的表单内部信息新增进input的value中
                Array.from($(`.input${e.target.id.slice(6,)}`))
                    .map(item => {
                        item.style.display = "block";
                        item.value = ROW_INFO[item.name];
                    });
            }
        });

        rowIndex++;
    });

    // 打印添加日志
    $("#printBtn").click((e) => {
        // console.log(e.target.innerText.trim() === "打印日志")
        if (e.target.innerText && e.target.innerText.trim() === "打印日志") {

            e.target.innerText = "返回";

            $("#addBtn").attr("disabled", true);
            $(".table").hide();

            // 添加之前先置空
            $(".log").empty()
                .append(` 
              <div class="panel panel-default">
              <div class="panel-heading">
              <h3 class="panel-title">动态表格保存日志</h3>
              </div>
              <div class="panel-body">
                  <ul>
                     ${LOG.map(item => "<li>" +
                    "<span>" + item.time + "</span> " +
                    "<br>" +
                    "<span>" + (item.content.name || "未添加") + "  >>  " + (item.content.phone || "未添加") + "  >>  " + (item.content.status || "未添加") + "</span>" +
                    "</li>")}
                  </ul>
             </div>
             </div>
            `
                )
                .show();
        } else {
            // 激活按钮
            $("#addBtn").attr("disabled", false);
            e.target.innerText = "打印日志";

            // 元素显隐
            $(".log").hide();
            $(".table").show();
        }

    });

});

// 好喝的粥尚且需要时间去熬，代码又何尝不是呢