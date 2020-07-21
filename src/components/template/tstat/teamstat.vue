<template>
    <div class="p-3">
      <div class="md:flex mb-5">
        <select v-model="tableState.season" @change="season" class="w-full md:w-1/3 py-2 px-3 md:mx-2 my-1 md:my-0 rounded border-2 bg-gray-800 focus:bg-gray-700 focus:border-purple-400 border-teal-400 justify-center leading-tight focus:outline-none">
          <option disabled="">시즌을 선택하세요.</option>
          <option value="1920"> 2019-2020 </option>
          <option value="1819"> 2018-2019 </option>
          <option value="1718"> 2017-2018 </option>
          <option value="1617"> 2016-2017 </option>
          <option value="1516"> 2015-2016 </option>
          <option value="1415"> 2014-2015 </option>
          <option value="1314"> 2013-2014 </option>
          <option value="1213"> 2012-2013 </option>
          <option value="1112"> 2011-2012 </option>
          <option value="1011"> 2010-2011 </option>
          <option value="0910"> 2009-2010 </option>
          <option value="0809"> 2008-2009 </option>
          <option value="0708"> 2007-2008 </option>
          <option value="0607"> 2006-2007 </option>
          <option value="0506"> 2005-2006 </option>
          <option value="0405"> 2004-2005 </option>
          <option value="0304"> 2003-2004 </option>
          <option value="0203"> 2002-2003 </option>
          <option value="0102"> 2001-2002 </option>
          <option value="0001"> 2000-2001 </option>
          <option value="9900"> 1999-2000 </option>
          <option value="9899"> 1998-1999 </option>
          <option value="9798"> 1997-1998 </option>
          <option value="97"> 97 </option>
        </select>
        <select v-model="tableState.spc"  @change="spc" class="w-full md:w-1/3 py-2 px-3 md:mx-2 my-1 md:my-0 rounded border-2 bg-gray-800 focus:bg-gray-700 focus:border-purple-400 border-teal-400 leading-tight focus:outline-none">
          <option disabled="">시즌을 선택하세요.</option>
          <option value="regular"> 정규시즌 </option>
          <option value="po"> 플레이오프 </option>
          <option value="cham"> 챔피언결정전 </option>
        </select>
        <select v-model="tableState.type" @change="type" class="w-full md:w-1/3 py-2 px-3 md:mx-2 my-1 md:my-0 rounded border-2 bg-gray-800 focus:bg-gray-700 focus:border-purple-400 border-teal-400 leading-tight focus:outline-none">
          <option disabled="">스탯을 선택하세요.</option>
          <option value="acc"> 누적 </option>
          <option value="avg"> 평균 </option>
          <option value="sec"> 2차스탯 </option>
        </select>
      </div>
      <div v-if="gridProps">
        <grid ref="tuiGrid" :data="gridProps.data" :columns="gridProps.columns" :options="gridProps.options" :language="'ko'"  @click="onClick" />
      </div>
    </div>
    
</template>
<style>

</style>
<script>
import 'tui-grid/dist/tui-grid.css';
import 'tui-pagination/dist/tui-pagination.css';
import { Grid } from '@toast-ui/vue-grid';

export default {
  components: {
    'grid': Grid,
  },
  data() {
    var tableState = {
      season : "1920",
      spc : "regular",
      type : "acc",
    };
    return {
      gridProps: null,
      tuiGrid : null,
      tableState : tableState,
    }
  },
  created () {
    let self = this;
    console.log(this.chartData);
    this.gridProps = {
      data: {
        api: {
          readData: {
            url : () => '/api/team' , method: 'GET', Params : {season : this.tableState.season, spc : this.tableState.spc, type : this.tableState.type}, initParams : {season : this.tableState.season, spc : this.tableState.spc, type : this.tableState.type},
            serializer(params) {
              params;
              return "season=" + self.tableState.season + "&spc=" + self.tableState.spc + "&type=" + self.tableState.type;
            },
            //url : () => '/api/list/1920' , method: 'GET', initParams : this.tableState
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
        useClientSort : true,
        resizable: true,
      },
      pagination: false,
      columns: [
        { name: "TEAM", header: "TEAM", align: "left", sortable: true, width: 150, className : "bg"},
        { name: "TWOP", header: "2P", align: "center", sortable: true, className : "bg"},
        { name: "TWOPA", header: "2PA", align: "center", sortable: true, className : "bg"},
        { name: "TWOPPERCENT", header: "%", align: "center", sortable: true, className : "bg"},
        { name: "THREEP", header: "3P", align: "center", sortable: true, className : "bg"},
        { name: "THREEPA", header: "3PA", align: "center", sortable: true, className : "bg"},
        { name: "THREEPPERCENT", header: "%", align: "center", sortable: true, className : "bg"},
        { name: "FT", header: "FT", align: "center", sortable: true, className : "bg"},
        { name: "FTA", header: "FTA", align: "center", sortable: true, className : "bg"},
        { name: "FTPERCENT", header: "FTPERCENT", align: "center", sortable: true, className : "bg"},
        { name: "AST", header: "AST", align: "center", sortable: true, className : "bg"},
        { name: "BLK", header: "BLK", align: "center", sortable: true, className : "bg"},
        { name: "DK", header: "DK", align: "center", sortable: true, className : "bg"},
        { name: "DKA", header: "DKA", align: "center", sortable: true, className : "bg"},
        { name: "DKPERCENT", header: "%", align: "center", sortable: true, className : "bg"},
        { name: "EJECT", header: "EJECT", align: "center", sortable: true, className : "bg"},
        { name: "FB", header: "FB", align: "center", sortable: true, className : "bg"},
        { name: "FB_PTS", header: "FB_PTS", align: "center", sortable: true, width:80, className : "bg"},
        { name: "TOV_PTS", header: "TOV_PTS", align: "center", sortable: true, width:80, className : "bg"},
        { name: "FOUL", header: "FOUL", align: "center", sortable: true, className : "bg"},
        { name: "ORB", header: "ORB", align: "center", sortable: true, className : "bg"},
        { name: "DRB", header: "DRB", align: "center", sortable: true, className : "bg"},
        { name: "TRB", header: "TRB", align: "center", sortable: true, className : "bg"},
        { name: "REB", header: "REB", align: "center", sortable: true, className : "bg"},
        { name: "STL", header: "STL", align: "center", sortable: true, className : "bg"},
        { name: "SUB", header: "SUB", align: "center", sortable: true, className : "bg"},
        { name: "TF", header: "TF", align: "center", sortable: true, className : "bg"},
        { name: "PP", header: "PP", align: "center", sortable: true, className : "bg"},
      ]
    }
  },
  methods: {
    season (evt) { 
      this.tableState.season = evt.target.value;
      resetData(this);
    },
    spc (evt) {
      this.tableState.spc = evt.target.value;
      resetData(this);
    },
    type (evt) {  
      this.tableState.type = evt.target.value;
      resetData(this);
    },
    onClick(evt) {
      if(evt.nativeEvent.path[0].tagName == 'A'){
        this.$router.push(evt.nativeEvent.path[0].getAttribute('href'));
      }
    },
    onCheck(evt) {
      console.log(evt);
    },
  },
  mounted() {
    
  },
  /*
  methods: {
      init() {
        console.log(this.json, '실행쓰?');
        //this.$refs.tuiGrid.invoke("readData", 1, true);
        this.$refs.tuiGrid.invoke("resetData", this.json.data.contents);
      }
  }
  */
}
const resetData = (self) => {
  //console.log(self.tableState.sortColumn);
  fetch('/api/team/?season=' + self.tableState.season + '&spc=' + self.tableState.spc + '&type=' + self.tableState.type )
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
    //console.log(json);
    self.$refs.tuiGrid.invoke("resetData", json.data.contents);
  });
}
</script>