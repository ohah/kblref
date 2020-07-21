  
<template>
    <div class="mx-3">
        <div class="flex flex-wrap">
            <main-card v-bind:rank="post.rank" v-bind:title ="post.title" ></main-card>
            <main-card v-bind:rank="post2.rank" v-bind:title ="post2.title" ></main-card>
            <main-card v-bind:rank="post2.rank" v-bind:title ="post2.title" ></main-card>
            <main-card v-bind:rank="post2.rank" v-bind:title ="post2.title" ></main-card>
            <main-card v-bind:rank="post2.rank" v-bind:title ="post2.title" ></main-card>
            <main-card v-bind:rank="post2.rank" v-bind:title ="post2.title" ></main-card>
        </div>
        <main-rank></main-rank>
    </div>
</template>
<script>

import maincard from "./template/maincard";
import mainrank from "./template/mainrank";
export default {
    created () {
        this.post = 
            {title : '득점' , rank : [
                { id : 1, name: '김선형', point : "15.59"},
                { id : 2, name: '이정현', point : "14.59"},
                { id : 3, name: '서장훈', point : "13.59"},
                { id : 4, name: '김주성', point : "12.59"},
                { id : 5, name: '양동근', point : "11.59"},
            ]};
        console.log(this.post);
        this.post2 =
            {title : '득ㄹㅇㄹ점' , rank : [
            { id : 1, name: '김주성', point : "15.59"},
            { id : 2, name: '서장훈', point : "14.59"},
            { id : 3, name: '주태수', point : "13.59"},
            { id : 4, name: '한정원', point : "12.59"},
            { id : 5, name: '김종규', point : "11.59"},
        ]};
    },
    components: {
        'main-rank': mainrank,
        'main-card': maincard,
    },

}
</script>