<template>
  <el-container>
    <el-header>
      <header-vue />
    </el-header>

    <el-container>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderVue from '@/components/header/Header'

export default {
  components: {
    HeaderVue
  }
}
</script>

<style lang="scss">
body, html {
  @include font(1);
  background: map-get($palette-colors, gray200);
  color: map-get($palette-colors, black200);
}
</style>
