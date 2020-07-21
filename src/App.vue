<template>
  <div id="app" class="bg-gray-900 text-gray-500 mt-12 mb-12" style="">
    <div id="header">
      <ref-header />
    </div>
    <router-view></router-view>
    <div id="footer">
      <ref-footer />
    </div>
  </div>
</template>
<style>
.tui-grid-cell-summary{padding:0 !important}
.tui-grid-scrollbar-left-bottom, .tui-grid-scrollbar-right-top, .tui-grid-body-area, .tui-grid-scrollbar-right-bottom, .tui-grid-scrollbar-frozen-border{@apply bg-gray-800 !important}
.tui-grid-container ::-webkit-scrollbar-track {
  @apply bg-gray-800
}
.tui-grid-container ::-webkit-scrollbar-thumb {@apply bg-gray-600 !important; }
.tui-grid-layer-state, th.tui-grid-cell-header, .tui-grid-cell.bg, td.tui-grid-cell-summary {@apply bg-gray-800 border-gray-600 text-gray-300 !important; border:0}
th.tui-grid-cell-selected, td.tui-grid-cell-selected{@apply bg-gray-700 !important}
.tui-page-btn {@apply bg-gray-800 text-gray-300 !important}
.tui-pagination .tui-is-selected, .tui-pagination strong, .tui-pagination .tui-is-selected{@apply border-gray-500;border-left-color:#a0aec0 !important;border-right-color:#a0aec0 !important;border-color:#a0aec0 !important;background:teal !important}
</style>
<script>
import header from '@/components/header.vue'
import footer from '@/components/footer.vue'
export default {
  name: 'app',
  components: {
    'ref-header' : header,
    'ref-footer' : footer,
  },
  methods: {
    go ( targetName) { // 인자값으로 받은 url을 router.push함수에 전달하고 이동됩니다.
      this.$router.push(targetName)
    }
  },
  
}
</script>
<style>
#app{min-height:calc(100vh - 6rem);}
</style>