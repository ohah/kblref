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
        <select v-model="tableState.spc"  @change="spc" class="w-full md:w-1/3 py-2 px-3 md:mx-2 my-1 md:my-0 rounded border-2 bg-gray-800 focus:bg-gray-700 focus:border-purple-400 border-teal-400 justify-center leading-tight focus:outline-none">
          <option disabled="">시즌을 선택하세요.</option>
          <option value="regular"> 정규시즌 </option>
          <option value="po"> 플레이오프 </option>
          <option value="cham"> 챔피언결정전 </option>
        </select>
        <select v-model="tableState.type" @change="type" class="w-full md:w-1/3 py-2 px-3 md:mx-2 my-1 md:my-0 rounded border-2 bg-gray-800 focus:bg-gray-700 focus:border-purple-400 border-teal-400 justify-center leading-tight focus:outline-none">
          <option disabled="">스탯을 선택하세요.</option>
          <option value="acc"> 누적 </option>
          <option value="avg"> 평균 </option>
          <option value="sec"> 2차스탯 </option>
        </select>
      </div>
      <grid ref="tuiGrid" :data="gridProps.data" :columns="gridProps.columns" :options="gridProps.options" :language="'ko'"  @click="onClick" @sort="onSort" />
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
      sortColumn : "NAME",
      sortAscending : "true",
      currentPage : "1",
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
    this.gridProps = {
      data: {
        api: {
          readData: {
            url : () => '/api/list/' , method: 'GET', Params : {sortColumn : this.tableState.sortColumn , season : this.tableState.season, spc : this.tableState.spc, type : this.tableState.type},
            serializer(params) {
              return "sortColumn=" + self.tableState.sortColumn + "&sortAscending=" + self.tableState.sortAscending.toString()+"&perPage=" + params.perPage + "&page=" + params.page + "&season=" + self.tableState.season + "&spc=" + self.tableState.spc + "&type=" + self.tableState.type;
            },
            //url : () => '/api/list/1920' , method: 'GET', initParams : this.tableState
          }
        },
        hideLoadingBar: false,
        //initialRequest: false,
      },
      options: {
        pageOptions: {
          perPage: 15,
        },
        columnOptions: {
          frozenCount: 1,
          frozenBorderWidth: 1,
        },
        useClientSort : false,
        resizable: true,
      },
      pagination: true,
      columns: [
        //{ name: "season", header: "season", align: "center", sortable: true , className : "bg"},
        //{ name: "No", header: "No", align: "center", sortable: true , className : "bg"},
        { name: "NAME", header: "name", align: "center", sortable: true, width : 110 , className : "bg"},
        { name: "G", header: "G", align: "center", sortable: true , width: 40, className : "bg"},
        { name: "start", header: "start", align: "center", sortable: true , className : "bg"},
        //{ name: "pcode", header: "pcode", align: "center", sortable: true , className : "bg"},
        //{ name: "G", header: "G", align: "center", sortable: true , className : "bg"},
        { name: "MIN", header: "MIN", align: "right", sortable: true, width: 60 , className : "bg"},
        { name: "TWOP", header: "2P", align: "right", sortable: true, className : "bg"},
        { name: "TWOPA", header: "2PA", align: "right", sortable: true, className : "bg"},
        { name: "TWOPPERCENT", header: "%", align: "right", sortable: true, className : "bg"},
        { name: "THREEP", header: "3P", align: "right", sortable: true, className : "bg"},
        { name: "THREEPA", header: "3PA", align: "right", sortable: true, className : "bg"},
        { name: "THREEPPERCENT", header: "%", align: "right", sortable: true, className : "bg"},
        { name: "FT", header: "FT", align: "right", sortable: true, className : "bg"},
        { name: "FTA", header: "FTA", align: "right", sortable: true, className : "bg"},
        { name: "FTPERCENT", header: "%", align: "right", sortable: true, className : "bg"},
        { name: "ORB", header: "ORB", align: "right", sortable: true, className : "bg"},
        { name: "DRB", header: "DRB", align: "right", sortable: true, className : "bg"},
        { name: "REB", header: "REB", align: "right", sortable: true, className : "bg"},
        { name: "AST", header: "AST", align: "right", sortable: true, className : "bg"},
        { name: "wFT", header: "wFT", align: "right", sortable: true, className : "bg"},
        { name: "woFT", header: "woFT", align: "right", sortable: true, className : "bg"},
        { name: "STL", header: "STL", align: "right", sortable: true, className : "bg"},
        { name: "BLK", header: "BLK", align: "right", sortable: true, className : "bg"},
        { name: "TOV", header: "TOV", align: "right", sortable: true, className : "bg"},
        { name: "DK", header: "DK", align: "right", sortable: true, className : "bg"},
        { name: "PTS", header: "PTS", align: "right", sortable: true, className : "bg"},
        { name: "PP", header: "PP", align: "right", sortable: true, className : "bg"},
        { name: "PF", header: "PF", align: "right", sortable: true, className : "bg"},
        { name: "TEAM", header: "TEAM", align: "left", sortable: true, width: 150, className : "bg"},
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
    onSort(evt) {
      var currentPage = evt.instance.paginationManager.getPagination()._currentPage;
      this.tableState.sortColumn = evt.sortState.columns[0].columnName;
      console.log(evt.sortState.columns[0]);
      console.log('Before', this.tableState.sortAscending.toString());
      this.tableState.sortAscending = this.tableState.sortAscending == "true" ? "false" : "true";
      console.log('After', this.tableState.sortAscending);
      this.tableState.currentPage = currentPage;
      resetData(this, currentPage);
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
const resetData = (self, currentPage = 1) => {
  //console.log(self.tableState.sortColumn);
  fetch('/api/list/?season=' + self.tableState.season + '&spc=' + self.tableState.spc + '&type=' + self.tableState.type + '&perPage=15&page='+ currentPage +'&sortColumn=' + self.tableState.sortColumn + '&sortAscending=' + self.tableState.sortAscending )
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
    //console.log(json);
    self.$refs.tuiGrid.invoke("resetData", json.data.contents, 
    {
      pageState: {
        perPage: 15,
        totalCount : json.data.pagination.totalCount
      },
      sortState: {
        columnName : self.tableState.sortColumn,
        ascending : self.tableState.sortAscending == "false" ? true : false,
      }
    }
    );
  });
}
</script>