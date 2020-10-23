<template>
  <div>
    <audio
      v-if="music == 'earrape'"
      id="video"
      autoplay
      src="~assets/earrape.webm"
      loop
    >
      <source src="~assets/earrape.webm" type="video/webm" size="720" />
    </audio>
    <audio
      v-if="music == 'kahoot'"
      id="video"
      autoplay
      src="~assets/kahoot.webm"
      loop
    >
      <source src="~assets/kahoot.webm" type="video/webm" size="720" />
    </audio>

    <audio
      v-if="music == 'indian'"
      id="video"
      autoplay
      src="~assets/indian.webm"
      loop
    >
      <source src="~assets/indian.webm" type="video/webm" size="720" />
    </audio>
    <br />
    <div class="container">
      <div>
        <h1 class="title">
          {{ text
          }}<img
            ref="lmao"
            src="~assets/lmao.png"
            class="lmao"
            alt="LMAO"
          /><span class="suffix">{{ club }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */

import Vue from 'vue'
import '../static/plyr.css'
import Plyr from 'plyr'
import zalgo from 'zalgo-js'

export default Vue.extend({
  data(): {
    playing: boolean
    text: string
    club: string
    zalgo: number
    music: string
    memes: any[]
  } {
    return {
      playing: false,
      text: 'teeheehee',
      club: 'club',
      music:
        ['earrape', 'indian', 'kahoot'].find(
          (_, i, ar) => Math.random() < 1 / (ar.length - i)
        ) || 'earrape',
      zalgo: 0.2,
      memes: [],
    }
  },
  mounted() {
    const player = new Plyr('#video', {
      volume: 0.1,
    })
    player.on('pause', () => {
      this.pause()
    })
    player.on('play', () => {
      this.play()
    })

    player.on('volumechange', () => {
      this.zalgo = (player.volume * 10) ** 2
      // @ts-ignore
      this.$refs.lmao.style.animation = `spin ${
        player.volume === 1 ? 0.01 : 1 - player.volume
      }s linear infinite`
    })
    setInterval(() => {
      if (this.playing) {
        this.text = zalgo('     teeheehee', {
          intensity: this.zalgo,
        })
        this.club = zalgo('club     ', {
          intensity: this.zalgo,
        })
      } else {
        this.text = 'teeheehee'
        this.club = 'club'
      }
    }, 50)
  },
  methods: {
    pause() {
      this.playing = false
    },
    play() {
      this.playing = true
    },
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS */
.suffix {
  color: #3b8070;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  vertical-align: middle;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.lmao {
  animation: spin 0.5s linear infinite;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-top: 5%;
}
</style>
