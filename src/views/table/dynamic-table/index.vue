<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
      <el-col :span="8">
        <div class="grid-content bg-purplez">
          <el-table
            :data="tableData"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'lbItem', hasChildren: 'hasChildren'}"
            height="calc(100vh - 150px)"
          >
            <!-- <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180"
            /> -->
            <el-table-column
              prop="name"
              label="类别/名称"
              min-width="180"
              header-align="center"
            >
              <template slot="header">
                类别
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  @click="addLb()"
                >添加</el-button>
                / 项目
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  @click="addXm()"
                >添加</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              header-align="center"
              align="center"
            >
              <!-- <template slot="header" slot-scope="scope">
                搜索：
                <input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                  @keyup.enter="searchz(search)"
                >
              </template> -->
              <template
                slot-scope="scope"
              >
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
    </el-row>
    <!-- 编辑类别、项目 -->
    <el-dialog :title="editName" :visible.sync="dialogFormVisibleLbXm" @close="closeWin">
      <el-container>
        <el-main>
          <vxe-form
            :ref="refform"
            title-width="90px"
            size="mini"
            :data="formData"
            :rules="formRules"
            title-align="right"
          >
            <!-- v-if="!formData.LB && flag === 'addXm'" -->
            <vxe-form-item
              v-if="editName === '项目-新增'"
              title="类别"
              field="sex"
              span="24"
              :item-render="{}"
              title-overflow
            >
              <template #default="params">
                <el-select
                  v-model="params.data.parent"
                  v-bind="params.data.parent"
                  placeholder="请选择"
                  style="width: 100%"
                  v-on="params.data.parent"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in lbDic"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="false"
              title="编码"
              field="code"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.code"
                  placeholder="请输入编码"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="true"
              title="类名"
              field="name"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.name"
                  placeholder="请输入类名"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="价格"
              field="price"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.price"
                  placeholder="请输入价格"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="单位"
              field="unit"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.unit"
                  placeholder="请输入单位"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="服务期限"
              field="fwqx"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.fwqx"
                  placeholder="请输入服务期限"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="服务限制"
              field="fwxz"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.fwxz"
                  placeholder="请输入服务限制"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="服务细节"
              field="fwxj"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.fwxj"
                  placeholder="请输入服务细节"
                  clearable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="!formData.LB"
              title="服务保证"
              field="fwbz"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.fwbz"
                  placeholder="请输入服务保证"
                  clearable
                />
              </template>
            </vxe-form-item>
            <!-- <vxe-form-item
              title="新密码"
              field="psd"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.psd"
                  placeholder="请输入密码"
                  clearable
                  type="password"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              title="确认密码"
              field="psdC"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.psdC"
                  placeholder="请输入密码"
                  clearable
                  type="password"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              v-if="formData.LB"
              title="电话"
              field="MOBILE"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.MOBILE"
                  placeholder="请输入电话"
                  clearable
                />
              </template>
            </vxe-form-item>
          </vxe-form> -->
            <vxe-form-item
              v-if="!formData.LB"
              title="示例图片"
              field="MOBILE"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <!-- <template #default="params"> -->
              <template #default>
                <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  action=""
                  :auto-upload="false"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-change="onChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </template>
            </vxe-form-item>
          </vxe-form></el-main>
        <el-footer style="text-align: center">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="summit">保存</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
// @import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
import { getLb, getLbXms, insertOrUpdateLbItem, insertOrUpdateLb, insertOrUpdateLbItemPic } from '@/api/user'
import { baseURL } from '/src/settings.js'
export default {
  name: 'InlineEditTable',
  data() {
    // const validatePassword = (rule) => {
    //   if (rule.itemValue === '') {
    //     return new Error('请输入密码')
    //   }
    //   if (rule.itemValue !== this.formData.psd) {
    //     return new Error('两次输入的密码不一致')
    //   }
    // }
    return {
      // formData: {
      //   // psdO: '', // 旧密码
      //   psd: '', // 新密码
      //   psdC: '', // 确认密码
      //   LB: false
      // },
      formData: {},
      formRules: {
        // UNAME: [{ required: true, message: '请输入姓名' }],
        // UPCODE: [{ required: true, message: '请输入账号' }],
        // psd: [
        //   { required: true, message: '请输入密码' },
        //   { min: 6, message: '密码不能少于6位' }
        // ]
        // psdC: [
        //   {
        //     required: true,
        //     validator: validatePassword
        //   },
        //   { min: 6, message: '密码不能少于6位' }
        // ]
      },
      tableData: [{}],
      // tableData: [{
      //   id: 3,
      //   code: 'A',
      //   name: '王小虎1',
      //   lbItem: [{
      //     id: 31,
      //     code: 'AA',
      //     name: '王小虎2',
      //     price: 158,
      //     unit: '次',
      //     sold: 0,
      //     fwqx: '',
      //     fwxz: '',
      //     fwxj: '',
      //     fwbz: ''
      //   }, {
      //     id: 32,
      //     code: 'AA',
      //     name: '张三',
      //     price: 158,
      //     unit: '次',
      //     sold: 0,
      //     fwqx: '',
      //     fwxz: '',
      //     fwxj: '',
      //     fwbz: ''
      //   }]
      // }],
      search: '',
      dialogFormVisibleLbXm: false,
      editName: '',
      refform: '',
      rowCopyLb: {},
      rowCopyXm: {},
      imageUrl: '',
      fileList: '',
      flag: null,
      lbDic: []
    }
  },
  created() {
    this.getLbXms()
    this.getLb()
  },
  methods: {
    async getLb() {
      const { data } = await getLb()
      console.log('data===', data)
      this.tableData = data
    },
    async getLbXms() {
      const { data } = await getLbXms()
      console.log('data===', data)
      this.lbDic = data
    },
    searchz(param) {
      console.log('param', param)
      // var tableDataSearch = []
      // tableDataSearch = this.tableData.map((data) => {
      //   if (data && data.name.includes(param)) {
      //     console.log('param包含：', data)
      //     return data
      //   }
      // })
      // tableDataSearch = tableDataSearch.filter(res => { return res !== 'undefined' })
      // if (tableDataSearch.length > 0) {
      //   console.log('tableDataSearch', tableDataSearch)
      //   this.tableData = tableDataSearch
      // }
    },
    handleEdit(index, row) {
      this.dialogFormVisibleLbXm = true
      if (row.lbItem) {
        // 类别
        this.refform = 'formLb'
        this.editName = '类别'
        row.LB = true
        this.rowCopyLb = JSON.parse(JSON.stringify(row))
        const rowLb = JSON.parse(JSON.stringify(row))
        this.formData = rowLb
      } else {
        // 项目
        this.refform = 'formXm'
        this.editName = '项目'
        row.LB = false
        this.rowCopyXm = JSON.parse(JSON.stringify(row))
        const rowXm = JSON.parse(JSON.stringify(row))
        this.formData = rowXm
        console.log(this.formData.picPath)
        if (this.formData.picPath) {
          this.imageUrl = baseURL + this.formData.picPath
        } else {
          this.imageUrl = null
        }
        console.log(this.imageUrl)
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    reset() {
      if (this.formData.lbItem) {
        this.formData = JSON.parse(JSON.stringify(this.rowCopyLb))
        // this.formData.picName
        this.imageUrl = baseURL + this.formData.picPath
        // this.formData.picType
      } else {
        this.formData = JSON.parse(JSON.stringify(this.rowCopyXm))
      }
    },
    summit() {
      var that = this
      if (that.flag) {
        if (that.flag === 'addLb') {
          that.$refs['formLb']
            .validate()
            .then(async() => {
              const params = that.formData
              params.lbItem = ''
              params.id = ''
              console.log('保存类别', params)
              const result = await insertOrUpdateLb(params)
              if (result && result.code === 0) {
                that.$message.success('保存成功')
                that.refresh()
                console.log(result)
              } else {
                that.$message.success('保存失败')
              }
            })
        }
        if (that.flag === 'addXm') {
          that.$refs['formXm']
            .validate()
            .then(async() => {
              console.log('保存项目', that.formData)
              that.formData.id = ''
              const result = await insertOrUpdateLbItem(that.formData)
              if (result && result.code === 0) {
                that.$message.success('保存成功')
                that.refresh()
                console.log(result)
              } else {
                that.$message.success('保存失败')
              }
            })
        }
      } else {
        console.log('保存类别', that.formData)
        if (that.formData.LB) {
          that.$refs['formLb']
            .validate()
            .then(async() => {
              const params = that.formData
              params.lbItem = ''
              console.log('保存类别', params)
              const result = await insertOrUpdateLb(params)
              if (result && result.code === 0) {
                that.$message.success('保存成功')
                that.refresh()
                console.log(result)
              } else {
                that.$message.success('保存失败')
              }
            })
        } else {
          that.$refs['formXm']
            .validate()
            .then(async() => {
              console.log('保存项目', that.formData)
              const result = await insertOrUpdateLbItem(that.formData)
              if (result && result.code === 0) {
                that.$message.success('保存成功')
                that.refresh()
                console.log(result)
              } else {
                that.$message.success('保存失败')
              }
            })
        }
      }
      that.dialogFormVisibleLbXm = false
      that.flag = null
    },
    refresh() {
      this.getLbXms()
    },
    closeWin() {
      this.dialogFormVisibleLbXm = false
    },
    addLb() {
      this.formData = {
        id: '',
        code: '',
        name: '',
        LB: true
      }
      // 项目
      this.editName = '类别-新增'
      this.flag = 'addLb'
      this.imageUrl = ''
      this.dialogFormVisibleLbXm = true
      this.refform = 'formLb'
      // this.summit('addLb')
    },
    addXm() {
      this.formData = {
        id: '',
        code: '',
        name: '',
        price: '',
        unit: '',
        sold: '',
        fwqx: '',
        fwxz: '',
        fwxj: '',
        fwbz: '',
        picName: '',
        picPath: '',
        picType: '',
        LB: false
      }
      // 项目
      this.editName = '项目-新增'
      this.flag = 'addXm'
      this.imageUrl = ''
      this.dialogFormVisibleLbXm = true
      this.refform = 'formXm'
      // this.summit('addXm')
    },
    async onChange(event, file, fileList) {
      const result = await insertOrUpdateLbItemPic(this.formData.id, event)
      if (result.code === 0) {
        this.imageUrl = baseURL + '/' + result.data
        this.getLbXms()
        this.$message.success('上传成功')
      } else {
        this.$message.warning('上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp'
      // const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return isJPG
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purplez {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: calc(100vh - 150px);
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
