<template>
  <div>
    <video
      v-if="
        $route.query.tags.includes('mp4') || $route.query.tags.includes('mov')
      "
      id="meme-video"
      :src="`https://teeheehee.club/meme/(${$route.query.hash}) ${$route.query.tags}`"
      onLoad="makeVideo"
    >
      <source
        :src="`https://teeheehee.club/meme/(${$route.query.hash}) ${$route.query.tags}`"
        :type="`video/${$route.query.tags.split('.')[1]}`"
      />
    </video>
    <img
      :src="`https://teeheehee.club/meme/(${$route.query.hash}) ${$route.query.tags}`"
      :alt="$route.query.tags"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '../static/plyr.css'
import Plyr from 'plyr'
export default Vue.extend({
  data(): { plyr: Plyr | undefined } {
    return {
      plyr: undefined,
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (
        this.$route.query.tags.includes('mp4') ||
        this.$route.query.tags.includes('mov')
      ) {
        this.plyr = new Plyr('#meme-video')
      }
    })
  },
})
</script>
