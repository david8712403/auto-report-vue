<template>
  <h2>Daily Report</h2>
  <a-space>
    <a-date-picker :default-value="defDate" @change="onDateChange" />
    <a-button @click="onAddReportClick" type="primary"
      >Add Daily Report</a-button
    >
  </a-space>
  <a-table
    :style="{ whiteSpace: 'pre', width: '100%' }"
    :columns="columns"
    :loading="loading"
    :data-source="data"
    :rowKey="(record) => record.id"
    bordered
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script>
import axios from "axios";
import moment from "moment";
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
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
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
];
export default {
  name: "Dashboard",
  data() {
    return {
      defDate: moment(new Date(), "YYYY-MM-DD"),
      data: [],
      columns,
      loading: false,
    };
  },
  methods: {
    async onDateChange(date) {
      this.loading = true;
      const query = date && {
        startDate: date.format("YYYY-MM-DD"),
        endDate: date.format("YYYY-MM-DD"),
      };
      const res = await axios.get("/api/daily_report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: query,
      });
      this.data = res.data.results;
      this.loading = false;
    },
    onAddReportClick() {
      this.$router.push("/daily_report/new_report");
    },
  },
  created() {
    this.onDateChange(this.defDate);
  },
};
</script>
<style></style>
