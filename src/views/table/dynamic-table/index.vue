<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
      <el-col :span="12">
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
              width="180"
            />
            <el-table-column label="操作">
              <!-- <template slot="header" slot-scope="scope">
                搜索：
                <input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                  @keyup.enter="searchz(search)"
                >
              </template> -->
              <template slot-scope="scope">
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
      <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    </el-row>
    <!-- 编辑类别、项目 -->
    <el-dialog :title="editName" :visible.sync="dialogFormVisibleLbXm">
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
            <vxe-form-item
              v-if="false"
              title="id"
              field="id"
              span="24"
              :item-render="{}"
              title-overflow="title"
            >
              <template #default="params">
                <vxe-input
                  v-model="params.data.id"
                  placeholder="请输入姓名"
                  clearable
                />
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
import { getLbXms, insertOrUpdateLbItem, insertOrUpdateLb } from '@/api/user'
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
      refform: ''
    }
  },
  created() {
    this.getLbXms()
  },
  methods: {
    async getLbXms() {
      const { data } = await getLbXms()
      console.log('data===', data)
      this.tableData = data
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
        this.formData = row
      } else {
        // 项目
        this.refform = 'formXm'
        this.editName = '项目'
        row.LB = false
        this.formData = row
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    reset() {
      // this.formData.psd = ''
      // this.formData.psdC = ''
    },
    summit() {
      var that = this
      console.log('保存类别', that.formData)
      if (that.formData.LB) {
        that.$refs['formLb']
          .validate()
          .then(async() => {
            that.formData.lbItem = ''
            console.log('保存类别', that.formData)
            const { data } = await insertOrUpdateLb(that.formData)
            console.log(data)
            // var param = {}
            // param = {
            //   yhgl: that.formData.LB, // 用户管理
            //   action: that.formData.action, // edit
            //   uname: that.formData.UNAME,
            //   username: that.formData.UPCODE,
            //   // psdo: that.formData.psdO,
            //   psd: that.formData.psd,
            //   mobile: that.formData.MOBILE
            // }
            // var res = await changePsd(param)
            // that.$emit('fetch-data')
            // that.$emit('changeDialog', false)
            // if (res.data === true) {
            //   this.$message.success(res.msg)
            // } else {
            //   this.$message.warning(res.msg)
            // }
          })
      } else {
        that.$refs['formXm']
          .validate()
          .then(async() => {
            console.log('保存项目', that.formData)
            const { data } = await insertOrUpdateLbItem(that.formData)
            console.log(data)
            // var param = {}
            // param = {
            //   yhgl: that.formData.LB, // 修改密码（个人）
            //   username: that.username,
            //   psd: that.formData.psd
            // }
            // var res = await changePsd(param)
            // that.$emit('fetch-data')
            // that.$emit('changeDialog', false)
            // if (res.data === true) {
            //   this.$message.success(res.msg)
            // } else {
            //   this.$message.warning(res.msg)
            // }
          })
      }
      that.dialogFormVisibleLbXm = false
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
</style>
