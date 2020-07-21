<template>
  <nav class="bg-blue-900 px-1 mt-0 h-12 fixed w-full z-20 top-0 flex items-center justify-between">
    <div class="font-bold text-xl"> <router-link to="/"> KBL 레퍼런스 </router-link> </div>
    <div class="text-sm flex items-center">
      <router-link class="mx-1 px-1 hover:text-teal-500" :to="'/일정'">일정</router-link>
      <router-link class="mx-1 px-1 hover:text-teal-500" :to="'/선수스탯'">선수스탯</router-link>
      <router-link class="mx-1 px-1 hover:text-teal-500" :to="'/팀스탯'">팀스탯</router-link>
      
      <mainsearch></mainsearch>
    </div>
  </nav>
</template>
 
<script>

import mainsearch from "./template/mainsearch";
export default {
   components: {
    mainsearch,
  },
}
</script>
 
<style>
</style>