<template>
    <div class="mt-12">
    <div id="menu" class="flex w-full items-center h-12 justify-center font-bold text-2xl">
      <font-awesome-icon class="cursor-pointer hover:text-teal-400" v-on:click="prev" icon="arrow-left" /> 
      <div class="mx-3 select-none cursor-pointer" v-on:click="$refs.modal.show()" > {{today}} </div>
      <font-awesome-icon class="cursor-pointer hover:text-teal-400" v-on:click="next" icon="arrow-right" />
    </div>
    <div class="" style="height:calc(100% - 20rem);">
    </div>
    <calendar style="max-height:calc(100% - 9rem);"
        ref="tuiCalendar"
        :calendars="calendarList"
        :schedules="scheduleList"
        :view="view"
        :taskView="taskView"
        :scheduleView="scheduleView"
        :theme="theme"
        :week="week"
        :month="month"
        :timezones="timezones"
        :disableDblClick="disableDblClick"
        :isReadOnly="isReadOnly"
        :template="template"
        :useCreationPopup="useCreationPopup"
        :useDetailPopup="useDetailPopup"
        @afterRenderSchedule="onAfterRenderSchedule"
        @beforeCreateSchedule="onBeforeCreateSchedule"
        @beforeDeleteSchedule="onBeforeDeleteSchedule"
        @beforeUpdateSchedule="onBeforeUpdateSchedule"
        @clickDayname="onClickDayname"
        @clickSchedule="onClickSchedule"
        @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
    />
    <t-modal
      wrapper-class="bg-red-100 border-red-400 text-red-700 rounded shadow-xl flex flex-col"
      overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-red-900 opacity-75"
      body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
      footerClass="bg-red-400 p-3 flex justify-between"
      show
      ref="modal"
    >
      <h1 class="text-xl">모달창 테스트</h1>
      <p>그렇다고</p>
      <template v-slot:footer>
        <t-button
        variant="tertiary"
          tertiary-class="border block text-white border-transparent hover:text-gray-300"
          @click="$refs.modal.hide()">
      아프다아아악
        </t-button>	
        <t-button @click="$refs.modal.hide()" variant="danger">
          윤종신
        </t-button>	
      </template>
    </t-modal>
    </div>
</template>
<script>
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

export default {
  name: 'schedule',
  components: {
    'calendar': Calendar,
    FontAwesomeIcon,
  },
  methods : {
    prev : function(){
      let self = this;
      self.$refs.tuiCalendar.invoke('clear');
      var getMonth = this.datetime.setMonth(parseInt(this.datetime.getMonth() - 1));
      this.datetime = new Date(getMonth);
      var month = parseInt(this.datetime.getMonth() + 1) > 9 ? parseInt(this.datetime.getMonth() + 1) : "0" + parseInt(this.datetime.getMonth() + 1);
      this.today = this.datetime.getFullYear() + "." + month;
      this.$refs.tuiCalendar.invoke('prev');
      fetch('/api/schedule/'+this.today)
      .then(function(response) {
          return response.json();
      })
      .then(function(schedule) {
        self.$refs.tuiCalendar.invoke("createSchedules", schedule);
      });    
    },
    next : function(){
      let self = this;
      self.$refs.tuiCalendar.invoke('clear');
      var getMonth = this.datetime.setMonth(parseInt(this.datetime.getMonth() + 1));
      this.datetime = new Date(getMonth);
      var month = parseInt(this.datetime.getMonth() + 1) > 9 ? parseInt(this.datetime.getMonth() + 1) : "0" + parseInt(this.datetime.getMonth() + 1);
      this.today = this.datetime.getFullYear() + "." + month;
      this.$refs.tuiCalendar.invoke('next');
      fetch('/api/schedule/'+this.today)
      .then(function(response) {
          return response.json();
      })
      .then(function(schedule) {
        self.$refs.tuiCalendar.invoke("createSchedules", schedule);
      });
    },
    onAfterRenderSchedule(e) {
        console.log('onAfterRenderSchedule', e);
    },
    onBeforeCreateSchedule(e) {
      console.log('onBeforeCreateSchedule', e);
      var guide = e.guide;
      var guideEl$ = guide.guideElement
        ? guide.guideElement
        : guide.guideElements[Object.keys(guide.guideElements)[0]];
      this.x = guideEl$.getBoundingClientRect().left;
      this.y = guideEl$.getBoundingClientRect().top;
      this.showMenu = true;
      // schedule info
      var startTime = e.start;
      var endTime = e.end;
      var isAllDay = e.isAllDay;
      //var schedule;
      this.schedule = [
        {
          id: this.count++,
          isAllDay: isAllDay,
          start: startTime,
          end: endTime,
          category: "allday",
          color: "#009eff",
          bgColor: "#e9f6fb",
          borderColor: "#009eff"
        }
      ];
      guide.clearGuideElement();
    },
    onBeforeDeleteSchedule(e) {
      console.log('onBeforeDeleteSchedule', e);      
    },
    onBeforeUpdateSchedule(e) {
      console.log('onBeforeUpdateSchedule', e);
    },
    onClickDayname(e) {
      console.log('onClickDayname', e);
    },
    onClickSchedule(e) {
      console.log('onClickSchedule', e);
      //this.$router.push(e.schedule.calendarId)
      var date = getFormatDate(e.schedule.start._date);
      setTimeout(() => {
        this.$router.push({ path : '일정/'+date, query : { gno : e.schedule.calendarId}});  
      }, 0);
    },
    onClickTimezonesCollapseBtn(e) {
      console.log('onClickTimezonesCollapseBtn', e);
    }
  },
  mounted () {
    let self = this;
    fetch('/api/schedule/'+this.today)
    .then(function(response) {
        return response.json();
    })
    .then(function(schedule) {
      console.log(schedule);
      self.$refs.tuiCalendar.invoke("createSchedules", schedule);
    });    
  },
  created () {
    
  },
  data() {
    var datetime = new Date();
    var month = parseInt(datetime.getMonth() + 1) > 9 ? parseInt(datetime.getMonth() + 1) : "0" + parseInt(datetime.getMonth() + 1);
    return {
      datetime : datetime,
      today : datetime.getFullYear() + "." + month,
      calendarList: [
        {
          id: '1',
          name: '경기일정'
        }
      ],
      scheduleList: [],
      view: 'month',
      taskView: ['milestone', 'task'],
      scheduleView: ['time', 'allday'],
      theme: {
          'month.dayname.height': '30px',
          'month.dayname.borderLeft': '1px solid #ff0000',
          'month.dayname.textAlign': 'center',
          'week.today.color': '#333',
          'week.daygridLeft.width': '100px',
          'week.timegridLeft.width': '100px'
      },
      week: {
        narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false
      },
      month: {
        startDayOfWeek: 1
      },
      timezones: [{
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul'
      }],
      disableDblClick: true,
      isReadOnly: true,
      template: {
        milestone: function(schedule) {
          console.log(schedule);
          return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
        },
        milestoneTitle: function() {
          return '<span class="tui-full-calendar-left-content">MILESTONE</span>';
        }
      },
      useCreationPopup: true,
      useDetailPopup: true,
    }
  }
}
function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}
</script>