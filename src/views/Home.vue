<template>
  <a-layout
    id="components-layout-demo-responsive"
    :style="{ minHeight: '100vh' }"
  >
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
      <div :style="{ textAlign: 'right', padding: '20px' }">
        <menu-unfold-outlined
          style="color: #fff"
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          style="color: #fff"
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        @select="onItemSelect"
        :default-selected-keys="['dashboard']"
      >
        <a-menu-item key="dashboard">
          <DashboardOutlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="daily_report">
          <DatabaseOutlined />
          <span>Daily Report</span>
        </a-menu-item>
        <a-menu-item key="setting">
          <SettingOutlined />
          <span>Setting</span>
        </a-menu-item>
        <a-menu-item key="change_log">
          <PullRequestOutlined />
          <span>Change Log</span>
        </a-menu-item>
        <a-divider />
        <a-menu-item @click="onLogoutClicked">
          <LogoutOutlined />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header :style="{ padding: '0px 24px' }"> </a-layout-header> -->
      <a-layout-content :style="{ margin: '12x 12px 0' }">
        <div id="body" :style="{ padding: '24px', background: '#fff' }">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        <div>Auto Report ©2021 Created by David Chen</div>
        <div>
          有任何關於功能的建議或問題，歡迎透過
          <a href="https://github.com/david8712403/auto-report-vue"
            >GitHub issue</a
          >
          回報
        </div>
        <strong>
          Visit count: {{ this.statisticData.visitCount }} | Login count:
          {{ this.statisticData.loginCount }} | Report count:
          {{ this.statisticData.reportCount }}
        </strong>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PullRequestOutlined,
} from "@ant-design/icons-vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    DashboardOutlined,
    DatabaseOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PullRequestOutlined,
  },
  data() {
    let collapsed = false;
    let loading = true;
    let statisticData = {};
    return {
      collapsed,
      loading,
      statisticData,
    };
  },
  methods: {
    ...mapGetters(["cache", "getStatisticData"]),
    ...mapActions(["logout", "fetchStatisticData"]),
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    onItemSelect(e) {
      const route = e.key;
      if (this.$route.path !== route) this.$router.push(`/${route}`);
    },
    async onLogoutClicked() {
      await this.logout({ token: this.cache().refreshToken });
      this.$router.push("/login");
    },
  },
  created() {
    this.loading = true;
    this.fetchStatisticData()
      .then(() => {
        this.statisticData = this.getStatisticData();
        console.log(this.statisticData);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#body {
  text-align: left;
  justify-content: left;
}
</style>
