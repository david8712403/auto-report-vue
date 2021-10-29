<template>
  <a-layout
    id="components-layout-demo-responsive"
    :style="{ minHeight: '100vh' }"
  >
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        @select="onItemSelect"
        :default-selected-keys="['dashboard']"
      >
        <a-menu-item key="dashboard">
          <DashboardOutlined />
          <span class="nav-text">Dashboard</span>
        </a-menu-item>
        <a-menu-item key="daily_report">
          <DatabaseOutlined />
          <span class="nav-text">Daily Report</span>
        </a-menu-item>
        <a-button v-on:click="onLogoutClicked" type="primary">
          Logout
        </a-button>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ padding: '0px 24px' }">
        <h1 :style="{ textAlign: 'left', color: '#fff' }">Auto Report</h1>
      </a-layout-header>
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
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { DashboardOutlined, DatabaseOutlined } from "@ant-design/icons-vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    DashboardOutlined,
    DatabaseOutlined,
  },
  methods: {
    ...mapGetters(["cache"]),
    ...mapActions(["logout"]),
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
};
</script>

<style>
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
