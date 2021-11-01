<template>
  <h2>Daily Report</h2>
  <a-space>
    <a-date-picker @change="onDateChange" />
    <a-button
      @click="
        $router.push({
          name: 'new_report',
        })
      "
      type="primary"
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
    <template #action="{ record }">
      <template v-if="userCache.id === record.userId">
        <a-button
          @click="() => onEditClicked(record)"
          style="margin-bottom: 10px"
          type="primary"
          >Edit</a-button
        >
        <br />
        <a-button danger type="primary" @click="() => onDeleteClicked(record)"
          >Delete</a-button
        >
      </template>
    </template>
  </a-table>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

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
    let currentDate = undefined;
    return {
      userCache: this.cache(),
      data,
      columns,
      loading,
      currentDate,
    };
  },
  methods: {
    ...mapActions(["fetchReportList"]),
    ...mapGetters(["getReportList", "cache", "header"]),
    async onDateChange(date) {
      this.currentDate = date;
      this.loading = true;
      const query = date && {
        startDate: date.format("YYYY-MM-DD"),
        endDate: date.format("YYYY-MM-DD"),
      };
      await this.fetchReportList(query);
      this.data = this.getReportList();
      this.loading = false;
    },
    async onEditClicked(originData) {
      this.$router.push({
        name: "new_report",
        params: { date: originData.date, content: originData.content },
      });
    },
    async onDeleteClicked(record) {
      await axios({
        url: "/api/daily_report",
        method: "delete",
        headers: this.header(),
        data: {
          date: record.date,
        },
      });
      this.onDateChange(this.currentDate);
    },
  },
  created() {
    this.onDateChange(this.currentDate);
  },
};
</script>
<style></style>
