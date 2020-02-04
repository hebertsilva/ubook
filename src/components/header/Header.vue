<template>
  <el-row type="flex" align="middle" justify="center" class="ub-header" :gutter="20">
    <el-col :span="7" :xs="{span: 8}">
      <el-row :gutter="20" type="flex" align="middle" justify="center">
        <el-col :span="12" :lg="{span: 2}" align="left" class="site-logo">
          <picture>
            <source srcset="~/static/ub-logo-small.svg" media="(max-width: 1200px)">
            <img src="~/static/ub-logo.svg" alt="Ubook">
          </picture>
        </el-col>

        <el-col :span="12" :lg="{span: 22}" align="right">
          <el-button
            v-if="isContacts || isToggleDialog"
            type="success"
            round
            size="small"
            :circle="isResponsive"
            @click="handlerAddContact"
          >
            <i class="el-icon-plus" />
            <span class="hidden-xs-only">Criar contato</span>
          </el-button>
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="17" :xs="{span: 16}">
      <el-input
        v-model="search"
        size="small"
        placeholder="Buscar..."
        suffix-icon="el-icon-search"
        class="el-input-search"
        @keyup.native="handlerSearch"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    search: '',
    isResponsive: false,
    isToggleDialog: false
  }),
  computed: {
    ...mapState({
      contacts: state => state.contacts.data
    }),
    isContacts () {
      return !!this.contacts.length
    }
  },
  watch: {
    contacts (data) {
      this.isToggleDialog = !!data.length
    }
  },
  mounted () {
    this.checkResponsive()
    window.addEventListener('resize', () => this.checkResponsive())
  },
  methods: {
    checkResponsive () {
      this.isResponsive = window.innerWidth <= 768
    },
    handlerAddContact () {
      this.$store.dispatch('contacts/updateDialog', {
        visible: true,
        update: false
      })
    },
    handlerSearch (val) {
      this.$store.dispatch('contacts/searchContact', {
        search: this.search
      })
    }
  }
}
</script>

<style lang="scss">
.ub-header {
  padding: 16px 0;
}

.site-logo {
  font-size: 0;
}

::-webkit-input-placeholder,
:-ms-input-placeholder,
::placeholder {
  color: map-get($palette-colors, gray400) !important;
}

.el-input-search {
  .el-input__inner {
    background: map-get($palette-colors, gray300);
    border-color: map-get($palette-colors, gray300);
    color: map-get($palette-colors, gray400);
    font-size: map-get($text-size, small);;

    &:active, &:focus {
      border-color: transparent;

      + span i {
        color: map-get($palette-colors, gray400);
      }
    }
  }
}
</style>
