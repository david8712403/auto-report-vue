<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['dashboard']">
        <a-menu-item key="dashboard">
          <a-icon type="user" />
          <span class="nav-text">Dashboard</span>
        </a-menu-item>
        <a-menu-item key="daily_report">
          <a-icon type="video-camera" />
          <span class="nav-text">Daily Report</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header :style="{ background: '#fff', padding: 0 }" /> -->
      <a-layout-content :style="{ margin: '12x 12px 0' }">
        <div :style="{ padding: '12px', background: '#fff', minHeight: '360px' }">
          Content
        </div>
      </a-layout-content>
      <a-layout-footer style="textalign: center">
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
export default {
  name: "Home",
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
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
</style>
