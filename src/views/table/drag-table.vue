<template>
  <div
    class="app-container"
  >
    <el-container>
      <el-header style="height: 39px;">

        <div
          class="filter-container"
        >
          <el-input v-model="listQuery.title" placeholder="请输入联系方式.." style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter()" />
          <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
          </el-select>
          <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select> -->
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">
            Search
          </el-button>
          <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            Add
          </el-button> -->
          <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            Export
          </el-button>
          <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
            reviewer
          </el-checkbox> -->
        </div>
      </el-header>
      <el-main style="padding: 0px">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          height="calc(100vh - 220px)"
          @sort-change="sortChange"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            fixed
          />
          <el-table-column
            v-if="false"
            label="ID"
            prop="id"
            sortable="custom"
            align="center"
            width="80"
            :class-name="getSortClass('id')"
          >
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="用户" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
          <el-table-column fixed label="微信用户" prop="id" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="收货用户" prop="id" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="用户" prop="id" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.userId }}</span>
            </template>
          </el-table-column> -->
          <el-table-column fixed label="订单号" width="220px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
            label="productId"
            width="150px"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.productId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单" width="195px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="付费（元）" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.totalFee }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="订单状态"
            width="100"
            filter-placement="bottom-end"
            align="center"
          >
            <!-- :filter-method="filterTag" -->
            <!-- :filters="[{ text: '支付成功', value: '支付成功' }, { text: '超时已关闭', value: '超时已关闭' }]" -->
            <template slot-scope="scope">
              <el-tag
                :type="selectType(scope.row.orderStatus)"
                disable-transitions
              >{{ scope.row.orderStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="服务时间" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.servicetime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" width="195px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" prop="id" align="center" width="270">
            <template slot-scope="{row}">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="支付码" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.codeUrl }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="优惠券" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.coupon?row.coupon:'无' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.note?row.note:'无' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" width="135px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="135px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Title" min-width="150px">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
              <el-tag>{{ row.type | typeFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Author" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
            <template slot-scope="{row}">
              <span style="color:red;">{{ row.reviewer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Imp" width="80px">
            <template slot-scope="{row}">
              <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
            </template>
          </el-table-column>
          <el-table-column label="Readings" align="center" width="95">
            <template slot-scope="{row}">
              <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Status" class-name="status-col" width="100">
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusFilter">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <!-- <template slot-scope="{row,$index}"> -->
            <template slot-scope="{row}">
              <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
                Edit
              </el-button> -->
              <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published',$index)">
                Publish
              </el-button> -->
              <!-- <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
                Draft
              </el-button> -->
              <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                Delete
              </el-button> -->
              <el-button v-if="row.orderStatus === '未支付'" type="text" @click="cancelOrder(row.orderNo)">取消</el-button>
              <el-button v-if="row.orderStatus === '支付成功'" type="text" @click="refundOrder(row.orderNo)">退款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height:auto">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-footer>
    </el-container>

    <!-- 退款对话框 -->
    <el-dialog
      :visible.sync="refundDialogVisible"
      width="350px"
      center
      @close="closeDialog"
    >
      <el-form>
        <el-form-item label="退款原因">
          <el-select v-model="reason" placeholder="请选择退款原因">
            <el-option label="不喜欢" value="不喜欢" />
            <el-option label="买错了" value="买错了" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="refundSubmitBtnDisabled" @click="toRefunds()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog> -->

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { findPage, cancel, refunds } from '@/api/user'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      refundDialogVisible: false, // 退款
      orderNo: '', // 退款订单号
      reason: '', // 退款原因,
      refundSubmitBtnDisabled: false, // 防止重复提交
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        // id: '0ee906682e8f4d3f893eb8932b3f59e7',
        // orderNo: 'ORDER_20220219232848312',
        // createTime: 1645284528000,
        // updateTime: 1645291561000,
        // userId: '2eBH3z8B9XuKCzONuliFSQ==',
        // addressno: '2eBH3z8B9XuKCzONuliFSQ==',
        // codeUrl: 'weixin://wxpay/bizpayurl?pr=2WVEmQdzz',
        // coupon: null,
        // note: null,
        // orderStatus: '支付成功',
        // productId: 'XM3',
        // servicetime: '现在',
        // title: '空调清洗',
        // totalFee: 1

        // id: undefined,
        // importance: 1,
        // remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        // status: 'published'
      },
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      new_order_count: 0
    }
  },
  created() {
    this.getList()

    this.setTiming()
  },
  destroyed() {
    window.clearInterval(this.timed)// 销毁定时任务
  },
  methods: {
    // 设置定时获取列表
    setTiming() {
      this.timed = window.setInterval(() => {
        setTimeout(() => {
          // if(){

          // }
          this.getList()
        }, 2)
      }, 3000)// 3s获取一次
    },
    // 用户取消订单
    async cancelOrder(orderNo) {
      await cancel(orderNo).then(response => {
        this.$message.success(response.message)
        // 刷新订单列表
        this.getList()
      })
    },
    // 退款对话框
    refundOrder(orderNo) {
      this.refundDialogVisible = true
      this.orderNo = orderNo
      this.setTiming()
    },
    // 关闭退款对话框
    closeDialog() {
      console.log('close.................')
      this.refundDialogVisible = false
      // 还原组件状态
      this.orderNo = ''
      this.reason = ''
      this.refundSubmitBtnDisabled = false
    },
    // 确认退款
    async toRefunds() {
      this.refundSubmitBtnDisabled = true // 禁用按钮，防止重复提交
      await refunds(this.orderNo, this.reason).then(result => {
        console.log('result', result)
        if (result && result.code === 0) {
          this.closeDialog()
          this.getList()
          this.$message.success('退款操作成功，退款中...')
        } else {
          this.$message.warning('保存失败')
        }
      })
    },
    async checkRefunds() {
      window.intervalObject()
      setTimeout(() => {
        var that = this
        var pageNum = that.listQuery.page
        var pageSize = that.listQuery.limit
        findPage({ 'pageNum': pageNum, 'pageSize': pageSize }).then((result) => {
          if (result && result.code === 0) {
            console.log(JSON.parse(JSON.stringify(result)))
            that.list = result.data.content
            // that.listQuery.page = result.data.
            // that.listQuery.limit = result.data.
            that.total = result.data.totalSize
          } else {
            that.$message.warning('保存失败')
          }
        })
      }, 1.5 * 100)
    },
    selectType(param) {
      var state = null
      switch (param) {
        case '支付成功':
          state = 'success'
          break
        case '超时已关闭':
          state = 'warning'
          break
        case '用户已取消':
          state = 'info'
          break
        case '退款中':
          state = 'danger'
          break
        case '已退款':
          state = 'info'
          break
        case '未支付':
          state = 'danger'
      }
      return state
    },
    async getList() {
      var that = this
      // that.listLoading = true
      console.log('searchParam=', that.listQuery.title)
      var pageNum = that.listQuery.page
      var pageSize = that.listQuery.limit
      await findPage({ 'pageNum': pageNum, 'pageSize': pageSize, 'searchParam': that.listQuery.title ? that.listQuery.title : '' }).then((result) => {
        if (result && result.code === 0) {
          console.log(JSON.parse(JSON.stringify(result)))
          that.list = result.data.content
          // that.listQuery.page = result.data.
          // that.listQuery.limit = result.data.
          that.total = result.data.totalSize
        } else {
          that.$message.warning('保存失败')
        }
      })
      // that.list = [{ 'id': 1, 'timestamp': 803380321626, 'author': 'Elizabeth', 'reviewer': 'Charles', 'title': 'Phto Umfhyvn Bbpctd Gppelbjobs Huha Cod Qcewjhx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 49.69, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1971-09-25 22:21:09', 'comment_disabled': true, 'pageviews': 4435, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 2, 'timestamp': 203661565471, 'author': 'Jeffrey', 'reviewer': 'Joseph', 'title': 'Liutpj Srzxsyo Qbvto Jrek Ktph Lvxggjitej', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 23.07, 'importance': 2, 'type': 'US', 'status': 'published', 'display_time': '1980-10-01 05:34:34', 'comment_disabled': true, 'pageviews': 4231, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 3, 'timestamp': 1575937832164, 'author': 'Kevin', 'reviewer': 'James', 'title': 'Kesnq Fwmtlufih Qpie Twfm Bkkbzkx Qkct Ljjanvm', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 83.28, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '2019-10-25 20:18:19', 'comment_disabled': true, 'pageviews': 4492, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 4, 'timestamp': 893621388286, 'author': 'Thomas', 'reviewer': 'Brian', 'title': 'Djfbcnvht Twpvmd Qjbw Tvrq Xftjujkf Pomrxapk Mobs Dplr Tfijiamu', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 71.13, 'importance': 2, 'type': 'JP', 'status': 'published', 'display_time': '1974-03-05 12:45:40', 'comment_disabled': true, 'pageviews': 1997, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 5, 'timestamp': 417094195427, 'author': 'Jessica', 'reviewer': 'Ruth', 'title': 'Bxtit Vumcdmvork Dorkn Smunohkhki Qkvqwlk Ptyhgk Krrjend Tlrezmd Byfmeau Qqdfjp', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 54.75, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '1979-11-30 02:01:46', 'comment_disabled': true, 'pageviews': 4501, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 6, 'timestamp': 1301855019498, 'author': 'Jeffrey', 'reviewer': 'Karen', 'title': 'Iksk Fjgpdxwb Fhlw Wdzht Xxyixe Qknrqwtdsv Dqllmsggu Uuauosnld Kwqs Cdld', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 5.47, 'importance': 1, 'type': 'US', 'status': 'draft', 'display_time': '1994-04-13 05:13:29', 'comment_disabled': true, 'pageviews': 2336, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 7, 'timestamp': 1375880283337, 'author': 'Steven', 'reviewer': 'Larry', 'title': 'Uuqjfylfwh Rsfgw Rxwxla Pmom Igrkgu', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 0.95, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1984-12-30 12:27:26', 'comment_disabled': true, 'pageviews': 4354, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 8, 'timestamp': 836327661361, 'author': 'Gary', 'reviewer': 'Daniel', 'title': 'Qplyhouldr Riwike Hcidbmh Jqghzh Fttc Gffgifgdu Dtffwylfw Lhngvk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 74.43, 'importance': 2, 'type': 'CN', 'status': 'draft', 'display_time': '1970-10-10 15:01:51', 'comment_disabled': true, 'pageviews': 540, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 9, 'timestamp': 1249461168915, 'author': 'Carol', 'reviewer': 'Sarah', 'title': 'Yxuorxy Ulfi Pywcfbtlg Mujjwuh Jeoitnx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 66.71, 'importance': 3, 'type': 'US', 'status': 'draft', 'display_time': '1999-08-01 14:59:51', 'comment_disabled': true, 'pageviews': 2206, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 10, 'timestamp': 991010925276, 'author': 'Edward', 'reviewer': 'Lisa', 'title': 'Kxyj Hloyfd Djcq Kxqmdmfdsb Ucixtcx Jngclip', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 72.43, 'importance': 2, 'type': 'CN', 'status': 'draft', 'display_time': '2002-09-07 14:57:22', 'comment_disabled': true, 'pageviews': 4718, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 11, 'timestamp': 1002220180868, 'author': 'Nancy', 'reviewer': 'Sandra', 'title': 'Wgswkyc Lmmtzbeu Jxhs Xvno Ovtnm Otfpumcf Jfqbenvap', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 6.62, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '2018-11-16 10:29:07', 'comment_disabled': true, 'pageviews': 1985, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 12, 'timestamp': 47657650328, 'author': 'Mary', 'reviewer': 'Matthew', 'title': 'Tagjo Veimsieot Pueippd Zkjnqq Tzbv Ttnx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 88.88, 'importance': 2, 'type': 'JP', 'status': 'published', 'display_time': '1979-11-18 03:50:42', 'comment_disabled': true, 'pageviews': 738, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 13, 'timestamp': 436962300263, 'author': 'Brenda', 'reviewer': 'Thomas', 'title': 'Nsdio Ezxcml Ybslm Ufwk Eflmiaozy Edfsugk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 33.72, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1973-09-30 10:38:33', 'comment_disabled': true, 'pageviews': 1552, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 14, 'timestamp': 1211302507717, 'author': 'Dorothy', 'reviewer': 'Jason', 'title': 'Eopryw Yswjcvoub Hoqsh Xdvp Vjsvgtuy Pnpp Jpqoqcs', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 44.42, 'importance': 3, 'type': 'JP', 'status': 'draft', 'display_time': '2001-06-08 08:50:07', 'comment_disabled': true, 'pageviews': 2039, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 15, 'timestamp': 57519122580, 'author': 'Eric', 'reviewer': 'Jeffrey', 'title': 'Jsjneeg Rfcywbt Ennh Cpdvrq Csdnhmxbr Kuwk Rdoghbihs Irccm', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 22.44, 'importance': 2, 'type': 'EU', 'status': 'published', 'display_time': '1990-08-28 20:08:46', 'comment_disabled': true, 'pageviews': 4250, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 16, 'timestamp': 1331305306184, 'author': 'Kimberly', 'reviewer': 'Gary', 'title': 'Cfuqrg Pcdl Epmdpxlodo Jwhjgep Szqnim Ohwltyy Tsrxkuvfy Wbbvk Mcxsyrxd', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 26.03, 'importance': 3, 'type': 'US', 'status': 'published', 'display_time': '2020-10-12 21:44:35', 'comment_disabled': true, 'pageviews': 915, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 17, 'timestamp': 737661074299, 'author': 'Anthony', 'reviewer': 'Scott', 'title': 'Imn Dvmnidlvp Lpylchwui Vtzzbtex Pybogro Ooxhfsozk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 53.16, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '2011-03-15 10:36:47', 'comment_disabled': true, 'pageviews': 4298, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 18, 'timestamp': 111502496706, 'author': 'Jessica', 'reviewer': 'Christopher', 'title': 'Krroywn Syudufqw Gczhbjr Gcrm Wsbr Qxqvnp Dzgi Ekbfls Ycefwpceid Garqgum', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 61.13, 'importance': 3, 'type': 'US', 'status': 'draft', 'display_time': '1970-01-07 21:19:02', 'comment_disabled': true, 'pageviews': 2385, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 19, 'timestamp': 233294636091, 'author': 'Maria', 'reviewer': 'Richard', 'title': 'Ktxhz Kguzcvvfl Zaofe Cyhxxxdb Ddyetbya Pjxd', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 9.55, 'importance': 2, 'type': 'US', 'status': 'published', 'display_time': '1999-05-01 00:13:30', 'comment_disabled': true, 'pageviews': 3531, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 20, 'timestamp': 1518814286075, 'author': 'Carol', 'reviewer': 'Elizabeth', 'title': 'Cgbstrg Sjzchlkd Qqnokrui Scqpp Nmqrqfucow Rhusz Cdeoriql', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 26.67, 'importance': 2, 'type': 'EU', 'status': 'published', 'display_time': '1980-11-22 20:56:47', 'comment_disabled': true, 'pageviews': 2665, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }]
      // that.total = 100

      // Just to simulate the time of the request
      setTimeout(() => {
        that.listLoading = false
      }, 1.5 * 100)
      // fetchList(this.listQuery).then(response => {
      // })
    },
    handleFilter() {
      // 播放提示音
      // var audio = new Audio('/new_order.mp3')
      // audio.play()
      this.timed = null
      this.listLoading = true
      this.listQuery.page = 1
      this.getList()
    },
    // handleModifyStatus(row, status, index) {
    //   this.$message({
    //     message: '操作Success',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: 'Success',
    //     message: 'Delete Successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.list.splice(index, 1)
    // },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped>
.pagination-container {
    margin-top: 16px;
    padding:0;
}
footer.div.pagination-container {
  height: 32;
}
</style>
