<template>
  <div class="page">
    <!-- 用户信息 -->
    <title-bar img="user" text="用户信息"></title-bar>
    <div class="module">
      <ul class="reset-ul">
        <li>
          <span class="label">姓名：</span>
          <span class="value">{{aggregateData.name}}</span>
        </li>
        <li>
          <span class="label">身份：</span>
          <span class="value">{{aggregateData.isOwner}}</span>
        </li>
        <li>
          <span class="label">昵称：</span>
          <span class="value">{{aggregateData.nickname}}</span>
        </li>
        <li>
          <span class="label">手机：</span>
          <span class="value">{{aggregateData.phone}}</span>
        </li>
        <li class="spec-li-66">
          <span class="label">证件：</span>
          <span class="value">{{aggregateData.idCard}}</span>
        </li>
        <li class="spec-li-100">
          <div class="label">当前房屋：</div>
          <div v-for="(val,key,i) in aggregateData.currentHouse">
            <div class="value">
              {{ val }}
            </div>
          </div>
          <!--<div class="value">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</div>-->
        </li>
        <li class="spec-li-100">
          <div class="label">其他房屋：</div>
          <div v-for="(val,key,i) in aggregateData.otherHouse">
            <div class="value">
              {{ val }}
            </div>
            <br/>
          </div>
          <!--<div class="value">重庆 金科集美嘉悦3组团</div>-->
        </li>
        <li class="spec-li-100">
          <div class="label">客户备注：</div>
          <div class="value">
            <a-textarea placeholder="请输入文字内容" :rows="4" v-model="aggregateData.remark"/>
          </div>
        </li>
        <li class="spec-li-btn">
          <a-button type="primary" @click="updateUserRemark(aggregateData.remark)">保存至客户信息</a-button>
        </li>
      </ul>
    </div>

    <!-- 物业缴纳 -->
    <title-bar img="wuye" text="物业缴纳"></title-bar>
    <div class="module">
      <ul class="reset-ul">
        <li class="reset-spec-li-50">
          <span class="label">截止当前应缴：</span>
          <span class="value-money">¥ {{aggregateData.arrears}}</span>
          <span class="value-blank">查看明细</span>
        </li>
        <li class="reset-spec-li-50">
          <span class="label">预存余额：</span>
          <span class="value-money">¥ {{aggregateData.balance}}</span>
          <span class="value-blank">查看明细</span>
        </li>
      </ul>
    </div>

    <!-- 报事报修 -->
    <title-bar img="baoshi" text="报事报修"></title-bar>
    <div class="module">
      <div class="spec-li-100 margin-bottom-18">
        <span class="label">起止时间：</span>
        <div>
          <a-range-picker :placeholder="['开始时间','结束时间']" v-model="rangePicker"/>
        </div>
        <div class="btn-search">
          <a-button type="primary" @click="getreportData(rangePicker)">查看</a-button>
        </div>
      </div>
      <div class="report-card">
        <div class="report-card-title">最近报事（近一月报事）</div>
        <div class="report-card-content" v-for="(item,index) in reportData" :key="index">
          <div>{{item.status}}
            <span class="more-report" @click="moreHandler(item)">展开
                           <a-icon v-if="item.showDetail" type="caret-down"/>
                            <a-icon v-if="!item.showDetail" type="caret-up"/>
                       </span>
          </div>
          <div>
            <span>{{item.content}}</span>
            <span class="fr">{{item.time}}</span>
          </div>
          <div class="report-box" v-if="item.showDetail">
            <a-timeline>
              <a-timeline-item v-for="(subitem,index) in item.reportMsgList">
                <div class="report-content">
                  <div>
                    <div class="report-time">{{subitem.createTime}}</div>
                    <div> {{subitem.nodeName}}</div>
                  </div>
                  <div>
                    <div class="report-label">处理人：</div>
                    <div>{{subitem.userName}}</div>
                  </div>
                  <div>
                    <div class="report-label">处理内容：</div>
                    <div>{{subitem.standardResponse}}</div>
                  </div>
                </div>
              </a-timeline-item>
              <!--              <a-timeline-item>
                              <div class="report-content">
                                <div>
                                  <div class="report-time">2016-12-12 12:32</div>
                                  <div> 报事处理</div>
                                </div>
                                <div>
                                  <div class="report-label">处理人：</div>
                                  <div>周烤猫</div>
                                </div>
                                <div>
                                  <div class="report-label">处理内容：</div>
                                  <div>修复</div>
                                </div>

                              </div>
                            </a-timeline-item>
                            <a-timeline-item>
                              <div class="report-content">
                                <div>
                                  <div class="report-time">2016-12-12 12:32</div>
                                  <div> 新增报事</div>
                                </div>
                                <div>
                                  <div class="report-label">处理人：</div>
                                  <div>周烤猫</div>
                                </div>
                                <div>
                                  <div class="report-label">处理内容：</div>
                                  <div>
                                    <p>特别重大、重大、较大、一般突发公共事件信息和可能引发特别重大、重大、较大、一般突发公共事件的预；</p>
                                    <div>
                                      <div class="img-box">

                                      </div>
                                      <div class="img-box">

                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </a-timeline-item>-->
            </a-timeline>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷保修 -->
    <title-bar img="baoxiu" text="快捷保修"></title-bar>
    <div class="module">
      <ul class="reset-ul">
        <li>
          <span class="label">姓名：</span>
          <span class="value">{{aggregateData.name}}</span>
        </li>
        <li>
          <span class="label">身份：</span>
          <span class="value">{{aggregateData.isOwner}}</span>
        </li>
        <li>
          <span class="label">昵称：</span>
          <span class="value">{{aggregateData.nickname}}</span>
        </li>
        <li>
          <span class="label">手机：</span>
          <span class="value">{{aggregateData.phone}}</span>
        </li>
        <li class="spec-li-66">
          <span class="label">证件：</span>
          <span class="value">{{aggregateData.idCard}}</span>
        </li>
        <li class="spec-li-100">
          <div class="label">当前房屋：</div>
          <div v-for="(val,key,i) in aggregateData.currentHouse">
            <div class="value">
              {{ val }}
            </div>
          </div>
        </li>
        <li class="spec-li-100">
          <div class="label">报事内容：</div>
          <div class="value">
            <a-textarea placeholder="请输入文字内容" :rows="4" v-model="superviseDescribe"/>
          </div>
        </li>
        <li class="spec-li-100">
          <div class="label">图片上传：</div>
          <!--action="http://localhost:8080/community_admin_war/sys/oss/upload"
           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
          <div class="value">
            <a-upload
              name="file"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="http://localhost:8080/community_admin_war/qiyu/upload"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">最多上传6张</div>
              </div>
            </a-upload>
          </div>
        </li>
        <li class="spec-li-btn">
          <a-button type="primary" @click="addPostIt()">一键报事</a-button>
        </li>
      </ul>
    </div>

    <!-- 通知公告 -->
    <title-bar img="gonggao" text="通知公告"></title-bar>
    <div class="module" v-for="(val,i) in aggregateData.noticeInfoList">
      <div class="notice-item">
        <div class="tip-watter">{{val.type}}</div>
        <div class="notice-content">
          <p>{{val.shortNotice}}</p>
        </div>
        <div>
          <span @click="detailNoticeInfoHandler(val)">查看详情</span>
          <span>一键发送</span>
        </div>
        <div class="notice-content" v-if="val.showDetail">
          {{val.content}}
        </div>
      </div>
      <!--<div class="notice-item">
        <div class="tip-watter">停电</div>
        <div class="notice-content">
          <p>一段假想的简介，这是一段比较长的简介为您提供安全报的一段假想的简介，这是一段比较长的简介为您提供安全报的内容有那些相关的安同时包含近期有…内容有那些相关的安同时包含近期有…</p>
        </div>
        <div>
          <span>查看详情</span>
          <span>一键发送</span>
        </div>
      </div>-->
      <!--<div class="notice-item">
        <div class="tip-watter">停气</div>
        <div class="notice-content">
          <p>一段假想的简介，这是一段比较长的简介为您提供安全报的一段假想的简介，这是一段比较长的简介为您提供安全报的内容有那些相关的安同时包含近期有…内容有那些相关的安同时包含近期有…</p>
        </div>
        <div>
          <span>查看详情</span>
          <span>一键发送</span>
        </div>
      </div>-->
      <!--<div class="notice-item">
        <div class="tip-watter">消杀</div>
        <div class="notice-content">
          <p>一段假想的简介，这是一段比较长的简介为您提供安全报的一段假想的简介，这是一段比较长的简介为您提供安全报的内容有那些相关的安同时包含近期有…内容有那些相关的安同时包含近期有…</p>
        </div>
        <div>
          <span>查看详情</span>
          <span>一键发送</span>
        </div>
      </div>-->
    </div>
    <!-- 服务记录 -->
    <!--<title-bar img="fuwu" text="服务记录"></title-bar>-->
  </div>
</template>

<script>
    import $ from "jquery";
    import TitleBar from "@/components/TitleBar.vue";

    export default {
        name: "page",
        data() {
            return {
                userid: "",
                loading: false,
                superviseDescribe: "",//报事内容
                imageUrl: "",
                rangePicker: [],
                aggregateData: {
                    nickname: "昵称",
                    name: "名称",
                    phone: "手机号",
                    idCard: "证件",
                    isOwner: "身份",
                    arrears: "",
                    balance: "",
                    remark: "",
                    currentHouse: {},
                    otherHouse: {},
                    postItInfoList: [],
                    noticeInfoList: [{showDetail: false}]
                },
                reportData: [
                    {
                        id: 1,
                        name: "",
                        content: "内容",
                        status: "状态",
                        time: "时间",
                        reportMsgList: [{createTime: ""}],
                        showDetail: false
                    },
                    {
                        id: 2,
                        name: "",
                        content: "内容",
                        status: "状态",
                        time: "时间",
                        reportMsgList: [],
                        showDetail: false
                    }
                ]
            };
        },
        components: {
            TitleBar
        },
        mounted() {
            var userid = this.getQueryString("userid");
            //alert("userid======" + userid);
            /*alert(window.location.href);
            alert(window.location.hash.split("?")[1]);*/
            //var userid = "15102389968_2227ebe1-adf3-4c30-9dd0-a73e00f8ef15";
            //var userid = "18983457931_654a350d-9ab6-4a82-958d-093f44578b9d";
            this.userid = userid;
            this.initData(userid);
        },
        methods: {
            //初始化数据
            initData(userid) {
                var that = this;
                var baseURL = "http://localhost:8080/community_admin_war/";
                var url = "/qiyu/get_aggregate_info";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify({"userid": userid}),
                    success: function (r) {
                        if (r.errcode == 200) {
                            that.aggregateData = r.data;
                            if (r.data.isOwner == "1") {
                                that.aggregateData.isOwner = "是";
                            } else {
                                that.aggregateData.isOwner = "否";
                            }
                            that.reportData = that.aggregateData.postItInfoList;
                            //alert(that.aggregateData.postItInfoList);
                        } else {
                            alert(r.errmsg);
                        }
                    }
                });
            },
            //一键报事
            addPostIt() {
                var that = this;
                if (that.superviseDescribe == "" || that.superviseDescribe == null) {
                    alert("一键报事内容不能为空");
                    return;
                }
                var baseURL = "http://localhost:8080/community_admin_war/";
                var url = "/qiyu/add_postIt";

                var superviseName = that.aggregateData.name;
                if (superviseName == "" || superviseName == null) {
                    superviseName = that.aggregateData.phone;
                }
                var roomId = that.userid.split("_")[1];
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify({
                        "superviseName": superviseName,
                        "supervisePotoadd": that.imageUrl,
                        "superviseDescribe": that.superviseDescribe,
                        "roomId": roomId,
                        "contactPhone": that.aggregateData.phone,
                        "inspTypeId": "大社区报事", "thirdParty": "0"
                    }),
                    success: function (r) {
                        if (r.errcode == 200) {
                            alert(r.errmsg);
                        } else {
                            alert(r.errmsg);
                        }
                    }
                });
            },
            //修改客户备注
            updateUserRemark(remark) {
                var that = this;
                var baseURL = "http://localhost:8080/community_admin_war/";
                var url = "/qiyu/update_user_remark";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify({"userid": that.userid, "remark": remark}),
                    success: function (r) {
                        if (r.errcode == 200) {
                            that.aggregateData.remark = remark;
                            alert("保存成功");
                        } else {
                            alert(r.errmsg);
                        }
                    }
                });
            },
            //根据时间获取报事列表
            getreportData(times) {
                var date1 = new Date(times[0]);
                var date2 = new Date(times[1]);

                var startTime = this.dateFormat("YYYY-mm-dd", date1);
                var endTime = this.dateFormat("YYYY-mm-dd", date2);

                var that = this;
                var baseURL = "http://localhost:8080/community_admin_war";
                var url = "/qiyu/get_postIt_list";

                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify({"userid": this.userid, "startTime": startTime, "endTime": endTime}),
                    success: function (r) {
                        if (r.errcode == 200) {
                            //alert(JSON.stringify(r.data));
                            that.reportData = r.data;
                        } else {
                            alert(r.errmsg);
                        }
                    }
                });
            },
            //时间格式
            dateFormat(fmt, date) {
                let ret;
                let opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                    ;
                }
                ;
                return fmt;
            },
            // 展开报事详情
            moreHandler(item) {
                if (item.showDetail == false) {
                    var that = this;
                    var baseURL = "http://localhost:8080/community_admin_war";
                    var url = "/qiyu/get_postIt_detail";

                    $.ajax({
                        type: "POST",
                        url: baseURL + url,
                        contentType: "application/json",
                        data: JSON.stringify({"postItId": item.id}),
                        success: function (r) {
                            if (r.errcode == 200) {
                                var allData = that.reportData;
                                allData.forEach(element => {
                                    if (element.id == item.id) {
                                        //alert("subList======"+JSON.stringify(subList));
                                        //element.showDetail = !element.showDetail;
                                        element.reportMsgList = r.data.listObj;
                                        //alert("1element.reportMsgList:=="+JSON.stringify(element.reportMsgList));
                                    }
                                });
                                that.reportData = allData;
                                that.$forceUpdate();
                            } else {
                                alert(r.errmsg);
                            }
                        }
                    });
                }
                this.reportData.forEach(element => {
                    if (element.id == item.id) {
                        element.showDetail = !element.showDetail;
                    }
                });
            },
            //查看公告详情
            detailNoticeInfoHandler(val) {
                this.aggregateData.noticeInfoList.forEach(element => {
                    if (element.id == val.id) {
                        element.showDetail = !element.showDetail;
                    }
                });
            },
            //获取url参数
            getQueryString(key) {
                var after = window.location.search;
                if (after.indexOf('?') === -1) {
                    after = window.location.hash.split("?")[1];
                }else {
                    after = after.substr(1)
                }
                //if(after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空
                //key存在先通过search取值如果取不到就通过hash来取
                //after = after.substr(1) || window.location.hash.split("?")[1];
                if (after) {
                    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                    var r = after.match(reg);
                    if (r != null) {
                        return decodeURIComponent(r[2]);
                    } else {
                        return null;
                    }
                }
            },
            //　上传图片
            handleChange(info) {
                if (info.file.status === "uploading") {
                    this.loading = true;
                    return;
                }
                if (info.file.status === "done") {
                    // Get this url from response in real world.
                    //alert("info.file.response.url========" + info.file.response.url);
                    this.imageUrl = info.file.response.url;
                    this.loading = false;
                    /*getBase64(info.file.originFileObj, imageUrl => {
                        alert("imageUrl========"+imageUrl);
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });*/
                }
            },
            // 图片上传验证
            beforeUpload(file) {
                /*const isJPG = file.type === "image/jpeg";
                if (!isJPG) {
                    this.$message.error("You can only upload JPG file!");
                }*/
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("Image must smaller than 2MB!");
                }
                return isLt2M;
            }
        }
    };
</script>


<style scoped>
  .module {
    margin: 0 3rem;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 2rem;
  }

  .module .reset-ul {
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .module .reset-ul li {
    float: left;
    width: 33%;
    margin-bottom: 1.8rem;
  }

  .spec-li-66 {
    width: 66% !important;
  }

  .spec-li-50 {
    width: 50% !important;
  }

  .reset-spec-li-50 {
    width: 50% !important;
  }

  @media screen and (max-width: 0px) {
    .reset-spec-li-50 {
      width: 100% !important;
    }
  }

  .spec-li-100 {
    width: 100% !important;
    display: flex;
    align-items: center;
  }

  .spec-li-btn {
    width: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }

  .spec-li-100 .label {
    min-width: 8rem;
  }

  .spec-li-100 .value {
    width: 100%;
  }

  .label {
    font-size: 1.4rem;
    color: #262626;
    line-height: 2.2rem;
  }

  .value {
    font-size: 1.4rem;
    color: #595959;
    line-height: 2.2rem;
  }

  .value-money {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.85);
    line-height: 2.8rem;
  }

  .value-blank {
    font-size: 1.4rem;
    color: #1890ff;
    text-align: left;
    line-height: 2.2rem;
    margin-left: 1.2rem;
  }

  .btn-search {
    margin-left: 3rem;
  }

  .report-card {
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    margin-bottom: 3.8rem;
  }

  .report-card-title {
    background: #fafafa;
    border-bottom: 1px solid #e9e9e9;
    border-radius: 3px 3px 0 0;
    font-size: 1.4rem;
    color: #262626;
    font-weight: 700;
    padding: 1rem 0 1rem 2.2rem;
  }

  .report-card-content {
    padding: 1.6rem 2.2rem;
  }

  .report-card-content > div:nth-of-type(1) {
    font-size: 1.4rem;
    color: #ff6363;
    font-weight: 700;
  }

  .report-card-content > div:nth-of-type(2) {
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.85);
    margin: 1.2rem 0 0 0;
  }

  .report-box {
    margin-top: 3rem;
    border-bottom: 1px solid #e9e9e9;
  }

  /* 通知公告 */
  .notice-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    margin: 2rem 0;
  }

  .notice-item:nth-of-type(1) {
    margin-top: 0rem;
  }

  .notice-item:nth-of-type(2) .tip-watter {
    background: #2e2e2e;
  }

  .notice-item:nth-of-type(3) .tip-watter {
    background: #5bd171;
  }

  .notice-item:nth-of-type(4) .tip-watter {
    background: #ffbf00;
  }

  .notice-item > div:nth-of-type(1) {
    margin-right: 2.7rem;
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.97);
    line-height: 4.8rem;
    text-align: center;
    background: #369bfa;
    border-radius: 4px;
    width: 4.8rem;
    height: 4.8rem;
    min-width: 4.8rem;
  }

  .notice-item > div:nth-of-type(2) {
    padding-right: 17rem;
    box-sizing: border-box;
  }

  .notice-item > div:nth-of-type(3) {
    width: 15rem;
    position: absolute;
    right: 0;
  }

  .notice-item > div:nth-of-type(3) span:nth-of-type(1) {
    font-size: 1.4rem;
    color: #1890ff;
    line-height: 2.2rem;
    padding: 0 0.6rem;
    cursor: pointer;
  }

  .notice-item > div:nth-of-type(3) span:nth-of-type(2) {
    font-size: 1.4rem;
    color: #5bd171;
    line-height: 2.2rem;
    padding: 0 0.6rem;
    border-left: 1px solid #d8d8d8;
    cursor: pointer;
  }

  .notice-content p {
    margin-bottom: 0;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    display: -webkit-box;
    display: box;
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.45);
  }

  .report-content {
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.45);
    text-align: left;
  }

  .report-content > div {
    margin-bottom: 1.2rem;
    color: #595959;
    display: flex;
  }

  .report-content > div:nth-of-type(2) {
    font-size: 1.4rem;
    text-align: left;
  }

  .report-content > div:last-of-type {
    margin-bottom: 0;
  }

  .report-time {
    color: rgba(0, 0, 0, 0.45);
    margin-right: 2.8rem;
  }

  .report-label {
    color: #000;
    min-width: 7rem;
  }

  .img-box {
    width: 7rem;
    height: 7rem;
    background-color: #d8d8d8;
    border-radius: 4px;
    margin-right: 1rem;
    float: left;
  }

  .more-box {
    text-align: center;
    cursor: pointer;
  }

  .more-box.no {
    transform: rotateX(180deg);
  }

  .more-report {
    float: right;
    font-size: 1.2rem;
    color: #1890ff;
    cursor: pointer;
  }
</style>

<style>
  .ant-timeline .ant-timeline-item:nth-of-type(1) .ant-timeline-item-tail {
    border-left: 2px solid #1890ff;
  }
</style>
