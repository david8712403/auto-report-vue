<template>
  <h2>Dashboard</h2>
  <a-card>
    <a-row :gutter="16">
      <a-col :span="3">
        <a-statistic title="Submit Progress" :value="submitCount">
          <template #suffix>
            <span>/ {{ memberCount }}</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="6">
        <a-statistic-countdown
          title="Deadline for today's report"
          :value="deadline"
          style="margin-right: 50px"
          @finish="onCountDownFinish"
        />
      </a-col>
    </a-row>
  </a-card>
  <br />
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
        dataIndex: "report.content",
        key: "content",
        customRender: (data) => {
          if (data.text) return data.text;
          else return "(未更新)";
        },
      },
      {
        title: "Create Time",
        key: "created",
        dataIndex: "report.created",
        customRender: (datetime) => {
          if (datetime.text)
            return moment(String(datetime.text)).format("YYYY-MM-DD HH:mm");
          else return "-";
        },
      },
      {
        title: "Update Time",
        key: "updated",
        dataIndex: "report.updated",
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
      loading,
      memberCount,
      submitCount,
      deadline,
    };
  },
  methods: {
    ...mapActions(["fetchReportSummary"]),
    ...mapGetters(["getReportSummary", "cache"]),
    async updateReportSummary() {
      this.loading = true;
      await this.fetchReportSummary({
        date: this.today,
      });
      this.data = this.getReportSummary();
      this.memberCount = this.data.length;
      this.submitCount = this.data.filter((e) => e.report !== undefined).length;
      this.loading = false;
    },
  },
  created() {
    this.updateReportSummary();
  },
};
</script>

<style></style>
