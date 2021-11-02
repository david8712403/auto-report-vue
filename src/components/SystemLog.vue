<template>
  <h2>Change Logs</h2>
  <a-list item-layout="horizontal" :data-source="logs">
    <template #renderItem="{ item }">
      <a-list-item :style="{ whiteSpace: 'pre', width: '100%' }">
        <a-list-item-meta :description="item.content">
          <template #title>
            <strong>{{ item.created }}</strong>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import axios from "axios";
export default {
  name: "ChangeLog",
  data() {
    const logs = [];
    let loading = false;
    return {
      logs,
      loading,
    };
  },
  methods: {
    async fetchSystemLog() {
      this.loading = true;
      const res = await axios.get("/api/system/logs");
      this.logs = res.data.results;
      console.log(this.logs);
      this.loading = false;
    },
  },
  created() {
    this.fetchSystemLog();
  },
};
</script>
<style></style>
