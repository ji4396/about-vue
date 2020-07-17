<template>
  <div class="requireinfo-box">
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="ruleForm"
      class="requireinfo-form"
      label-width="110px"
      :model="liveData"
    >
      <el-form-item label="直播标题" prop="title">
        <div class="title_tip">
          <el-input v-model="liveData.title" :placeholder="placeholderTitle" :validate-event="flag" maxlength="30"  class="width-set"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="直播公告" prop="welcome">
        <el-input
          v-model="liveData.welcome"
          class="width-set"
          maxlength="50"
          :placeholder="placeholderwelcome"
          :validate-event="flag"
        ></el-input>
        <!-- <p v-for="a in arr"></p> -->
      </el-form-item>
      <el-form-item label="直播描述" prop="desc">
        <el-input
          v-model="liveData.desc"
          :placeholder="placeholderdesc"
          class="width-set"
          maxlength="100"
          :validate-event="flag"
        ></el-input>
      </el-form-item>
      <el-form-item label="直播时间" prop="pubAt" class="time-picker">
        <el-date-picker
          v-model="liveData.pubAt"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择日期时间"
          :validate-event="flag"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="直播封面" prop="previewThumb" class="edit-errorinfo1">
        <div class="require-upload">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl()"
            :data="coverData1"
            accept=".jpg, .png, .jpeg"
            :show-file-list="false"
            :on-success="handleScpreviewThumb"
            :before-upload="beforeUploadpreviewThumb"
          >
            <img
              v-if="liveData.previewThumb"
              :src="liveData.previewThumb"
              class="avatar-uploader_init avatar-uploader_coverimg"
            />
            <i v-else class="el-icon-plus avatar-uploader_init avatar-uploader_coverimg1"></i>
          </el-upload>
          <ul>
            <li>封面尺寸：宽高为1280*720像素的图片</li>
            <li>支持扩展名：png、jpg，大小限制：不超过3M</li>
            <li>用于APP直播列表封面展示</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="分享海报封面" prop="shareImg" class="edit-errorinfo2">
        <div class="require-upload">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl()"
            :data="coverData2"
            accept=".jpg, .png, .jpeg"
            :show-file-list="false"
            :on-success="handleScshareImg"
            :before-upload="beforeUploadshareImg"
          >
            <img
              v-if="liveData.shareImg"
              :src="liveData.shareImg"
              class="avatar-uploader_init avatar-uploader_share"
            />
            <i v-else class="el-icon-plus avatar-uploader_init avatar-uploader_share1"></i>
          </el-upload>
          <ul>
            <li>封面尺寸：宽高为1080*1266像素的图片</li>
            <li>支持扩展名：png、jpg，大小限制：不超过3M</li>
            <li>用于直播分享封面展示</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="直播横屏背景" prop="landscapeThumb" class="edit-errorinfo3">
        <div class="require-upload">
          <img
            v-if="liveData.landscapeThumb"
            :src="liveData.landscapeThumb"
            @click="alertDialog('landscape')"
            class="avatar-uploader_init avatar-uploader_coverimg dashed_line border_radio"
          />
          <div
            v-else
            class="avatar-uploader_init avatar-uploader_coverimg dashed_line border_radio"
            @click="alertDialog('landscape')"
          >
            <div class="module">
              <i class="el-icon-plus"></i>
              <div>选择模版</div>
            </div>
          </div>
          <p>用于直播时直播背景展示</p>
        </div>
      </el-form-item>
      <el-form-item label="直播竖屏背景" prop="portraitThumb" class="edit-errorinfo4">
        <div class="require-upload">
          <img
            v-if="liveData.portraitThumb"
            :src="liveData.portraitThumb"
            @click="alertDialog('portrait')"
            class="avatar-uploader_init avatar-uploader_share dashed_line border_radio"
          />
          <div
            v-else
            class="avatar-uploader_init avatar-uploader_share dashed_line border_radio"
            @click="alertDialog('portrait')"
          >
            <div class="module">
              <i class="el-icon-plus"></i>
              <div>选择模版</div>
            </div>
          </div>
          <p>用于直播时直播背景展示</p>
        </div>
      </el-form-item>
      <div class="btn-footer">
        <el-button @click="pre">上一步</el-button>
        <el-button type="primary" @click="next('ruleForm')">下一步</el-button>
      </div>
    </el-form>
    <!-- 弹出框 -->
    <!-- :title="heng?'选择横屏背景模板':'选择竖屏背景模板'" -->
    <el-dialog
      :visible.sync="dialogVisible"
      :class="{'dialog_across':heng,'dialog_column':!heng,'dialog':true}"
      :show-close="false"
    >
      <span slot="title">
        <p class="titles">
          <span>{{heng?'选择横屏背景模板':'选择竖屏背景模板'}}</span>
          <span>(最多可选择一张图片)</span>
        </p>
      </span>
      <section class="img-group">
        <div
          v-for="(v, i) in bgImgArr"
          :key="i"
          :class="{'img-item-heng':heng,'img-item-shu':!heng}"
        >
          <img :src="v.url" @click="checkImg=v.id" />
          <p>
            <el-radio class="radio" v-model="checkImg" :label="v.id">{{''}}</el-radio>
          </p>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureModelImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      liveData: {
        title: "",
        welcome: "",
        desc: "",
        pubAt: "",
        previewThumb: "", //封面图
        shareImg: "",
        landscapeThumb: "", //横屏封面图
        portraitThumb: "", //竖屏封面图
        id: "0", //新建传0
        mobileDirection: "" //直播间横竖屏  1横屏 2竖屏
      },
      arr:[1,2,3,4,5,6,7],
      pickerOptions:{
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000;
        }
      },
      //  上传图片需要传递的值
      coverData1: {
        accessToken: localStorage.getItem("accessToken"),
        business: "lCover"
      },
      coverData2: {
        accessToken: localStorage.getItem("accessToken"),
        business: "lShare"
      },
      flag:false,//默认不验证  提交才验证
      rules: {
        title: [
          { required: true, message: "请输入直播标题" },
          { min: 5, message: "直播标题最少5个字" },
          { max: 30, message: "超出不可输入" }
        ],
        welcome: [
          { required: true, message: "请输入直播公告"},
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
          }
        ],
        desc: [
          { required: true, message: "请输入直播房间描述", },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
          }
        ],
        pubAt: [
          { required: true, message: "请选择直播开始时间" }
        ],
        previewThumb: [
          { required: true, message: "请上传直播封面" }
        ],
        shareImg: [
          { required: true, message: "请上传分享海报封面"}
        ],
        landscapeThumb: [
          { required: true, message: "请选择直播横屏背景" }
        ],
        portraitThumb: [
          { required: true, message: "请选择直播竖屏背景"}
        ]
      },
      placeholderTitle: "请输入直播标题（5-30个字）",
      placeholderwelcome: "请输入直播公告（1-50个字）",
      placeholderdesc: "请输入房间描述（1-100个字）",
      dialogVisible: false,
      heng: true, //选择横屏模板
      checkImg: "",
      bgImgArrAll: {},
      bgImgArr: []
    };
  },
  created() {
    //正常状态下回显
    const requireInfo = localStorage.getItem("requireInfo");
    if (requireInfo) this.liveData = JSON.parse(requireInfo);
    // const {liveId} = this.$route.query; //编辑状态下回显
    // if(liveId !== undefined) this.getEditInfo(liveId)

    this.init();
    //  console.log(this.direction,'direction')
  },
  methods: {
    init: async function() {
      await this.loadMoudlePic();
    },

    loadMoudlePic: async function() {
      // this.bgImgArrAll = data;
      await this.$post(this.$api.getBgPic).then(res => {
        console.log(res, "res");
        if (res.code === 1) {
          let { landscape, portrait } = res.data;
          this.bgImgArrAll = {
            landscape, //横屏
            portrait //竖屏
          };
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    alertDialog(type) {
      //根据需求弹出对应弹出框
      type === "landscape" ? (this.heng = true) : (this.heng = false);
      this.dialogVisible = true;
      this.checkImg = "";
      this.bgImgArr = this.bgImgArrAll[type];
    },
    sureModelImg() {
      this.dialogVisible = false;
      let img = this.bgImgArr.filter(one => {
        return one.id == this.checkImg;
      });
      console.log(img);
      //设置横屏背景或者竖屏背景

      if (this.heng) {
        this.liveData.landscapeThumb = img[0].url;
      } else {
        this.liveData.portraitThumb = img[0].url;
      }
    },
    pre() {
      this.$emit("requireInfoPreEvent");
    },
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$emit("requireInfoNextEvent");
          localStorage.setItem("requireInfo", JSON.stringify(this.liveData));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    uploadUrl() {
      return process.env.NODE_ENV === "development"
        ? `/Sev${this.$api.upload}`
        : this.$api.upload;
    },
    handleScpreviewThumb(res, file) {
      try {
        this.liveData.previewThumb = file.response.data.url;
      } catch {
        // console.log(file, "file");
      }
    },
    handleScshareImg(res, file) {
      try {
        this.liveData.shareImg = file.response.data.url;
      } catch {
        // console.log( "file");
      }
    },
    async beforeUploadpreviewThumb(file) {
      let cv =this.commonVerify(file)
      if(cv) await  this.validSize(1280, 720, file);
    },
    async beforeUploadshareImg(file) {
     let cv = this.commonVerify(file)
      if(cv) await this.validSize(1080, 1266, file);
    },
    commonVerify(file){
      const isTypeTrue = /^image\/(jpeg|png|jpg)$/.test(file.type);
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
         this.$message({
            message: "图片过大，请重新选择",
            type: "error",
            center:true
          });
        return false
      }
      if (!isTypeTrue) {
        this.$message({
            message: "请上传符合标准的图片",
            type: "error",
            center:true
          });
          return  false
      }
      return true
    },
    validSize(width, height, file) {
      return new Promise((resolve, reject) => {
        const widths = width,
          heights = height;
        const _URL = window.URL || window.webkitURL;
        const img = (this.previewThumb = new Image());
        img.onload = () => {
          const valid = img.width == widths && img.height == heights;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      })
        .then(() => {
          return file;
        })
        .catch(() => {
          this.$message({
            message: "请上传符合标准的图片",
            type: "error",
            center:true
          });
          return Promise.reject();
        });
    },
    initLiveData() {
      let liveD = { ...this.liveData };
      for (let i in liveD) {
        if (i == "id") {
          liveD[i] = "0";
        } else {
          liveD[i] = "";
        }
      }
      this.liveData = liveD;
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    getEditInfo(liveId) {
      this.$post(this.$api.liveDetail, { id: liveId }).then(res => {
        if (res.code === 1) {
          this.liveData = res.data.studio;
          //重制横竖屏信息
          this.liveData.mobileDirection = this.direction == "heng" ? 1 : 2;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    }
  },
  props: {
    direction: {
      type: String,
      default: "heng"
    }
  }
};
</script>
<style lang="less" scoped>
.requireinfo-box {
  width: 80%;
  margin: 0 auto;
}
.requireinfo-form {
  & /deep/ .el-form-item__content {
    margin-left: 10px !important;
    line-height: normal !important;
  }
  & /deep/ .el-input__inner {
    height: 32px;
  }
  & .edit-errorinfo1 /deep/ .el-form-item__error {
    left: 416px;
  }
  & .edit-errorinfo2 /deep/ .el-form-item__error {
    left: 396px;
  }
  & .edit-errorinfo3 /deep/ .el-form-item__error {
    left: 300px;
  }
  & .edit-errorinfo4 /deep/ .el-form-item__error {
    left: 280px;
  }
  .time-picker {
    & /deep/ .el-input__icon {
      line-height: 32px;
    }
    & /deep/ .el-form-item__error {
      left: 240px;
    }
  }
}
.requireinfo-form /deep/ .el-form-item {
  display: flex;
  align-items: center;
}
.requireinfo-form /deep/ .el-form-item__label {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 22px;
}
.requireinfo-form /deep/ .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  width: 150px;
  left: 366px;
  top: 50%;
  transform: translateY(-50%);
}

.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.dashed_line:hover,
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #ff6600;
}
.avatar-uploader_init {
  background: #f6f8fa;
  color: #ccc;
  text-align: center;
  cursor: pointer;
  text-align: center;
  position: relative;
}
.module {
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar-uploader_coverimg {
  width: 128px;
  height: 72px;
}
.avatar-uploader_share {
  width: 108px;
  height: 126px;
}
.avatar-uploader_coverimg1 {
  width: 128px;
  height: 72px;
  line-height: 72px;
}
.avatar-uploader_share1 {
  width: 108px;
  height: 126px;
  line-height: 126px;
}
.border_radio{
  border-radius: 6px;
}
.dashed_line {
  border: 1px dashed #d9d9d9;
}
.require-upload {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ul {
    height: 51px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(185, 185, 185, 1);
    line-height: 17px;
    padding-left: 20px;
    li {
      width: 248px;
    }
  }
  img {
    display: block;
  }
  p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(185, 185, 185, 1);
    line-height: 17px;
    margin-left: 20px;
  }
}
.width-set {
  width: 346px;
  height: 32px;
}
.img-group {
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  .img-item-shu {
    width: 86px;
    height: 152px;
    border-radius: 10px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      display: block;
    }
  }
  .radio {
    margin-top: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    & /deep/ .el-radio__label {
      display: none;
    }
  }
  .img-item-heng {
    width: 132px;
    height: 74px;
    border-radius: 10px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      display: block;
    }
  }
}
.btn-footer {
  width: 168px;
  margin: 52px auto 87px;
  & /deep/ .el-button {
    width: 74px;
    height: 32px;
    padding: 0;
  }
}
.dialog_across {
  & /deep/ .el-dialog {
    box-sizing: border-box;
    padding: 35px 34px 0px;
    width: 850px;
    height: 330px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: relative;
  }
  & /deep/ .el-dialog__body {
    padding: 0px 25px;
  }
  & /deep/ .el-dialog__footer {
    position: absolute;
    bottom: 46px;
    right: 38px;
    padding-bottom: 0px;
  }
}
.dialog {
  & /deep/ .is-checked .el-radio__inner {
    border-color: #fd6721;
    background: url("../../assets/images/minidui.png") no-repeat -1px -1px;
    &::after {
      background: none;
    }
  }
}
.dialog_column {
  & /deep/ .el-dialog {
    width: 777px;
    height: 387px;
    background: rgba(255, 255, 255, 1);
    padding: 22px 50px 44px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  & /deep/ .el-dialog__footer {
    // position: absolute;
    bottom: 44px;
    right: 91px;
    padding: 20px 20px 0px 0px;
    // padding-bottom: 0px;
  }
}
.titles {
  & > span:nth-of-type(1) {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
  & > span:nth-of-type(2) {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
.dialog-footer {
  & /deep/ .el-button {
    width: 74px;
    height: 32px;
    padding: 0px;
  }
}
</style>