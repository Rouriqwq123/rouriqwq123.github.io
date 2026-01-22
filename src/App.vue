<template>
  <v-app class="vapp-fullscreen-background" style="overflow: hidden;" :class="{ 'radius-before': !xs }"
  :style="xs?{height: '100%',width: '100%',top: '0',left:'0'}:(sm?{height: '98%',width: '98%',top: '1%',left:' 1%'}:{height: '96.6%',width: '99%',top: '1.7%',left:' 0.5%'})">
    <transition name="fade">
      <div class="loading" v-show="isloading">
        <loader></loader>
      </div>
    </transition>

    <video
  autoplay
  loop
  muted
  playsinline
  webkit-playsinline
  class="video-bg"
  id="bg-video"
  ref="VdPlayer"
  :style="xs?{height: '100%',width: '100%',top: '0',left:'0'}:(sm?{height: '98%',width: '98%',top: '1%',left:' 1%','border-radius': '16px'}:{height: '96.6%',width: '99%',top: '1.7%',left:' 0.5%','border-radius': '16px',})">
        <source :src=videosrc type="video/mp4">
    </video>
    
    <div class="floating-switch-container">
      <v-switch
        v-model="isClearScreen"
        inset
        :style="xs?{'transform':'scale(0.6) translateX(15%)'}:{}"
        class="floating-switch"
        @mouseover="expandSwitch"
        @mouseleave="collapseSwitch"
      ></v-switch>
    </div>
    
    <div v-show="!isloading && !isClearScreen" :style="xs||sm?{'overflow-y': 'auto','overflow-x': 'hidden'}:{}">
        <v-row>
            <v-col cols="12" md="4" lg="3" class="leleo-left" align="center">
              <div :style="xs||sm?{'font-size':'2.3rem'}:{'display':'none'}" class="leleo-left-welcome">{{ configdata.welcometitle }}</div>  
              <v-avatar class="leleo-left-avatar" :size="xs||sm?120:140" :style="xs||sm?{'margin-top': '0'}:{'margin-top': '2rem'}" @mouseenter="musicplayershow(1)" @mouseleave="musicplayershow(0)">
                  <v-img :class="{'leleo-spin':isPlaying}"
                  alt="Leleo"
                  :src=configdata.avatar
                  ></v-img>
                  <!-- 由于当ismusicplayer显示后，fadein无效果，所以需要设置一个过渡动画 -->
                  <transition name="fade">
                  <v-card v-show="ismusicplayer" class="musicplayer" :class="{'fade-in':ismusicplayer}" variant="tonal">
                      <div v-if="audioLoading" class="loading-spinner">
                          <v-progress-circular indeterminate></v-progress-circular>
                      </div>
                      <span ref="audiotitle" class="musicplayer-text"
                        style="top: 1.6rem;font-weight: bolder;"
                      >{{ musicinfo?.[0]?.title }}</span>
                      <span ref="audioauthor" class="musicplayer-text"
                        style="bottom: 1.4rem;"
                      >{{ musicinfo?.[0]?.author }}</span>
                      <audio v-show="false" ref="audioPlayer" :src="musicinfo?.[0]?.url"
                      @waiting="onWaiting"
                      @canplay="onCanPlay">
                      </audio>
                      <v-btn :size="xs||sm?22:30" color="#999999" icon @click="previousTrack()">
                      <v-icon>mdi-skip-previous</v-icon>
                      </v-btn>
                      <v-btn :size="xs||sm?35:48" color="#999999" icon @click="togglePlay()">
                      <v-icon>{{ isPlaying? 'mdi-pause' : 'mdi-play' }}</v-icon>
                      </v-btn>
                      <v-btn :size="xs||sm?22:30" color="#999999" icon @click="nextTrack()">
                      <v-icon>mdi-skip-next</v-icon>
                      </v-btn>
                  </v-card>
                  </transition>
                </v-avatar>

<div class="play-hint-wrap">
  <div
    class="play-hint"
    :class="{ playing: isPlaying }"
    role="button"
    tabindex="0"
    @click="togglePlay()"
    @keydown.enter.prevent="togglePlay()"
  >
    <span class="dot" aria-hidden="true"></span>
    <span class="text">
      {{ isPlaying ? 'now playing' : (musicinfoLoading ? 'loading...' : 'play me') }}
    </span>
  </div>
</div>

                <v-card class="ma-5 pa-2 leleo-left-card" variant="tonal" :max-width="xs?270:300" style="text-align: center;">
                    <template v-slot:title>
                    <span>Tags</span>
                    </template>
                    <v-chip v-for="item in personalizedtags" density="compact" link class="ma-1" size="small">
                    {{item}}
                    </v-chip>
                </v-card>

                <div class="leleo-left-chart">
                    <polarchart :style="xs||sm?{'height':'210px'}:{'height':'270px'}"/>
                </div>

                <v-container class="leleo-left-socialIconsContainer">
                    <v-row align="center" justify="center">
                    <v-col class="pa-1" cols="auto" v-for="item in socialPlatformIcons">
                        <v-btn :size="xs?25:33" variant="tonal" color="var(--leleo-vcard-color)"
                        class="ma-1 leleo-social-bticon"
                        icon
                        :href="item.link" target="_blank"
                        >
                    <v-icon :icon=item.icon :size="xs?20:25" class="social-bticon-icon"></v-icon></v-btn>
                    </v-col>
                    </v-row>

                    
                </v-container>
            </v-col>

            <v-col cols="12" md="8" lg="9" style="height: 100vh;" :style="xs||sm ?{}:{'overflow': 'auto'}">
                <homeright :configdata=configdata :formattedTime=formattedTime 
                :formattedDate=formattedDate :projectcards=projectcards></homeright>
            </v-col>
        </v-row>
    </div>

    <v-dialog
        v-model="dialog1"
        width="1000"
        heihght="700"
      >
      <v-card elevation="3" style="backdrop-filter: blur(10px);">
        <v-tabs
          v-model="tab"
          :items="tabs"
          align-tabs="center"
          height="60"
          slider-color=var(--leleo-vcard-color)
        >
          <template v-slot:tab="{ item }">
            <v-tab
              :prepend-icon="item.icon"
              :text="item.text"
              :value="item.value"
              class="text-none"
            ></v-tab>
          </template>
          
          <template v-slot:item="{ item }">
            <v-tabs-window-item :value="item.value" class="pa-4">
              <div v-if="item.value=='tab-3' && musicinfoLoading" class="loading-spinner" align="center">
                  <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <!-- 通过组件绑定不同tab项的组件 -->
              <component v-if="item.value!='tab-3' || (item.value=='tab-3' && !musicinfoLoading)" :is=item.component @cancel="handleCancel" 
              :musicinfo="item.value=='tab-3'?musicinfo:[]"
              :currentIndex="item.value=='tab-3'?playlistIndex:null"
              :isPlaying="item.value=='tab-3'?isPlaying:null"
              :audioPlayer="item.value=='tab-3'?audioPlayer:null"
              :fromLyrics="item.value=='tab-3'?lyrics:null"
              :audioLoading="item.value=='tab-3'?audioLoading:null"
              @update:current-index="updateCurrentIndex"
              @update:is-playing="updateIsPlaying"
              @update:current-lyrics="updateLyrics"
              ></component>
            </v-tabs-window-item>
          </template>
        </v-tabs>
      </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog2"
        width="700"
        heihght="500"
      >
      <v-card class="ma-3 pa-2" hover
          variant="tonal"
          rounded="lg"
          style="text-align: center;backdrop-filter: blur(10px);"
        >
          <template v-slot:title >
            <span class="leleo-card-title">关于</span>
          </template>
          <div style="display: flex;flex-direction: column;align-items: center;">
            <v-card class="ma-3 pa-2" hover
              variant="tonal"
              max-width="400"
              rounded="lg"
              style="text-align: center;"
              >
              <template v-slot:subtitle>
                <span class="leleo-card-subtitle">本页基于以下技术及服务搭建</span>
              </template>
              <div>
                <v-tooltip  v-for="item in stackicons" v-model="item.model" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" :color=item.color rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-icon size="25" color="white">{{item.icon}}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{item.tip}}</span>
                </v-tooltip>
                <!-- 自定义 -->
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-avatar image="/img/stackicon/vite.svg" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>vite</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#254B7C">
                      <span style="font-size: 8px;font-weight: bolder;">{less}</span>
                    </v-btn>
                  </template>
                  <span>less</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-avatar image="/img/stackicon/mdi.svg" rounded="0" size="35"></v-avatar>
                    </v-btn>
                  </template>
                  <span>mdi</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-avatar image="/img/stackicon/chartjs.png" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>chartjs</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#0F1225">
                      <v-avatar image="/img/stackicon/meting.png" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>meting</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#070707">
                      <v-avatar image="/img/stackicon/uiverse.png" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>uiverse</span>
                </v-tooltip>
              </div>
            </v-card>

            <p class="ma-6">
                <span v-for="item in configdata.statement">
                  {{ item }}<br>
                </span>
            </p>
          </div>
        </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./app.js"></script>
<style scoped>
  @import url(/css/app.less);
  @import url(/css/mobile.less);


  /* iOS Safari: hide native video controls overlay */
:deep(video::-webkit-media-controls),
:deep(video::-webkit-media-controls-panel),
:deep(video::-webkit-media-controls-start-playback-button),
:deep(video::-webkit-media-controls-play-button),
:deep(video::-webkit-media-controls-overlay-play-button),
:deep(video::-webkit-media-controls-timeline),
:deep(video::-webkit-media-controls-volume-slider) {
  display: none !important;
  -webkit-appearance: none !important;
  opacity: 0 !important;
}

/* 禁止任何交互（防止 Safari 认为它是可点媒体） */
.video-bg {
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
  .play-hint-wrap{
  width: 100%;
  display: flex;
  justify-content: center;   /* 居中 */
  margin-top: 10px;          /* 跟头像拉开距离 */
}

/* 手机端再多给点距离，避免和 Tags 重叠 */
@media (max-width: 600px) {
  .play-hint-wrap{
    margin-top: 14px;
    margin-bottom: 6px;
  }
}
  
  .play-hint{
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 6px 12px;
  border-radius: 999px;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);

  color: rgba(255,255,255,0.75);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  user-select: none;
  cursor: pointer;

  transition: transform .18s ease, background .18s ease, border-color .18s ease, color .18s ease;
}

.play-hint:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.95);
}

.play-hint:active{
  transform: translateY(0px) scale(0.98);
}

.play-hint .dot{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.55);
  box-shadow: 0 0 0 0 rgba(255,255,255,0.0);
  transition: background .2s ease;
}

/* 播放时：小点点呼吸闪烁（高级感） */
.play-hint.playing .dot{
  background: rgba(120,255,200,0.9);
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse{
  0%   { box-shadow: 0 0 0 0 rgba(120,255,200,0.35); }
  70%  { box-shadow: 0 0 0 8px rgba(120,255,200,0.0); }
  100% { box-shadow: 0 0 0 0 rgba(120,255,200,0.0); }
}

</style>