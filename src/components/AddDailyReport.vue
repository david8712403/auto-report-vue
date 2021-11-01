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
          :disabled="date !== undefined"
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
          >save</a-button
        >
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script>
import { reactive, ref } from "vue";
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  name: "AddDailyReport",
  props: { date: String, content: String },
  data() {
    const formRef = ref();
    const formState = reactive({
      content: this.content ?? "",
      date:
        this.date === undefined
          ? moment(new Date(), "YYYY-MM-DD")
          : moment(this.date),
    });
    const isNewReport = this.content === undefined && this.date === undefined;
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
      loading: false,
      isNewReport,
    };
  },
  methods: {
    ...mapGetters(["header"]),
    onSubmit() {
      this.loading = true;
      this.$refs.formRef
        .validate()
        .then(async () => {
          await axios({
            url: "/api/daily_report",
            method: this.isNewReport ? "put" : "patch",
            headers: this.header(),
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
