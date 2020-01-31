<template>
  <div>
    <empty-vue v-if="!isContacts" @updateDialog="handlerDialogFormContact" />
    <list-vue
      v-if="isContacts"
      :contacts="contacts"
      :highlight="newContactId"
      :search="search"
      @edit="showEditContact"
      @remove="showRemoveContact"
    />
    <form-contact-vue
      :contact="contact"
      :dialog="dialog"
      @updateDialog="handlerDialogFormContact"
      @submitFormContact="handlerSubmitContact"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmptyVue from '@/components/home/Empty'
import ListVue from '@/components/home/List'
import FormContactVue from '@/components/home/FormContact'

export default {
  components: {
    EmptyVue,
    ListVue,
    FormContactVue
  },
  data: () => ({
    contact: {}
  }),
  computed: {
    ...mapState({
      dialog: state => state.contacts.dialog,
      contacts: state => state.contacts.data,
      newContactId: state => state.contacts.newContactId,
      search: state => state.contacts.search
    }),
    isContacts () {
      return this.contacts.length
    }
  },
  methods: {
    handlerDialogFormContact (payload) {
      this.$store.dispatch('contacts/updateDialog', payload)
    },
    async handlerSubmitContact (payload) {
      if (this.dialog.update) {
        await this.$store.dispatch('contacts/editContact', { payload })
        this.showNotification('Atenção!', 'Contato editado com sucesso.')
      } else {
        this.$store.dispatch('contacts/addContact', { payload })
      }

      this.contact = {}
    },
    showEditContact (index) {
      this.contact = this.contacts[index]

      this.handlerDialogFormContact({
        visible: true,
        update: true
      })
    },
    showRemoveContact (id) {
      this.$confirm('Deseja realmente excluir o contato?', 'Excluir contato', {
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
        cancelButtonClass: 'el-button--text',
        confirmButtonClass: 'el-button--danger is-round',
        closeOnPressEscape: false,
        closeOnClickModal: false,
        showClose: false
      }).then(() => {
        this.$store.dispatch('contacts/removeContact', id)
        this.showNotification('Atenção!', 'Contato deletado com sucesso.')
      })
    },
    showNotification (title, message) {
      this.$notify({
        title,
        message,
        type: 'success',
        position: 'bottom-right',
        duration: 3000
      })
    }
  }
}
</script>
