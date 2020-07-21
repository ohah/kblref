<template>
    <div class="flex items-center">
        <input v-on:keyup="search" class="px-3 py-1 bg-gray-500 border-0 outline-none focus:border-2 focus:border-gray-300 focus:bg-gray-400 text-gray-800">
        <router-link class="mx-1 px-1 hover:text-teal-500" to="/검색"><font-awesome-icon icon="search" /></router-link>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  name: 'mainsearch',
  components: {
    FontAwesomeIcon,
  },
  methods:{
      search : function (e){
        let self = this;
        var target = e.target;
        console.log(target > 2)
        setTimeout(() => {
            if(target.value.length > 2){
                fetch('/api/search/'+target.value)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    self.main = json;
                    console.log(self.main)
                });    
            }
        }, 1000);
        
      }
  }
}
</script>