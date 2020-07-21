<template>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
        <div class="bg-gray-800 border border-gray-700 rounded shadow">
            <div class="block">
                <div class="title rouned">
                    <div class="py-2 px-2 bg-green-600 text-gray-100 text-lg font-bold"> {{title}} 순위 </div>
                </div>
                <div class="block w-full">
                    <div v-for="item in items" v-bind:key="item.id" class="flex justify-between px-2 py-1 border-b border-gray-600"> <div class="w-6"> {{item.id}}. </div> <div class="w-full"> {{item.name}} </div> <div> {{item.point}} </div> </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'maincard',
  props: ['rank', 'title'],
  created() {
    this.items = this.rank;
    console.log(this.items)
  },
}
</script>