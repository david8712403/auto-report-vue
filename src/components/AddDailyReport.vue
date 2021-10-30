<template>
  <h2>New Report</h2>
  <a-spin :spinning="loading">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="Date" required name="date">
        <a-date-picker
          v-model:value="formState.date"
          :default-value="defDate"
          :disabled="originData"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Report Content">
        <a-textarea
          placeholder="Enter your daily report content"
          v-model:value="formState.content"
          :auto-size="{ minRows: 5, maxRows: 20 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="$router.go(-1)">cancel</a-button>
        <a-button
          type="primary"
          style="margin-left: 10px"
          :disabled="!formState.date"
          @click="onSubmit"
          >{{ reportAction }}</a-button
        >
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script>
import { reactive, ref } from "vue";
import { mapActions } from "vuex";
import moment from "moment";
export default {
  name: "AddDailyReport",
  props: ["action", "origin-data"],
  data() {
    const formRef = ref();
    const formState = reactive({
      content: "",
      date: "",
    });
    formState.content =
      this["origin-data"] === undefined ? "" : this["origin-data"].content;
    const rules = {
      date: [
        {
          required: true,
          message: "Please pick a date",
          trigger: "change",
          type: "object",
        },
      ],
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRef,
      formState,
      rules,
      reportAction: this.action,
      defDate: moment(new Date(), "YYYY-MM-DD"),
      originData: this["origin-data"],
      loading: false,
    };
  },
  methods: {
    ...mapActions(["createReport"]),
    onSubmit() {
      this.loading = true;
      this.$refs.formRef
        .validate()
        .then(async () => {
          await this.createReport({
            method: "put",
            data: {
              content: this.formState.content,
              date: this.formState.date.format("YYYY-MM-DD"),
            },
          });
          this.$router.push("/daily_report");
        })
        .catch((error) => console.log("error", error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style></style>
