<template>
  <h2>Debug</h2>
  <a-textarea
    v-model:value="sql"
    placeholder="SELECT * FROM ..."
    :auto-size="{ minRows: 3, maxRows: 5 }"
  />
  <a-button @click="() => query()">QUERY!!!</a-button>
  <p>count: {{ this.data.length }}</p>
  <a-table
    :style="{ whiteSpace: 'pre', width: '100%' }"
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 1000 }"
    :rowKey="(record) => record.id"
    size="small"
  >
  </a-table>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Debug",
  data() {
    let loading = false;
    let showDialog = false;
    let columns = [];
    let data = [];
    return {
      sql: "",
      columns,
      data,
      loading,
      showDialog,
    };
  },
  methods: {
    ...mapGetters(["header"]),
    query() {
      this.loading = true;
      console.log(this.sql);
      axios({
        url: "/api/system/debug",
        method: "post",
        headers: this.header(),
        data: { sql: this.sql },
      })
        .then((res) => {
          this.columns = [];
          if (res.data.length !== 0) {
            const obj = res.data[0];
            for (let field in obj) {
              this.columns.push({
                title: field,
                dataIndex: field,
                key: field,
              });
            }
          }
          this.data = res.data;
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.loading = false;
  },
};
</script>
<style></style>
