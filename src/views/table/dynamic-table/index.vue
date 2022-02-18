<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- <el-col :span="4"><div class="grid-content bg-purple" /></el-col> -->
      <el-col :span="24">
        <div class="grid-content bg-purplez">
          <el-table
            v-loading="listLoading"
            :data="tableData"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'lbItem', hasChildren: 'hasChildren'}"
            height="calc(100vh - 150px)"
            highlight-current-row
            :row-class-name="tableRowClassName"
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
              prop="sold"
              label="已售（数量）"
              min-width="90"
              align="center"
            />
            <el-table-column
              label="精选"
              header-align="center"
              align="center"
              min-width="90"
            >
              <template slot-scope="{row,$index}">
                <el-switch
                  v-if="!row.lbItem"
                  v-model="row.ischoice===1?true:false"
                  active-text="是"
                  inactive-text="否"
                  active-color="#5B7BFA"
                  inactive-color="#dadde5"
                  @change="handleChange($index, row)"
                />
                <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              header-align="center"
              align="center"
              min-width="90"
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
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
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
      <!-- <el-col :span="4"><div class="grid-content bg-purple" /></el-col> -->
    </el-row>
    <!-- 编辑添加类别 -->
    <el-dialog
      :title="newTitle"
      :visible.sync="newDialogFormVisible"
      @close="newCoseWin"
    >
      <el-container>
        <el-main>
          <vxe-form
            ref="newRefform"
            title-width="90px"
            size="mini"
            :data="newFormData"
            title-align="right"
          >
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
              title="名称"
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
          </vxe-form>
        </el-main>
        <el-footer style="text-align: center">
          <!-- <el-button @click="reset">重置</el-button> -->
          <el-button
            type="primary"
            @click="newSummit"
          >保存</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
    <!-- 编辑、添加项目 -->
    <el-dialog
      :title="editName"
      :visible.sync="dialogFormVisibleLbXm"
      @close="closeWin"
    >
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
            <!-- v-if="!formData.LB && flag === 'addXm'" -->
            <!--
              v-if="formData.LB && flag === 'addXm'" -->
            <vxe-form-item
              title="类别"
              field="parent"
              span="24"
              :item-render="{}"
              title-overflow
            >
              <template #default="params">
                <el-select
                  v-model="params.data.parent"
                  placeholder="请选择"
                  style="width: 100%"
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
              title="名称"
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
            <vxe-form-item
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
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  />
                </el-upload>
              </template>
            </vxe-form-item>
          </vxe-form>
        </el-main>
        <el-footer style="text-align: center">
          <el-button
            type="primary"
            @click="summit"
          >保存</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { getLb, getLbXms, insertOrUpdateLbItem, insertOrUpdateLb, insertOrUpdateLbItemPic, delLb, delXm, changeIsChoice } from '@/api/user'
import { baseURL } from '/src/settings.js'
export default {
  name: 'InlineEditTable',
  data() {
    return {
      formData: {},
      formRules: {
      },
      tableData: [{}],
      search: '',
      dialogFormVisibleLbXm: false,
      editName: '',
      refform: '',
      rowCopyLb: {},
      rowCopyXm: {},
      imageUrl: '',
      fileList: '',
      flag: null,
      lbDic: [],
      // 分界线
      newTitle: '',
      newDialogFormVisible: false,
      newFormData: {},
      fileEvent: null,
      createId: '',
      exchange: true,
      listLoading: true
    }
  },
  created() {
    this.getLbXms()
    this.getLb()
  },
  methods: {
    handleChange(index, params, value) {
      var that = this
      that.listLoading = true
      params.ischoice = params.ischoice === 1 ? 0 : 1
      changeIsChoice({ 'ischoice': params.ischoice, 'id': params.id }).then(result => {
        if (result && result.code === 0) {
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
          that.refresh()
          // that.$message.success('保存成功')
          that.listLoading = true
        } else {
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
          that.refresh()
          that.$message.warning('变更失败')
          that.listLoading = true
        }
      })
    },
    async getLb() {
      const { data } = await getLb()
      this.lbDic = data
    },
    async getLbXms() {
      this.listLoading = true
      const { data } = await getLbXms()
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 100)
      this.tableData = data
    },
    searchz(param) {
      // var tableDataSearch = []
      // tableDataSearch = this.tableData.map((data) => {
      //   if (data && data.name.includes(param)) {
      //     return data
      //   }
      // })
      // tableDataSearch = tableDataSearch.filter(res => { return res !== 'undefined' })
      // if (tableDataSearch.length > 0) {
      //   this.tableData = tableDataSearch
      // }
    },
    handleEdit(index, row) {
      if (row.lbItem) {
        // 类别
        this.newDialogFormVisible = true
        this.editName = '类别'
        const rowLb = JSON.parse(JSON.stringify(row))
        this.newFormData = rowLb
      } else {
        // 项目
        this.dialogFormVisibleLbXm = true
        this.refform = 'formXm'
        this.editName = '项目'
        this.rowCopyXm = JSON.parse(JSON.stringify(row))
        const rowXm = JSON.parse(JSON.stringify(row))
        this.formData = rowXm
        if (this.formData.picPath) {
          this.imageUrl = baseURL + this.formData.picPath
        } else {
          this.imageUrl = null
        }
      }
    },
    handleDelete(index, row) {
      if (row.lbItem) {
        this.delLb(index, row)
      } else {
        this.delXm(index, row)
      }
    },
    reset() {
      if (this.formData.lbItem) {
        this.formData = JSON.parse(JSON.stringify(this.rowCopyLb))
        this.imageUrl = baseURL + this.formData.picPath
        // this.formData.picName
        // this.formData.picType
      } else {
        this.formData = JSON.parse(JSON.stringify(this.rowCopyXm))
      }
    },
    summit(event) {
      var that = this
      if (that.formData.id === '') {
        // that.formData.parent =
        that.formData.id = that.createId
        console.log('AA', that.formData.id)
        that.formData.create = '1'
        that.$refs['formXm']
          .validate()
          .then(async() => {
            const result = await insertOrUpdateLbItem(that.formData)
            if (result && result.code === 0) {
              that.$message.success('保存成功')
              that.refresh()
            } else {
              that.$message.warning('保存失败')
            }
          })
        // const result = insertOrUpdateLbItem(that.formData)
        // if (result.code === 0) {
        //   // this.imageUrl = baseURL + '/' + result.data
        //   console.log('AA', result)
        //   that.getLbXms()
        //   that.$message.success('保存成功')
        // } else {
        //   that.$message.warning('保存失败')
        // }
      } else {
        that.$refs['formXm']
          .validate()
          .then(async() => {
            const result = await insertOrUpdateLbItem(that.formData)
            if (result && result.code === 0) {
              that.$message.success('保存成功')
              that.refresh()
            } else {
              that.$message.warning('保存失败')
            }
          })
      }
      this.dialogFormVisibleLbXm = false
    },
    async refresh() {
      this.getLbXms()
      this.getLb()
    },
    closeWin() {
      this.dialogFormVisibleLbXm = false
      this.refresh()
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
        LB: false,
        parent: ''
      }
      // 项目
      this.editName = '项目-新增'
      this.imageUrl = ''
      this.flag = 'addXm'
      this.dialogFormVisibleLbXm = true
      this.refform = 'formXm'
    },
    async onChange(event, file, fileList) {
      var that = this
      if (that.formData.id === '') {
        // that.$message.success('添加')
        // that.fileEvent = event
        that.formData.id = 'create'
        const result = await insertOrUpdateLbItemPic(that.formData.id, event)
        if (result.code === 0) {
          console.log('A', result)
          that.imageUrl = baseURL + '/' + result.data.url
          console.log('A' + that.imageUrl)
          that.createId = result.data.id
          console.log('A', that.createId)
          that.formData.id = ''
          // that.$message.success('上传成功')
        } else {
          // that.$message.warning('上传失败')
        }
      } else {
        // that.$message.success('修改')
        const result = await insertOrUpdateLbItemPic(that.formData.id, event)
        if (result.code === 0) {
          console.log('B', result)
          that.imageUrl = baseURL + '/' + result.data.url
          console.log('B' + that.imageUrl)
          that.$message.success('上传成功')
        } else {
          that.$message.warning('上传失败')
        }
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
    },
    // 分界线
    newCoseWin() {
      this.newDialogFormVisible = false
      this.refresh()
    },
    addLb() {
      this.newFormData = {
        id: '',
        code: '',
        name: ''
      }
      this.newTitle = '类别-添加'
      this.newDialogFormVisible = true
    },
    newCloseWin() {
      this.newDialogFormVisible = false
      this.refresh()
    },
    newSummit() {
      var that = this
      that.$refs['newRefform']
        .validate()
        .then(async() => {
          const params = that.newFormData
          params.lbItem = '' // 将子项目置为空字符串，避免请求传对象导致请求失败
          if (params.id === '') {
            const result = await insertOrUpdateLb(params)
            if (result && result.code === 0) {
              that.$message.success('添加成功')
              that.refresh()
              this.newDialogFormVisible = false
            } else {
              that.$message.warning('添加失败')
            }
          } else {
            const result = await insertOrUpdateLb(params)
            if (result && result.code === 0) {
              that.$message.success('保存成功')
              that.refresh()
              this.newDialogFormVisible = false
            } else {
              that.$message.warning('保存失败')
            }
          }
        })
    },
    // 分界线
    async delLb(index, row) {
      var that = this
      that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.delLbz(row)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delLbz(row) {
      var that = this
      delLb({ code: row.code }).then(result => {
        if (result && result.code === 0) {
          that.refresh()
          that.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          that.$message({
            type: 'info',
            message: result.message
          })
        }
      })
    },
    delXmz(row) {
      var that = this
      delXm({ code: row.code }).then(result => {
        if (result && result.code === 0) {
          that.refresh()
          that.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          that.$message({
            type: 'info',
            message: result.message
          })
        }
      })
    },
    async delXm(index, row) {
      var that = this
      that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.delXmz(row)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.lbItem) {
        return 'success-row'
      } else if (row) {
        // return 'warning-row'
      }
      return ''
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
  border-color: #409eff;
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

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
