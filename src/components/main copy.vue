  
<template>
    <div class="mx-3">
        <maincard> <div class="loading"></div> </maincard>
        <grid class="" :data="gridProps.data" :columns="gridProps.columns" :bodyHeight="gridProps.bodyHeight" />
    </div>
</template>
<style>
.tui-grid-filter-list-item label{@apply text-gray-300 bg-blue-800}
.tui-grid-filter-list{border-bottom:0;border-top:0}
.tui-grid-filter-container{@apply bg-blue-800 text-gray-300 border-2 border-gray-100}
.tui-grid-filter-dropdown select, .tui-grid-filter-input{@apply bg-blue-900 text-gray-300 !important}
.tui-grid-filter-comparator span{@apply text-gray-300 !important}
.tui-grid-container ::-webkit-scrollbar-track {
    @apply bg-gray-500
}
.tui-grid-scrollbar-right-bottom{border-top:0px;}
.tui-grid-scrollbar-y-inner-border {@apply bg-gray-600 !important}
.tui-grid-scrollbar-right-top { @apply border-gray-600 !important @apply -mb-px}
.tui-grid-border-line-bottom{border-bottom:0 !important}
.tui-grid-border-line-top{@apply border-t !important border-gray-600 !important}
.tui-grid-container{border:0 !important}
.tui-grid-header-area th{@apply border-b-2 border-gray-600 bg-gray-800 text-gray-300}
.tui-grid-table tr td, .tui-grid-table {
    @apply text-gray-300 border-gray-600 bg-gray-700 border-r
}
.tui-grid-body-area{
    @apply bg-gray-700 !important
}
.tui-grid-body-area{
    @apply bg-gray-700
}
.tui-grid-scrollbar-right-top, .tui-grid-scrollbar-right-bottom{
    @apply bg-gray-800 !important
}
.tui-grid-border-line{
    @apply bg-gray-600 !important
}
.tui-grid-header-area{@apply border-b border-gray-800; border:0}
.tui-grid-cell-selected{@apply border bg-gray-600 !important}
</style>
<script>
import 'tui-grid/dist/tui-grid.css'
import { Grid } from '@toast-ui/vue-grid'
import { maincard } from './template/maincard'


export default {
    components: {
        'grid': Grid,
        'maincard': maincard,
    },
    
    created () {
        let self = this;
        this.gridProps = {
      data: [ // for rowData prop
        {
          name: 'Beautiful Lies',
          artist: 'Birdy',
          
        },
        {
          name: 'X',
          artist: 'Ed Sheeran'
        },{
          name: 'Beautiful Lies',
          artist: 'Birdy'
        },
        {
          name: 'X',
          artist: 'Ed Sheeran'
        },{
          name: 'Beautiful Lies',
          artist: 'Birdy'
        },
        {
          name: 'X',
          artist: 'Ed Sheeran'
        },{
          name: 'Beautiful Lies',
          artist: 'Birdy'
        },
        {
          name: 'X',
          artist: 'Ed Sheeran'
        }
      ],
      columns: [ // for columnData prop
        {
          header: 'Name',
          name: 'name',
          filter: {
            type: 'text',
            operator: 'OR'
          }
        },
        {
          header: 'Artist',
          name: 'artist',
          filter: 'select'
        }
      ],
      bodyHeight: 100,
      scrollY: false,
      scrollX: false,
    };
        fetch('/api/movies')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            self.main = json;
            console.log(self.main)
        });
    },
    data () {
        return {
            main: null
        }
    }
}
</script>