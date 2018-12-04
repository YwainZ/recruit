<template>
    <div>
      <button @click="postMess">woshihhhah</button>
    </div>
</template>
<script>
  export default{
    methods: {
      postMess() {
        this.$emit('getmess', 'hahah');
      }
    }
  }
</script>
