<template>
  <a-spin :spinning="states.loading">
    <a-card title="Auto Report Sign Up" :bordered="true">
      <a-form
        ref="formRef"
        name="custom-validation"
        style="margin-bottom: 10px"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="Name" name="name">
          <a-input
            v-model:value="formState.name"
            type="name"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Email" name="email">
          <a-input
            v-model:value="formState.email"
            type="email"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Password" name="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Confirm password" name="checkPass">
          <a-input
            v-model:value="formState.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-button type="primary" html-type="submit">Sign Up</a-button>
      </a-form>
      <a href="/#/login"> Already have account </a>
    </a-card>
  </a-spin>
</template>
<script>
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { reactive, ref } from "vue";
import axios from "axios";
export default {
  name: "SignUpForm",
  setup() {
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({
      name: "",
      email: "",
      password: "",
      checkPass: "",
    });

    const states = reactive({ loading: false });

    let validateRequire = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Can't be empty");
      } else {
        return Promise.resolve();
      }
    };

    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      name: [
        {
          required: true,
          validator: validateRequire,
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          validator: validateRequire,
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          required: true,
          validator: validatePass2,
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 9,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const handleFinish = (values) => {
      console.log("submit");
      console.log(values, formState);
      let signupPayload = { ...values, account: values.email };
      states.loading = true;
      axios
        .post("/auth/sign_up", signupPayload)
        .then(() => {
          notification["success"]({
            message: "Success",
            description: `Account ${signupPayload.account} created!`,
          });
          router.push("login");
        })
        .finally(() => (states.loading = false));
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const handleValidate = (...args) => {
      console.log(args);
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      states,
      handleFinishFailed,
      handleFinish,
      handleValidate,
    };
  },
};
</script>
