<template>
  <el-form>
    <el-form-item label="账号">
      <el-input v-model.trim="userz.username" disabled />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        ref="password"
        v-model.trim="userz.passwordA"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item label="再次输入密码">
      <el-input
        ref="password"
        v-model.trim="userz.passwordB"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { insertOrUpdateAdmin } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          email: '',
          name: '',
          role: ''
        }
      }
    }
  },
  data() {
    return {
      userz: {
        userid: '',
        username: '',
        passwordA: '',
        passwordB: ''
      }
    }
  },
  mounted() {
    this.userz.userid = this.$store.getters.userid
    this.userz.username = this.$store.getters.username
    console.log('user', this.user)
    console.log('userz', this.userz)
  },
  methods: {
    async submit() {
      if (this.userz.passwordA === this.userz.passwordB) {
        await insertOrUpdateAdmin({ 'id': this.userz.userid, 'code': this.userz.username, 'psd': this.userz.passwordA, 'name': this.user.name }).then(result => {
          console.log('result', result)
          if (result && result.code === 0) {
            this.$message.success('修改成功')
          } else {
            this.$message.warning('保存失败')
          }
        })
      } else {
        this.$message({
          message: '两次输入密码不一致',
          type: 'warning',
          duration: 5 * 1000
        })
      }
    }
  }
}
</script>
