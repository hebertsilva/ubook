
<template>
  <el-dialog
    :title="dialog.update ? 'Editar contato' : 'Adicionar contato'"
    :visible.sync="dialog.visible"
    width="432px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="formContact"
      label-position="top"
      size="small"
      :model="ruleForm"
      :rules="rules"
      @submit.native.prevent="submitContactForm"
    >
      <el-form-item label="Nome" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="E-mail" prop="email">
        <el-input v-model="ruleForm.email" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Telefone" prop="phone">
        <el-col :span="10" :sm="{span: 12}">
          <el-input v-model="ruleForm.phone" v-mask="'(##) #####-####'" autocomplete="off" />
        </el-col>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="text" @click="handlerDialogFormContact">Cencelar</el-button>
      <el-button
        type="danger"
        size="small"
        :disabled="!(ruleForm.name && ruleForm.email && ruleForm.phone)"
        :loading="isLoading"
        round
        @click="submitContactForm"
      >
        Salvar
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmpty } from '~/utils/filters'
import { validateEmail } from '~/utils/validators'
import Validate from '~/mixins/validate'

export default {
  mixins: [Validate],
  props: {
    dialog: {
      type: Object,
      required: true,
      default: () => {}
    },
    contact: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    isLoading: false,
    ruleForm: {
      name: '',
      email: '',
      phone: ''
    },
    rules: {
      name: {
        required: true,
        message: 'Nome é obrigatório',
        trigger: 'blur'
      },
      email: {
        required: true,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('E-mail é obrigatório'))
          }

          if (!validateEmail(value)) {
            callback(new Error('E-mail inválido'))
          }

          callback()
        }
      },
      phone: {
        required: true,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          const newValue = value.replace(/[^\d]+/g, '')
          if (newValue.length < 9) {
            callback(new Error('Telefone é obrigatório'))
          }

          callback()
        }
      }
    }
  }),
  watch: {
    dialog (data) {
      if (data.update) {
        this.ruleForm = Object.assign(this.ruleForm, this.contact)
      } else {
        this.isLoading = false
        this.ruleForm = {
          name: '',
          email: '',
          phone: ''
        }
      }

      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  },
  methods: {
    handlerDialogFormContact () {
      this.$emit('updateDialog', {
        visible: false,
        update: this.dialog.update
      })
    },
    async submitContactForm () {
      const valid = await this.validateForm('formContact')

      if (valid) {
        const { name, email, phone } = this.ruleForm
        const payload = {
          name,
          email,
          phone,
          id: !isEmpty(this.contact) ? this.contact.id : ''
        }

        this.isLoading = true
        this.$emit('submitFormContact', payload)
      }
    }
  }
}
</script>

<style lang="scss">
.el-dialog__body {
  padding-bottom: 10px;
}

.el-form {
  .el-form-item__label {
    font-size: map-get($text-size, base);
    color: map-get($palette-colors, black200);
    line-height: normal;
    padding: 0 0 5px;

    &:before {
      display: none;
    }
  }

  .el-input__inner {
    border-color: map-get($palette-colors, blue100);
    color: map-get($palette-colors, black200);
    border-radius: 4px;
  }
}

.el-button--text {
  color: map-get($palette-colors, red100);
  font-weight: bold;

  &:hover {
    color: darken(map-get($palette-colors, red100), 5%);
  }

  &:active {
    color: darken(map-get($palette-colors, red100), 5%);
  }
}
</style>
