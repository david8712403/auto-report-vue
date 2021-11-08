<template>
  <h2>Dashboard</h2>
  <a-spin :spinning="loading">
    <a-card>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-statistic
            title="Your Submit Status"
            :value="isSubmit ? '🎉 Done' : '👨🏻‍💻 Incomplete'"
          >
          </a-statistic>
          <a-button
            v-if="isSubmit"
            @click="
              $router.push({
                name: 'new_report',
                params: {
                  date: yourReport.date,
                  content: yourReport.content,
                },
              })
            "
            ><EditOutlined />Edit</a-button
          >
          <a-button
            v-if="!isSubmit"
            type="primary"
            @click="
              $router.push({
                name: 'new_report',
              })
            "
            ><SendOutlined />Submit Now</a-button
          >
        </a-col>
        <a-col :span="8">
          <a-statistic title="Submit Progress" :value="submitCount">
            <template #suffix>
              <span>/ {{ memberCount }}</span>
            </template>
          </a-statistic>
          <a-button type="primary" @click="() => (showSlackDialog = true)"
            ><SlackOutlined />Notify members</a-button
          >
        </a-col>
        <a-col :span="8">
          <a-statistic-countdown
            title="Deadline for today's report"
            :value="deadline"
            style="margin-right: 50px"
          />
        </a-col>
      </a-row>
    </a-card>
  </a-spin>
  <br />
  <SlackMessageDialog
    :visible="showSlackDialog"
    :summaryData="data"
    @close="() => (this.showSlackDialog = false)"
  />
  <a-table
    :style="{ whiteSpace: 'pre', width: '100%' }"
    :columns="columns"
    :loading="loading"
    :data-source="data"
    :rowKey="(record) => record.userId"
    bordered
  >
    <template #title>
      <div>
        <strong>Today Summary ({{ today }})</strong>
      </div>
    </template>
    <!-- <template #action="{ record }">
      <template v-if="userCache.id === record.userId">
        <a-button style="margin-bottom: 10px" type="primary">Notify</a-button>
      </template>
    </template> -->
  </a-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import SlackMessageDialog from "../components/SlackMessageDialog.vue";
import {
  SendOutlined,
  EditOutlined,
  SlackOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "Dashboard",
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "Content",
        dataIndex: "content",
        key: "content",
        customRender: (data) => {
          if (data.text) return data.text;
          else return "(未更新)";
        },
      },
      {
        title: "Create Time",
        key: "created",
        dataIndex: "created",
        customRender: (datetime) => {
          if (datetime.text)
            return moment(String(datetime.text)).format("YYYY-MM-DD HH:mm");
          else return "-";
        },
      },
      {
        title: "Update Time",
        key: "updated",
        dataIndex: "updated",
        customRender: (datetime) => {
          if (datetime.text)
            return moment(String(datetime.text)).format("YYYY-MM-DD HH:mm");
          else return "-";
        },
      },
      {
        title: "Action",
        key: "action",
        slots: {
          customRender: "action",
        },
      },
    ];
    let data = [];
    let loading = false;
    let isSubmit = false;
    let showSlackDialog = false;
    let memberCount = 0;
    let submitCount = 0;
    let deadline = new Date();
    deadline.setHours(20);
    deadline.setMinutes(0);
    deadline.setSeconds(0);
    deadline.setMilliseconds(0);
    return {
      userCache: this.cache(),
      today: moment(new Date()).format("YYYY-MM-DD"),
      data,
      columns,
      isSubmit,
      yourReport: undefined,
      loading,
      memberCount,
      submitCount,
      deadline,
      showSlackDialog,
    };
  },
  components: {
    SendOutlined,
    EditOutlined,
    SlackOutlined,
    SlackMessageDialog,
  },
  methods: {
    ...mapActions(["fetchReportSummary"]),
    ...mapGetters(["getReportSummary", "cache", "header"]),
    async updateReportSummary() {
      this.loading = true;
      await this.fetchReportSummary({
        date: this.today,
      });
      this.data = this.getReportSummary();
      this.yourReport = this.data.find((e) => this.cache().id === e.userId);

      console.log(this.yourReport);
      this.isSubmit = this.yourReport && true;
      this.memberCount = this.data.length;
      this.submitCount = this.data.filter((e) => e.id !== undefined).length;
      this.loading = false;
    },
  },
  created() {
    this.updateReportSummary();
  },
};
</script>

<style></style>
