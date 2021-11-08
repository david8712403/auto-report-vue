<template>
  <a-modal
    title="Send Slack message"
    :visible="visible"
    :confirm-loading="loading"
    @ok="sendSlackNotify"
    @cancel="$emit('close')"
  >
    <div>將會通知以下成員:</div>
    <div
      v-for="value in summaryData.filter((e) => e.id === undefined)"
      :key="value.id"
    >
      - {{ value.userName }}
    </div>
    <div>(共{{ unsubmitCount }}位成員)</div>
  </a-modal>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "SlackMessageDialog",
  props: {
    visible: Boolean,
    summaryData: Object,
  },
  data() {
    let loading = false;
    return {
      loading,
    };
  },
  methods: {
    ...mapGetters(["header"]),
    async sendSlackNotify() {
      const notifyUsers = this.summaryData
        .filter((e) => e.id === undefined)
        .map(({ userId }) => userId);
      console.log(notifyUsers);
      this.loading = true;
      await axios({
        url: "/api/addon/slack/remind",
        method: "post",
        headers: this.header(),
        data: {
          mentions: notifyUsers,
          message: "提醒{}盡快繳交今日report",
        },
      });
      this.loading = false;
      this.$emit("close");
    },
  },
  computed: {
    unsubmitCount() {
      return this.summaryData.filter((e) => e.id === undefined).length;
    },
  },
};
</script>
<style></style>
