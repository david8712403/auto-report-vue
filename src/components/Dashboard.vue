<template>
  <h2>Dashboard</h2>
  <a-table
    :style="{ whiteSpace: 'pre', width: '100%' }"
    :columns="columns"
    :loading="loading"
    :data-source="data"
    :rowKey="(record) => record.userId"
    bordered
  >
    <template #title>
      <strong>Summary</strong>
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
        title: "Date",
        dataIndex: "report.date",
        key: "date",
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
    return {
      userCache: this.cache(),
      data,
      columns,
      loading,
    };
  },
  methods: {
    ...mapActions(["fetchReportSummary"]),
    ...mapGetters(["getReportSummary", "cache"]),
    async updateReportSummary() {
      this.loading = true;
      await this.fetchReportSummary({
        date: moment(new Date()).format("YYYY-MM-DD"),
      });
      this.data = this.getReportSummary();
      this.loading = false;
    },
  },
  created() {
    this.updateReportSummary();
  },
};
</script>

<style></style>
