import { parseContact, removeContact } from '~/parses/contacts'
import { setStorage, getStorage } from '~/utils/storage'

export const state = () => ({
  data: [],
  dialog: {
    visible: false,
    update: false
  },
  newContactId: '',
  search: ''
})

export const getters = {

}

export const mutations = {
  updateDialog (state, data) {
    state.dialog = data
  },
  updateContact (state, data) {
    state.data = data
    state.dialog = {
      visible: false,
      update: false
    }
  },
  setNewContactId (state, id) {
    state.newContactId = id
  },
  updateSeacrh (state, string) {
    state.search = string
  }
}

export const actions = {
  updateDialog ({ commit }, payload) {
    commit('updateDialog', payload)
  },
  addContact ({ commit, rootState }, { payload }) {
    const contact = parseContact(payload)
    const newPayload = [
      contact,
      ...rootState.contacts.data
    ]

    commit('setNewContactId', contact.id)
    commit('updateContact', newPayload)
    setStorage(newPayload)
  },
  editContact ({ commit, rootState }, { payload }) {
    const { data } = rootState.contacts
    const contacts = [
      ...data
    ]
    const currentId = data.findIndex(item => item.id === payload.id)

    contacts[currentId] = {
      ...contacts[currentId],
      ...payload
    }

    commit('updateContact', contacts)
    setStorage(contacts)
  },
  removeContact ({ commit, rootState }, payload) {
    const { data } = rootState.contacts
    const newPayload = removeContact(data, payload)

    commit('updateContact', newPayload)
    setStorage(newPayload)
  },
  searchContact ({ commit }, payload) {
    commit('updateSeacrh', payload.search)
  },
  getContacts ({ commit }) {
    if (process.client) {
      commit('updateContact', getStorage())
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
