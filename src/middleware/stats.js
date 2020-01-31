export default async function (ctx) {
  const { store } = ctx

  await store.dispatch('contacts/getContacts')
}
