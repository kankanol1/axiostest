<!---
    Created by kankan on 2019/9/2.
    email: lidainzhong@gl-data.com
-->


<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <br>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <br>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>

  </Form>

</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 3, message: '请核对密码', trigger: 'blur'}
          ]
        },
        loading: false,
      }
    },
    mounted() {
      const CryptoJS = require("crypto-js");
      const plaintText = 'kankan';
      let keyStr = 'lidianzhongzhong';
      const key = CryptoJS.enc.Utf8.parse(keyStr);
      const encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      const encryptedStr = encryptedData.ciphertext.toString();
      const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);
      const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      // eslint-disable-next-line no-unused-vars
      const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$set(this, 'loading', true);
            this.$axios.get('api/login/login.json', {}).then(response => {
              if (response && response.status === 200) {
                const CryptoJS = require("crypto-js");
                const keyStr = 'lidianzhongzhong';
                const key = CryptoJS.enc.Utf8.parse(keyStr);
                const encryptedHexStr = CryptoJS.enc.Hex.parse(response.data.password);
                const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7
                });
                const pw = decryptedData.toString(CryptoJS.enc.Utf8);
                // eslint-disable-next-line no-console
                console.log(pw);
                if (response.data.name === this.formInline.user
                  && pw===this.formInline.password) {
                  this.$set(this, 'loading', false);
                  sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                  sessionStorage.setItem('logout',600000);
                  this.$router.push({name: 'index'});
                  this.$Message.success({
                    content: '登录成功!',
                    duration: 1
                  });
                }else{
                  this.$Message.warning({
                    content: '请核对信息!',
                    duration: 1
                  });
                }
              }
            }).catch(()=>{
              this.$Message.error({
                content: '登录失败!',
                duration: 1
              });
            })
          }
        })
      }
    }
  }


</script>

<style scoped>

</style>
