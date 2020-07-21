<template>
    <div class="overflow-hidden block">
      <div class="my-3"> 
        <h2 class="font-bold bg-gray-800 border-t border-r border-l border-gray-700 flex no-select divide-x divide-gray-500 select-none"> 
          <div class="w-1/3 px-3 py-2 text-center cursor-pointer hover:bg-gray-900"> 누적스탯 </div>
          <div class="w-1/3 px-3 py-2 text-center cursor-pointer hover:bg-gray-900"> 평균스탯 </div>
          <div class="w-1/3 px-3 py-2 text-center cursor-pointer hover:bg-gray-900"> 2차스탯 </div>
        </h2>
      <grid v-if="gridProps" ref="tuiGrid" :data="gridProps.data" :columns="gridProps.columns" :options="gridProps.options" :language="'ko'" @onGridUpdated="getData"/>
      </div>
      <v-chart ref="Linechart" :options="LineChart" :theme="Theme" autoresize style="width:100%"/>
      <v-chart v-if="pieChart" ref="ShotRatio" :options="pieChart" :theme="Theme" autoresize style="width:50%"/>
    </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie'
//import { Dark } from 'echarts/theme/dark.js';
import 'echarts/theme/dark';
export default {
  name: 'pstat',
  components: {
    'grid': Grid,
    'v-chart': ECharts
  },
  methods : {
    getData : async function(){
      console.log('?');
      var data = this.$refs.tuiGrid.invoke('getData');
      var columns = this.$refs.tuiGrid.invoke('getColumns');
      if(await data.length == 0){
        data = this.$refs.tuiGrid.invoke('getData');
      }
      var legend = [];
      var xAxisdata = [];
      var series = [];
      var seriesdata = {};
      var ShotRatio = {PP : 0, TWOP : 0, THREEP : 0};
      columns.forEach(col => {
        // eslint-disable-next-line no-empty
        if(col.name == "TEAM" || col.name == "season") {return false;}
        legend.push(col.name);
      });
      seriesdata = Object.assign({},...legend.map(key => ({[key]: {name: key, type: 'line', data: []} })));
      data.forEach(value => {
        xAxisdata.push(value.season);
        seriesdata.AST.data.push(value.AST);
        seriesdata.BLK.data.push(value.BLK);
        seriesdata.DK.data.push(value.DK);
        seriesdata.DRB.data.push(value.DRB);
        seriesdata.FT.data.push(value.FT);
        seriesdata.FTA.data.push(value.FTA);
        seriesdata.FTPERCENT.data.push(value.FTPERCENT);
        seriesdata.G.data.push(value.G);
        seriesdata.MIN.data.push(value.MIN);
        seriesdata.ORB.data.push(value.ORB);
        seriesdata.PF.data.push(value.PF);
        seriesdata.PP.data.push(value.PP);
        seriesdata.PTS.data.push(value.PTS);
        seriesdata.REB.data.push(value.REB);
        seriesdata.STL.data.push(value.STL);
        seriesdata.THREEPA.data.push(value.THREEPA);
        seriesdata.THREEPPERCENT.data.push(value.THREEPPERCENT);
        seriesdata.TOV.data.push(value.TOV);
        seriesdata.TWOP.data.push(value.TWOP);
        seriesdata.TWOPA.data.push(value.TWOPA);
        seriesdata.TWOPPERCENT.data.push(value.TWOPPERCENT);
        seriesdata.start.data.push(value.start);
        seriesdata.wFT.data.push(value.wFT);
        seriesdata.woFT.data.push(value.woFT);
        ShotRatio.PP += value.PP/2;
        ShotRatio.TWOP += value.TWOP;
        ShotRatio.THREEP += value.THREEP;
      });
      series = [
        seriesdata.AST,
        seriesdata.BLK,
        seriesdata.DK,
        seriesdata.DRB,
        seriesdata.FT,
        seriesdata.FTA,
        seriesdata.FTPERCENT,
        seriesdata.G,
        seriesdata.MIN,
        seriesdata.ORB,
        seriesdata.PF,
        seriesdata.PP,
        seriesdata.PTS,
        seriesdata.REB,
        seriesdata.STL,
        seriesdata.THREEPA,
        seriesdata.THREEPPERCENT,
        seriesdata.TOV,
        seriesdata.TWOP,
        seriesdata.TWOPA,
        seriesdata.TWOPPERCENT,
        seriesdata.start,
        seriesdata.wFT,
        seriesdata.woFT,
      ]
      delete series.season;
      delete series.TEAM;
      this.LineChart = {
        title: {
            text: '시즌별 스탯',
            left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend,
          bottom :"bottom"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {'title' : '이미지 저장'},
            dataZoom : {title: '확대'},
          }
        },
        dataZoom: [{
          type: 'inside',
          throttle: 50
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisdata
        },
        yAxis: {
            type: 'value'
        },
        series: series,
      };
      this.pieChart = {
        title: {
            text: '슛 비율',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                data: [
                    {value: ShotRatio.PP, name: '페인트존'},
                    {value: ShotRatio.TWOP, name: '2점'},
                    {value: ShotRatio.THREEP, name: '3점'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
    },
  },
  props: ['season', 'name', 'pcode',],
  data() {
    return {
      //gridProps: null,
      Theme : 'dark',
      url : false,
      pieChart : null,
      LineChart : null,
    }
  },
  beforeRouteUpdate (to, from, next) {
    if(!to.params.season) to.params.season = "정규시즌";
    //console.log('정말 행복 한거니', this.$route.params);
    let self = this;
    const name = to.params.name;
    const season = to.params.season;
    let url = '/api/player/pstat/' + name + '/' + season;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      next();
      self.$refs.tuiGrid.invoke("resetData", json.data.contents);
    });
  },
  updated () {    
    /*
    let self = this;
      fetch("../../static/goal_attempts.json")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then(function(data) {
          console.log("hello?", data[1]);
          self.doesitwork = data;
          self.positionX = map(data, "position_x");
          self.positionY = map(data, "position_y");
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
    */
  },
  created () {
    if(!this.$route.params) this.$route.params.season = "정규시즌";
    //console.log('정말 행복 한거니', this.$route.params);
    const name = this.name;
    const season = this.season;
    let url = '/api/player/pstat/' + name + '/' + season;
    this.gridProps = {
      data: {
        api: {
          readData: {
            url : () => url, method : 'GET',
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
        { name: "season", header: "season", align: "center", sortable: true , className : "bg"},
        //{ name: "No", header: "No", align: "center", sortable: true , className : "bg"},
        //{ name: "NAME", header: "name", align: "left", sortable: true , className : "bg"},
        { name: "start", header: "start", align: "center", sortable: true , className : "bg"},
        //{ name: "pcode", header: "pcode", align: "center", sortable: true , className : "bg"},
        { name: "G", header: "G", align: "center", sortable: true , className : "bg"},
        { name: "MIN", header: "MIN", align: "right", sortable: true, width: 60 , className : "bg"},
        { name: "TWOP", header: "2P", align: "right", sortable: true , className : "bg"},
        { name: "TWOPA", header: "2PA", align: "right", sortable: true , className : "bg"},
        { name: "TWOPPERCENT", header: "%", align: "right", sortable: true , className : "bg"},
        { name: "THREEP", header: "3P", align: "right", sortable: true , className : "bg"},
        { name: "THREEPA", header: "3PA", align: "right", sortable: true , className : "bg"},
        { name: "THREEPPERCENT", header: "%", align: "right", sortable: true , className : "bg"},
        { name: "FT", header: "FT", align: "right", sortable: true , className : "bg"},
        { name: "FTA", header: "FTA", align: "right", sortable: true , className : "bg"},
        { name: "FTPERCENT", header: "%", align: "right", sortable: true , className : "bg"},
        { name: "ORB", header: "ORB", align: "right", sortable: true , className : "bg"},
        { name: "DRB", header: "DRB", align: "right", sortable: true , className : "bg"},
        { name: "REB", header: "REB", align: "right", sortable: true , className : "bg"},
        { name: "AST", header: "AST", align: "right", sortable: true , className : "bg"},
        { name: "wFT", header: "wFT", align: "right", sortable: true , className : "bg"},
        { name: "woFT", header: "woFT", align: "right", sortable: true , className : "bg"},
        { name: "STL", header: "STL", align: "right", sortable: true , className : "bg"},
        { name: "BLK", header: "BLK", align: "right", sortable: true , className : "bg"},
        { name: "TOV", header: "TOV", align: "right", sortable: true , className : "bg"},
        { name: "DK", header: "DK", align: "right", sortable: true , className : "bg"},
        { name: "PTS", header: "PTS", align: "right", sortable: true , className : "bg"},
        { name: "PP", header: "PP", align: "right", sortable: true , className : "bg"},
        { name: "PF", header: "PF", align: "right", sortable: true , className : "bg"},
        { name: "TEAM", header: "TEAM", align: "center", sortable: true, width : 150, className : "bg"},
      ]
    }
  },
  mounted () {
    console.log(this.$route.params);
  },
}

</script>