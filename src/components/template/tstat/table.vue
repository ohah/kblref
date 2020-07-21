<template>
    <div class="overflow-hidden block">
      <div class="my-3"> 
        <h2 class="px-3 py-2 font-bold bg-gray-800 border-t border-r border-l border-gray-700"> 누적스탯 </h2>
        <grid v-if="gridProps" ref="tuiGrid" :data="gridProps.data" :columns="gridProps.columns" :options="gridProps.options" :language="'ko'"  />
      </div>
    
    </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
console.log('??');
export default {
  name: 'tstat',
  components: {
    'grid': Grid,
  },
  updated () {    
  },
  created () {
    console.log(this, this.$route.params);
    this.gridProps = {
      data: {
        api: {
          readData: {
            url : () => '/api/pteam/'+ this.$route.params.team , method : 'GET',
          }
        },
        hideLoadingBar: false,
        //initialRequest: false,
      },
      options: {
        columnOptions: {
          frozenCount: 1,
          frozenBorderWidth: 1,
        },
      },
      columns: [
        { name: "TEAM", header: "TEAM", align: "center", width : 150},
        { name: "season", header: "season", align: "center", sortable: true, filter: 'select', width : 100 },
        { name: "spc", header: "spc", align: "center", sortable: true, width:80, filter: 'select'},
        { name: "Q1", header: "1Q", align: "center", sortable: true },
        { name: "Q2", header: "2Q", align: "center", sortable: true },
        { name: "Q3", header: "3Q", align: "center", sortable: true },
        { name: "Q4", header: "4Q", align: "center", sortable: true },
        { name: "EQ1", header: "EQ1", align: "center", sortable: true },
        { name: "EQ2", header: "EQ2", align: "center", sortable: true },
        { name: "EQ3", header: "EQ3", align: "center", sortable: true },
        { name: "EQ4", header: "EQ4", align: "center", sortable: true },
        { name: "EQ5", header: "EQ5", align: "center", sortable: true },
        { name: "PTS", header: "PTS", align: "right", sortable: true, },
        { name: "MIN", header: "MIN", align: "right", sortable: true, width: 60 },
        { name: "TWOP", header: "2P", align: "right", sortable: true, },
        { name: "TWOPA", header: "2PA", align: "right", sortable: true, },
        { name: "TWOPPERCENT", header: "%", align: "right", sortable: true, },
        { name: "THREEP", header: "3P", align: "right", sortable: true, },
        { name: "THREEPA", header: "3PA", align: "right", sortable: true, },
        { name: "THREEPPERCENT", header: "%", align: "right", sortable: true, },
        { name: "FT", header: "FT", align: "right", sortable: true, },
        { name: "FTA", header: "FTA", align: "right", sortable: true, },
        { name: "FTPERCENT", header: "%", align: "right", sortable: true, },
        { name: "ORB", header: "ORB", align: "right", sortable: true, },
        { name: "DRB", header: "DRB", align: "right", sortable: true, },
        { name: "TRB", header: "TRB", align: "right", sortable: true, },
        { name: "REB", header: "REB", align: "right", sortable: true, },
        { name: "AST", header: "AST", align: "right", sortable: true, },
        { name: "STL", header: "STL", align: "right", sortable: true, },
        { name: "BLK", header: "BLK", align: "right", sortable: true, },
        { name: "TOV", header: "TOV", align: "right", sortable: true, },
        { name: "TF", header: "TF", align: "right", sortable: true, },
        { name: "FOUL", header: "FOUL", align: "right", sortable: true, },
        { name: "FB", header: "FB", align: "right", sortable: true, },
        { name: "FB_PTS", header: "FB_PTS", align: "right", sortable: true, },
        { name: "GD", header: "GD", align: "right", sortable: true, },
        { name: "PP", header: "PP", align: "right", sortable: true, },
        { name: "SUB", header: "SUB", align: "right", sortable: true, },
      ]
    }
    /*
    fetch('/api/pteam/'+ this.$route.params.team)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      self.$refs.tuiGrid.invoke("resetData", json.data.contents);
    });  
    */
  },
  mounted () {
  },
  data() {
    return {
      //gridProps: null,
      tuiGrid : null,
      MutilPerson : false,
      url : false,
    }
  },

}

</script>