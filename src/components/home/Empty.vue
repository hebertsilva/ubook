<template>
  <el-row>
    <el-col :span="24" align="center">
      <img src="~/static/ub-book.svg" alt="Ubook" class="mb20">

      <p class="mb20">
        Nenhum contato foi criado ainda.
      </p>

      <el-button type="success" round size="large" @click="toggleButton">
        <i class="el-icon-plus" />
        Criar contato
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    toggleButton () {
      this.$emit('updateDialog', {
        visible: true,
        update: false
      })
    }
  }
}
</script>
