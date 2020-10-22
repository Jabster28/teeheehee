<template>
  <div>
    <video
      v-if="
        $route.params.tags.includes('mp4') || $route.params.tags.includes('mov')
      "
      id="meme-video"
      :src="`http://teeheehee.club/memes/(${$route.params.hash}) ${$route.params.tags}`"
      onLoad="makeVideo"
    >
      <source
        :src="'/memes/' + $route.params.hash"
        :type="`video/${$route.params.tags.split('.')[1]}`"
      />
    </video>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '../../../../static/plyr.css'
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
        this.$route.params.tags.includes('mp4') ||
        this.$route.params.tags.includes('mov')
      ) {
        this.plyr = new Plyr('#meme-video')
      }
    })
  },
  validate({ params }) {
    // Must be a hash
    return (
      /^[0-9a-f]{5,40}$/.test(params.hash) &&
      /^([a-zA-Z0-9_-] ?\.?)*$/.test(params.tags)
    )
  },
})
</script>
