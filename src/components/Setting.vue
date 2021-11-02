<template>
  <h2>Setting</h2>
  <a-button @click="() => (showDialog = true)">Reset Password</a-button>
  <!-- <a-card :loading="loading" size="small" title="Profile">
    <p>test</p>
  </a-card> -->
  <a-modal
    v-model:visible="showDialog"
    title="Reset Password"
    @ok="resetPassword"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item required label="Old password">
          <a-input type="password" v-model:value="formState.oldPassword" />
        </a-form-item>
        <a-form-item required label="New password">
          <a-input type="password" v-model:value="formState.newPassword" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { reactive, ref } from "vue";
import { mapGetters } from "vuex";
import { notification } from "ant-design-vue";
import axios from "axios";
export default {
  data() {
    const formRef = ref();
    const formState = reactive({
      oldPassword: undefined,
      newPassword: undefined,
    });
    let loading = false;
    let showDialog = false;
    return {
      formRef,
      formState,
      loading,
      showDialog,
    };
  },
  methods: {
    ...mapGetters(["header"]),
    resetPassword() {
      this.loading = true;
      axios({
        url: "/auth/reset_password",
        method: "post",
        headers: this.header(),
        data: this.formState,
      })
        .then(() => {
          notification["success"]({
            message: "Reset password",
            description: "Reset password success",
          });
          this.showDialog = false;
        })
        .finally(() => {
          this.loading = false;
          this.formState.oldPassword = "";
          this.formState.newPassword = "";
        });
    },
  },
  created() {
    this.loading = false;
  },
};
</script>
<style></style>
