<template>
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
    <nuxt-link
      v-for="meme in memes"
      :key="meme.hash"
      :to="`/render?hash=${meme.hash}&tags=${encodeURIComponent(meme.name)}`"
      class="m-2 block rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-100 ease-in-out"
    >
      <a
        v-if="meme.name.includes('mp4') || meme.name.includes('mov')"
        @click="not"
      >
        <video
          :id="'meme-' + meme.hash"
          preload="metadata"
          :src="
            'https://teeheehee.club/meme/' +
            encodeURIComponent(`(${meme.hash}) ${meme.name}`)
          "
          class="rounded-t-lg"
          onLoad="makeVideo"
        >
          <source
            class="rounded-t-lg"
            :src="
              'https://teeheehee.club/meme/' +
              encodeURIComponent(`(${meme.hash}) ${meme.name}#t=0.1`)
            "
            type="video/mov"
          />
        </video>
      </a>
      <img
        v-else-if="
          meme.name.includes('png') ||
          meme.name.includes('gif') ||
          meme.name.includes('jpg') ||
          meme.name.includes('jpeg')
        "
        :src="
          'https://teeheehee.club/meme/' +
          encodeURIComponent(`(${meme.hash}) ${meme.name}`)
        "
        class="rounded-t-lg w-full object-cover h-64"
      />
      <div class="p-3 border-t border-gray-300">
        <div
          class="bg-green-500 text-white rounded-full mx-1 px-4 py-1 my-1 font-bold inline-block"
          @click="copyMeme(meme, $event)"
        >
          Copy
        </div>
        <a
          v-for="tag in meme.tags"
          :key="tag"
          class="bg-blue-500 text-white rounded-full mx-1 px-4 py-1 my-1 font-bold inline-block"
        >
          {{ tag }}
        </a>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import '../static/plyr.css'
import Plyr from 'plyr'

export default Vue.extend({
  data(): {
    memes: { name: string; hash: string; tags: string[] }[]
    players: Plyr[]
    controls: string[]
  } {
    return {
      memes: [],
      players: [],
      controls: [
        'play-large', // The large play button in the center
        'play',
        // 'restart', // Restart playback
        'progress', // The progress bar and scrubber for playback and buffering
        // 'mute', // Toggle mute
        // 'volume', // Volume control
        'fullscreen', // Toggle fullscreen
      ],
    }
  },
  beforeDestroy() {
    window.sessionStorage.setItem(
      'scroll',
      JSON.stringify({
        x: window.scrollX,
        y: window.scrollY,
      })
    )
  },
  mounted() {
    // @ts-ignore
    window.players = this.players
    axios('https://teeheehee.club/list.php').then(({ data }) => {
      data.forEach((e: string) => {
        this.memes.push({
          tags: [
            ...e.split('.')[0].split(' ').slice(1),
            ...(e.includes('mp4' || e.includes('mov')) ? ['video'] : ['image']),
          ],
          name: e.split(' ').slice(1).join(' '),
          hash: (e.split(' ').shift() || '')
            .split('(')
            .join('')
            .split(')')
            .join(''),
        })
      })
      this.$nextTick().then(() => {
        const scrollPos = window.sessionStorage.getItem('scroll')
        if (scrollPos) {
          const scroll = JSON.parse(scrollPos)
          window.scrollTo(scroll.x, scroll.y)
        }
        this.memes.forEach((i) => {
          if (i.name.includes('mp4') || i.name.includes('mov')) {
            this.players.push(
              new Plyr('#meme-' + i.hash, { controls: this.controls })
            )
          }
        })
      })
    })
  },
  methods: {
    not(e: Event) {
      e.preventDefault()
    },
    copyMeme(
      meme: { name: string; hash: string; tags: string[] },
      event: MouseEvent
    ) {
      event.preventDefault()
      navigator.clipboard
        .writeText(
          'https://teeheehee.club/meme/' +
            encodeURIComponent(`(${meme.hash}) ${meme.name}`)
        )
        .then(() => {
          // @ts-ignore
          event.target!.textContent = 'Copied!'
        })
    },
  },
})
</script>

<style>
* {
  box-sizing: border-box;
}
.plyr {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 50%;
}
</style>
