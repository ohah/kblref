<template>
    <div class="mx-3 py-3 overflow-hidden block">
        <div v-if="MutilPerson.length > 1"> 
          <div class="flex">
            <router-link v-on:click.native="route" class="w-1/2 py-3 flex bg-gray-700 mx-1 rounded border border-gray-500 p-3 justify-center items-center hover:bg-gray-800 hover:border-teal-300" v-for="item in MutilPerson" :key ="item.pcode" :to="'/선수스탯/'+ item.name + '(' + item.pcode + ')/정규시즌'">
              {{item.name}}
              {{item.tname}}
              {{item.pcode}}
            </router-link>
          </div>
        </div>
        <div v-if="MutilPerson.length <= 1"> 
          <div class="flex mb-4">
            <router-link :to="url + '/정규시즌'" class="border-b-5 flex md:w-1/3 w-full px-2 py-3 justify-center items-center bg-gray-700 border border-gray-600 hover:bg-blue-900 select-none cursor-pointer"> 정규시즌 </router-link>
            <router-link :to="url +'/플레이오프'" class="flex md:w-1/3 w-full px-2 py-3 justify-center items-center bg-gray-700 border border-gray-600 hover:bg-blue-900 select-none cursor-pointer"> 플레이오프 </router-link>
            <router-link :to="url + '/챔피언결정전'" class="flex md:w-1/3 w-full px-2 py-3 justify-center items-center bg-gray-700 border border-gray-600 hover:bg-blue-900 select-none cursor-pointer"> 챔피언결정전 </router-link>
          </div>
          <router-view v-if="MutilPerson.length <= 1"></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'pstat',
  data() {
    return {
      MutilPerson : [],
      url : false,
    }
  },
  methods : {
    route : function () {
      const name = this.$route.params.name;
      this.url = '/선수스탯/' + name;
      this.MutilPerson = [];
    }
  },
  updated () {
  },
  created () {
    if(!this.$route.params.season) this.$route.params.season = "정규시즌";
    const name = this.$route.params.name;
    //const pcode = this.$route.params.pcode;
    this.url = '/선수스탯/' + name;
    let self = this;
    let url = '/api/player/pstat/' + name;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      if(json[0].pcode) self.MutilPerson = json;
    });
  },
  mounted () {
    
  },
}

</script>