<template>
  <div class="container">
    <div class="title">
      {{title}}
    </div>
    <swiper :options="mainOption" ref="main">
      <swiper-slide>
        <div class="main">
          <div class="nav">
            <swiper :options="navSwiper" ref="nav-swiper" class="slide-list">
              <swiper-slide v-for="(item, index) in json1" :key="item.id" class="swiper-slider">
                <div class="nav-item" :class="{active: navSwiper.index == index}" @click="navClick(index)">
                  {{item.title}}
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="banner">
            <swiper :options="bannerSwiper" ref="banner-swiper" class="banner-swiper">
              <swiper-slide v-for="(item, index) in json1" :key="item.id">
                <div class="banner-item">
                  <img :src="item.banner_list[0].pic" v-if="item.banner_list">
                  <div style="height: 108px;text-align: center;line-height: 108px;border-bottom: 1px solid #eee;"
                       v-else>
                    暂无数据
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="hot">
      <span>
        热门赛事
      </span>
            <span style="color: #ff6700">
        全部{{json3.total}}场赛事>>
      </span>
          </div>
          <div class="competition">
            <div class="item" v-for="(item, index) in json3" v-if="index<2">
              <div class="row">
                <div class="col">
                  {{item.aname}}
                </div>
                <div class="col">
                  {{item.leaguezh}}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {{item.hname}}
                </div>
                <div class="col">
                  {{item.start}}
                </div>
              </div>
            </div>
          </div>
          <div class="news">
            <div class="news-item" v-for="item in json2">
              <div class="img-wrap">
                <img :src="item.pic" v-if="item.pic">
              </div>
              <div class="news-desc">
                <div class="news-title">{{item.title}}</div>
                <div class="news-author-msg">
                  <span class="news-author">{{item.intro}}</span>
                  <span class="news-date">{{item.date}}</span>
                  <span class="news-time">{{item.time}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide v-for="(item, index) in tabBar" :key="index" v-if="index>0">
        <div class="main-test">{{item.label}}</div>
      </swiper-slide>
    </swiper>

    <div class="tab-bar">
      <div class="tab-item"
           v-for="(item, index) in tabBar"
           @click="handleTab(index)"
           :class="{active: activeTab == index}">
        <i class="iconfont" :class="item.icon"></i>
        <span class="icon-label">
          {{item.label}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      const self = this
      return {
        title: '资讯',
        json1: [],
        json2: [],
        json3: [],
        navSwiper: {
          autoplay: false,
          freeMode: true,
          slidesPerView: 5,
          index: 0
        },
        bannerSwiper: {
          autoplay: false,
          index: 0,
          on: {
            slideChange() {
              self.navSwiper.index = this.activeIndex
            }
          }
        },
        mainOption: {
          autoplay: false,
          on: {
            slideChange() {
              console.log(this.activeIndex)
              self.activeTab = this.activeIndex
              self.title = self.tabBar[this.activeIndex].label
            }
          }
        },
        tabBar: [
          {
            label: '咨询',
            icon: 'icon-CombinedShapeCopy'
          },
          {
            label: '对比',
            icon: 'icon-duibifenxi'
          },
          {
            label: '拍卖',
            icon: 'icon-CombinedShapeCopy'
          },
          {
            label: '个人',
            icon: 'icon-geren'
          }
        ],
        activeTab: 0
      }
    },
    methods: {
      async getData() {
        const promise1 = this.$axios.get('/static/json/1.json')
        const promise2 = this.$axios.get('/static/json/2.json')
        const promise3 = this.$axios.get('/static/json/3.json')

        const [data1, data2, data3] = await Promise.all([promise1, promise2, promise3])

        this.json1 = data1.data
        this.json2 = data2.data.map(item => {
          item.date = moment(new Date(item.create_time * 1000)).format('MM-DD')
          item.time = moment(new Date(item.create_time * 1000)).format('hh:mm:ss')
          return item
        })
        this.json3 = data3.data
      },
      navClick(index) {
        this.navSwiper.index = index
        this.$refs['banner-swiper'].swiper.slideTo(index)
      },
      handleTab(index) {
        this.$refs.main.swiper.slideTo(index)
        this.title = this.tabBar[index].label
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style lang="scss" src="../style/index.scss"></style>
