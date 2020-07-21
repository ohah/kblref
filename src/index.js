import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/main.vue'
import Allstat from './components/allstat.vue'
import Pstat from './components/template/pstat/pstat.vue'
import PstatTable from './components/template/pstat/table.vue'
import Teamstat from './components/template/tstat/teamstat.vue'
import TstatTable from './components/template/tstat/table.vue'
import Calendar from './components/template/schedule/calendar.vue'
import Todaygame from './components/template/schedule/todaygame.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) { // 해당 경로에서 또 호출했을떄 에러 처리
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
        },
        {
            path: '/선수스탯',
            component: Allstat
        },
        {
            path: '/팀스탯',
            component: Teamstat,
        },
        {
            path: '/일정',
            component: Calendar,
        },
        {
            path: '/일정/:date',
            component: Todaygame,
            props : true,
        },
        {
            path: '/팀스탯/:team',
            component : TstatTable,
        },
        {
            path: '/선수스탯/:name',
            component: Pstat,
            children:[
                {
                    path : ':season',
                    component : PstatTable,
                    props: true,
                },
            ]
        },
    ]
})