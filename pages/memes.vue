<template>
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
    <a
      v-for="meme in memes"
      :key="meme.hash"
      :href="`/render?hash=${meme.hash}&tags=${encodeURIComponent(meme.name)}`"
      class="m-2 block rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-100 ease-in-out"
    >
      <video
        v-if="meme.name.includes('mp4') || meme.name.includes('mov')"
        :id="'meme-' + meme.hash"
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
            encodeURIComponent(`(${meme.hash}) ${meme.name}`)
          "
          type="video/mov"
        />
      </video>
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
          v-for="tag in meme.tags"
          :key="tag"
          class="bg-blue-500 text-white rounded-full mx-1 px-4 py-1 my-1 font-bold inline-block"
        >
          {{ tag }}
        </div>
      </div>
    </a>
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
        'restart', // Restart playback
        'play', // Play/pause playback
        'progress', // The progress bar and scrubber for playback and buffering
        'mute', // Toggle mute
        'volume', // Volume control
        'fullscreen', // Toggle fullscreen
      ],
    }
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
        this.memes.forEach((i) => {
          if (i.name.includes('mp4') || i.name.includes('mov')) {
            // this.players.push(
            //   new Plyr('#meme-' + i.hash, { controls: this.controls })
            // )
          }
        })
      })
    })
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
