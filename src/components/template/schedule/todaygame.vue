<template>
    <div>
      <div class="mx-3 pt-3 overflow-hidden flex justify-end">
        <button class="p-3 bg-teal-700 rounded cursor-pointer hover:text-teal-400 hover:bg-teal-800" v-on:click="$refs.modal.show();GetChart()"> <font-awesome-icon class="" icon="chart-area" /> </button>
      </div>
      <t-modal width = "100%" style="height:100%"
      baseClass = 'z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed w-full' 
      wrapper-class="bg-gray-100 border-gray-400 text-gray-500 rounded shadow-xl flex flex-col w-full rounded"
      overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-gray-900 opacity-75"
      body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow bg-gray-800 rounded h-full"
      footerClass="bg-gray-800 p-3 flex justify-between"
      closeButtonClass = 'absolute top-0 bottom-0 right-0 px-4 py-3'
      closeIconClass = 'fill-current h-6 w-6 absolute top-0 right-0 mr-3 mt-3'
      show
      ref="modal"
      >
        <v-chart ref="BarChart" :options="BarChart" :theme="Theme" autoresize style="width:100%"/>
      </t-modal>
      <div class="pt-5">
        <h2 class="mx-3 bg-teal-800 text-white font-bold rounded-t px-4 py-2"> HOME(홈) </h2>
        <grid class="mx-3" v-if="gridHome" ref="HomeGrid" :data="gridHome.data" :columns="gridHome.columns" :options="gridHome.options" :summary="gridHome.summary" :language="'ko'" />
        <t-table v-if="TotalHome" class="mx-3" style="width:-webkit-fill-available"
          :footerData="TotalHome"
        >
          <template v-slot:tfoot="props">
          <tfoot :class="props.tfootClass">
            <tr :class="[props.trClass, 'bg-gray-200']">
              <td colspan="2" :class="[props.tdClass, 'text-right']"> 
                <strong>Total:</strong>
              </td>
              <td>
                <strong class="text-lg">{{ props.data[3].text }}</strong>
              </td>
            </tr>
          </tfoot>
        </template>
        </t-table>
      </div>
      <div class="pt-5">
        <h2 class="mx-3 bg-teal-800 text-white font-bold rounded-t px-4 py-2"> AWAY(원정) </h2>
        <grid class="mx-3" v-if="gridAway" ref="AwayGrid" :data="gridAway.data" :columns="gridAway.columns" :options="gridAway.options" :summary="gridAway.summary" :language="'ko'"/>
        
      </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/theme/dark';
export default {
  name: 'todaygame',
  props : ['date'],
  components: {
    Grid,
    FontAwesomeIcon,
    'v-chart': ECharts,
  },
  methods : {
    GetChart : function(){
      const HOME = this.$refs.HomeGrid.invoke('getData');
      const AWAY = this.$refs.AwayGrid.invoke('getData');
      //['PTS', 'AST', 'REB', 'STL', 'BLK', 'TOV','FG']
      let PTS = 0;
      let AST = 0;
      let REB = 0;
      let STL = 0;
      let BLK = 0;
      let TOV = 0;
      let FG = 0;
      for (let i = 0; i < HOME.length; i++) {
        const row = this.$refs.HomeGrid.invoke('getRow', i);
        PTS += row.PTS;   
        AST += row.AST;   
        REB += row.REB;   
        BLK += row.BLK;   
        STL += row.STL;   
        TOV += row.TOV;   
        FG += row.FG;   
      }
      let A_PTS = 0;
      let A_AST = 0;
      let A_REB = 0;
      let A_STL = 0;
      let A_BLK = 0;
      let A_TOV = 0;
      let A_FG = 0;
      for (let i = 0; i < AWAY.length; i++) {
        const row = this.$refs.AwayGrid.invoke('getRow', i);
        A_PTS += row.PTS;   
        A_AST += row.AST;   
        A_REB += row.REB;   
        A_BLK += row.BLK;   
        A_STL += row.STL;   
        A_TOV += row.TOV;   
        A_FG += row.FG;   
      }
      this.BarChart.series = [
        {
          name : HOME[0].TEAM,
          type : 'bar',
          data : [PTS, AST, REB, STL, BLK, TOV, FG].reverse(),
        },
        {
          name : AWAY[0].TEAM,
          type : 'bar',
          data : [A_PTS, A_AST, A_REB, A_STL, A_BLK, A_TOV, A_FG].reverse(),
        },
      ];
    }
  },
  mounted () {
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let self = this;
    this.gridHome = {
      data: {
        api: {
          readData: {
            url : () => '/api/todaygame/'+this.date + '?gno=' + this.$route.query.gno + '&HANDA=H' , method : 'GET',
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
      columns: this.columns,
      summary: this.summary,
    };
    this.gridAway = {
      data: {
        api: {
          readData: {
            url : () => '/api/todaygame/'+this.date + '?gno=' + this.$route.query.gno + '&HANDA=A' , method : 'GET',
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
      columns: this.columns,
      summary: this.summary,
    };
    this.BarChart = {
      title: {
        text: '득점 비교',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      legend: {
        data: ['창원 LG 세이커스', '부산 KT 소닉붐']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['PTS', 'AST', 'REB', 'STL', 'BLK', 'TOV','FG'].reverse()
      },
      series: []
    };
  },
  data() {
    const template = function(value) {
      return `<div class="text-center w-full flex items-center border-b border-gray-600 justify-center" style="height:50%"> ${value.avg.toFixed(2)} </div> <div class="text-center w-full flex items-center justify-center" style="height:50%"> ${value.sum} </div>`;
    };
    return {
      Theme : 'dark',
      BarChart : null,
      gridHome : null,
      gridAway : null,
      TotalHome : null,
      TotalAway : null,
      summary : {
        height: 80,
        position: 'bottom', // or 'top'
        columnContent: {
          NAME: {
            template: function() {
              return `<div class="text-center w-full flex items-center border-b justify-center" style="height:50%"> 평균 </div><div class="text-center w-full flex items-center justify-center" style="height:50%"> 합계 </div>` ;
            }
          },
          start: {
            template: function(value) {
              return `<div class="text-center w-full flex items-center border-r h-full justify-center"> ${value.cnt}명 </div>` ;
            }
          },
          Q1: {template},
          Q2 : {template},
          Q3 : {template},
          Q4 : {template},
          EQ1 : {template},
          EQ2 : {template},
          EQ3 : {template},
          EQ4 : {template},
          EQ5 : {template},
          PTS : {template},
          MIN : {template},
          TWOP : {template},
          TWOPA : {template},
          TWOPPERCENT : {template},
          THREEP : {template},
          THREEPA : {template},
          THREEPPERCENT : {template},
          FT : {template},
          FTA : {template},
          FTPERCENT : {template},
          ORB : {template},
          DRB : {template},
          REB : {template},
          AST : {template},
          STL : {template},
          BLK : {template},
          TOV : {template},
          TF : {template},
          PF : {template},
          PP : {template},
        }
      },
      columns : [
        { name: "NAME", header: "name", align: "center", width : 120, className : "bg"},
        { name: "start", header: "start", align: "center", width : 10, className : "bg"},
        { name: "Q1", header: "1Q", align: "center", sortable: true , className : "bg"},
        { name: "Q2", header: "2Q", align: "center", sortable: true , className : "bg"},
        { name: "Q3", header: "3Q", align: "center", sortable: true , className : "bg"},
        { name: "Q4", header: "4Q", align: "center", sortable: true , className : "bg"},
        { name: "EQ1", header: "EQ1", align: "center", sortable: true , className : "bg"},
        { name: "EQ2", header: "EQ2", align: "center", sortable: true , className : "bg"},
        { name: "EQ3", header: "EQ3", align: "center", sortable: true , className : "bg"},
        { name: "EQ4", header: "EQ4", align: "center", sortable: true , className : "bg"},
        { name: "EQ5", header: "EQ5", align: "center", sortable: true , className : "bg"},
        { name: "PTS", header: "PTS", align: "center", sortable: true , className : "bg"},
        { name: "MIN", header: "MIN", align: "center", width: 60, sortable: true  , className : "bg"},
        { name: "TWOP", header: "2P", align: "center", sortable: true , className : "bg"},
        { name: "TWOPA", header: "2PA", align: "center", sortable: true , className : "bg"},
        { name: "TWOPPERCENT", header: "%", align: "center", sortable: true , className : "bg"},
        { name: "THREEP", header: "3P", align: "center", sortable: true , className : "bg"},
        { name: "THREEPA", header: "3PA", align: "center", sortable: true , className : "bg"},
        { name: "THREEPPERCENT", header: "%", align: "center", sortable: true , className : "bg"},
        { name: "FT", header: "FT", align: "center", sortable: true , className : "bg"},
        { name: "FTA", header: "FTA", align: "center", sortable: true , className : "bg"},
        { name: "FTPERCENT", header: "%", align: "center", sortable: true , className : "bg"},
        { name: "ORB", header: "ORB", align: "center", sortable: true , className : "bg"},
        { name: "DRB", header: "DRB", align: "center", sortable: true , className : "bg"},
        { name: "REB", header: "REB", align: "center", sortable: true , className : "bg"},
        { name: "AST", header: "AST", align: "center", sortable: true , className : "bg"},
        { name: "STL", header: "STL", align: "center", sortable: true , className : "bg"},
        { name: "BLK", header: "BLK", align: "center", sortable: true , className : "bg"},
        { name: "TOV", header: "TOV", align: "center", sortable: true , className : "bg"},
        { name: "TF", header: "TF", align: "center", sortable: true , className : "bg"},
        { name: "PF", header: "PF", align: "center", sortable: true , className : "bg"},
        { name: "PP", header: "PP", align: "center", sortable: true , className : "bg"},
        { name: "TEAM", header: "TEAM", align: "center", width : 170, className : "bg"},
      ],
    }
  }
}
</script>