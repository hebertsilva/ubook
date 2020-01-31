<template>
  <el-table
    ref="elTable"
    :data="contacts.filter(item => !search || item.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    header-cell-class-name="header-cell"
    :row-class-name="tableHighlightItem"
  >
    <el-table-column
      type="index"
      width="50"
      align="center"
    >
      <el-avatar slot-scope="scope" size="small" :class="`style-${scope.row.firstChar.toLocaleLowerCase()}`">
        {{ scope.row.firstChar }}
      </el-avatar>
    </el-table-column>

    <el-table-column
      prop="name"
      label="Contatos"
      min-width="250"
    />

    <el-table-column
      prop="email"
      label="E-mail"
      min-width="250"
    />

    <el-table-column
      label="Telefone"
      min-width="130"
      prop="phone"
    />

    <el-table-column
      width="80"
      align="center"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-tooltip content="Editar" placement="top">
          <el-button type="text" @click="handlerEditContact(scope.$index)">
            <img src="~/static/ub-edit.svg" alt="Editar">
          </el-button>
        </el-tooltip>

        <el-tooltip content="Excluir" placement="top">
          <el-button type="text" @click="handlerRemoveContact(scope.row.id)">
            <img src="~/static/ub-delete.svg" alt="Excluir">
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { VueMaskDirective } from 'v-mask'
import { sleep } from '~/utils/filters'

export default {
  directives: { VueMaskDirective },
  props: {
    contacts: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    highlight: {
      type: String,
      required: false,
      default: () => ''
    },
    search: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data: () => ({
    classNameHighlight: 'row-active'
  }),
  methods: {
    tableHighlightItem ({ row, rowIndex }) {
      if (row.id === this.highlight) {
        this.startSleepHighlight()
        return this.classNameHighlight
      }
    },
    async startSleepHighlight () {
      await sleep(10000)
      const el = document.getElementsByClassName(this.classNameHighlight)

      for (let i = 0; i < el.length; i++) {
        if (el[i]) {
          el[i].classList.remove(this.classNameHighlight)
        }
      }
    },
    handlerEditContact (index) {
      this.$emit('edit', index)
    },

    handlerRemoveContact (id) {
      this.$emit('remove', id)
    }
  }
}
</script>

<style lang="scss">
.el-table {
  border: 1px solid map-get($palette-colors, gray100);
  border-radius: 4px;
  overflow: hidden;

  .el-button span {
    font-size: 0;
    line-height: normal;
  }

  .el-table__row {
    td {
      border-color: map-get($palette-colors, gray100) !important;
      padding: 8.5px 0 !important;

      .cell {
        color: map-get($palette-colors, black200);
        font-size: 14px;
        font-stretch: normal;
        font-style: normal;
        line-height: 21px;
        letter-spacing: normal;
      }
    }

    &:hover,
    &.hover-row {
      td {
        background: map-get($palette-colors, pink100) !important;
      }
    }

    &.row-active {
      td {
        background: map-get($palette-colors, pink100) !important;
        transition: background;
      }
    }
  }
}

.header-cell {
  color: map-get($palette-colors, gray400);
  border-color: map-get($palette-colors, gray100) !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 9px 0 !important;
}

$colors: (
  a: #fa8d68,
  b: #90d26c,
  c: #68a0fa,
  d: #fab668,
  e: #8368fa,
  f: #fa68b5,
  g: #5fe2c4,
  h: #f55a5a,
  i: #e4e7f4,
  j: #686dfa,
  k: #fa8d68,
  l: #eee,
  m: #fa7268,
  n: #e4e7f4,
  o: #dbff90,
  p: #90d26c,
  q: #c0c3d2,
  r: #fff3f2
);

@each $color, $value in $colors {
  .style-#{$color} {
    background-color: $value;
  }
}
</style>
