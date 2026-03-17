<template>
      <div>
        <div>
          <div :style="xs||sm?{'display':'none'}:{'font-size':'4rem'}" class="leleo-left-welcome">{{ configdata.welcometitle }}</div>
        </div>
        <div>
          <v-row align="center">
            <v-col cols="12" md="8">
				
            	<typewriter class="ma-3 d-flex align-center justify-center" style="min-height: 200px;"></typewriter>
            </v-col>
            <v-col cols="12" md="4" align="center">
              <v-card class="ma-3" hover
                >
                  <template v-slot:title >
                    <span class="leleo-card-title clock-font">{{formattedTime}}</span>
                  </template>
                  <template v-slot:subtitle>
                    <span style="font-weight: bold;">{{formattedDate}}</span>
                  </template>
                  <turntable :color1="configdata.color.turntablecolor1" :color2="configdata.color.turntablecolor2" />
              </v-card>
            </v-col>
          </v-row>
          
          <div class="d-flex flex-wrap gap-2 mt-14 ml-3">
            <v-chip prepend-icon="mdi-webhook" size="large" style="color: var(--leleo-vcard-color);">
              My Project
            </v-chip>
            <v-chip prepend-icon="mdi-email-outline" size="large" style="color: var(--leleo-vcard-color); cursor: pointer;" @click="scrollToContact">
              Contact Us
            </v-chip>
          </div>
          <v-container>
            <v-row>
              <v-col
                v-for="(item,key) in projectcards"
                cols="6"
                md="4"
                lg="3"
                :style="xs?{'padding': '6px'}:{}"
              >
                <v-card class="">
                  <v-img
                    aspect-ratio="1.7778"
                    :src= item.img
                    cover
                    :style="{ opacity: 0.8}"
                  ></v-img>
                  <v-card-title :style="xs?{'font-size': '0.9rem','padding': '0.15rem 0.5rem'}:{'font-size': '1.1rem','padding':'0.2rem 0.8rem'}">
                    {{item.title}}
                  </v-card-title>
                  <v-card-subtitle :style="xs?{'font-size': '0.6rem','padding': '0.1rem 0.5rem'}:{'font-size': '0.8rem','padding':'0.15rem 0.6rem'}">
                    {{ item.subtitle }}
                  </v-card-subtitle>

                  <v-card-actions :style="xs||sm||md?{'padding': '0','min-height': '0','height':'2.5rem'}:{'min-height': '0','height':'2.8rem'}">
                    <v-btn :href="item.url"
                    target="_blank"
                      :text= "item.go"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      :icon="item.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      @click="item.show = !item.show;projectcardsShow(key);"
                    ></v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="item.show">
                      <v-divider></v-divider>
                      <v-card-text :style="xs?{'font-size': '0.7rem'}:{}">
                        {{item.text}}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- Contact Us Section -->
          <div id="contact" ref="contactSection" class="contact-section">
            <div class="contact-inner">
              <v-chip prepend-icon="mdi-email-outline" size="large" class="mb-6" style="color: var(--leleo-vcard-color);">
                Contact Us
              </v-chip>
              <p class="contact-subtitle">Let's build something wonder-filled together.</p>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="5">
                  <v-card class="contact-card" hover variant="tonal">
                    <v-card-title class="contact-card-name">
                      <v-icon icon="mdi-account-circle-outline" class="mr-2" />Rouri
                    </v-card-title>
                    <v-card-text>
                      <div class="contact-item">
                        <v-icon icon="mdi-email-outline" size="small" class="mr-2" />
                        <strong>Email:</strong>&nbsp;Rouriqwq@gmail.com
                      </div>
                      <div class="contact-item">
                        <v-icon icon="mdi-discord" size="small" class="mr-2" />
                        <strong>Discord:</strong>&nbsp;Rouriqwq
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-card class="contact-card" hover variant="tonal">
                    <v-card-title class="contact-card-name">
                      <v-icon icon="mdi-account-circle-outline" class="mr-2" />Safara
                    </v-card-title>
                    <v-card-text>
                      <div class="contact-item">
                        <v-icon icon="mdi-email-outline" size="small" class="mr-2" />
                        <strong>Email:</strong>&nbsp;Safara@gmail.com
                      </div>
                      <div class="contact-item">
                        <v-icon icon="mdi-discord" size="small" class="mr-2" />
                        <strong>Discord:</strong>&nbsp;Safara0
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>

        </div>       
      </div>
</template> 

<script>
import typewriter from '../components/typewriter.vue';
import turntable from '../components/turntable.vue';
import { useDisplay } from 'vuetify'

export default {
    components: {
        typewriter,turntable
    },
    props: ['configdata','formattedTime','formattedDate','projectcards'],
	data() {
		return {
			searchQuery: '',
			selectedEngine: { title: 'Google', value: 'google' },
      		searchEngines :[
				{ title: 'Google', value: 'google' },
				{ title: 'Bing', value: 'bing' },
			]
		}
	},
    setup() {
      const { xs,sm,md } = useDisplay();
      return {xs,sm,md};
    },
	computed: {	
		isUrl(){
			const str = this.searchQuery.trim();
  			return this.isLikelyUrl(str);
		}
	},
    methods:{
      scrollToContact() {
        const el = this.$refs.contactSection;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      projectcardsShow(key){
        for(let i = 0;i < this.projectcards.length;i++){
          if(i != key){
            this.projectcards[i].show = false;
          }
        }
      },
	  performSearch() {
		const query = this.searchQuery.trim();
		if (!query) return;

		if (this.isUrl) {
			let url = query;
			// 自动补全协议（如果缺少）
			if (!/^[a-z]+:\/\//i.test(url)) {
				url = 'http://' + url; // 默认用http
			}
			
			window.open(url, '_blank');
		} else {
			const engineUrls = {
				google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
				bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
				baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
				yandex: `https://yandex.com/search/?text=${encodeURIComponent(query)}`,
				duckduckgo: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
			};
			window.open(engineUrls[this.selectedEngine.value], '_blank');
		}
	  },
	  isLikelyUrl(input) {
		// 移除首尾空格
		const str = input.trim();
		
		// 情况1：明确包含协议头（http/https/ftp等）
		if (/^(https?|ftp):\/\//i.test(str)) return true;
		
		// 情况2：符合域名格式（支持国际化域名）
		const domainPattern = /^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;
		
		// 情况3：localhost或IP地址
		const localPattern = /^(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/.*)?$/i;
		
		
		return (
			domainPattern.test(str) || 
			localPattern.test(str)
		);
		}
    }
};
</script>

<style scoped>
@import url(/css/app.less);
@import url(/css/mobile.less);
.glass-list {
	background: transparent !important;
	backdrop-filter: blur(var(--leleo-blur));
	border-radius: 5%;
	color: var(--leleo-vcard-color);
	overflow: hidden;
}

/* --- Contact Us Section --- */
.contact-section {
	margin-top: 3rem;
	padding: 60px 16px 80px;
	border-radius: 16px;
	background: rgba(10, 14, 24, 0.45);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.10);
}

.contact-inner {
	text-align: center;
}

.contact-subtitle {
	color: rgba(255, 255, 255, 0.65);
	font-size: 0.92rem;
	letter-spacing: 0.04em;
	margin-bottom: 24px;
}

.contact-card {
	border-radius: 16px !important;
	text-align: left;
}

.contact-card-name {
	font-size: 1.1rem;
	font-weight: 700;
	display: flex;
	align-items: center;
}

.contact-item {
	display: flex;
	align-items: center;
	color: rgba(255, 255, 255, 0.82);
	font-size: 0.92rem;
	line-height: 1.8;
	word-break: break-word;
}

.contact-item strong {
	color: #fff;
}

@media (max-width: 600px) {
	.contact-section {
		padding: 40px 10px 60px;
		border-radius: 10px;
	}
}
</style>