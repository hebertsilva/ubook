export default {
  methods: {
    validateForm (ref) {
      return new Promise((resolve) => {
        this.$refs[ref].validate(valid => resolve(valid))
      })
    },
    validateField (ref, field) {
      return new Promise((resolve) => {
        this.$refs[ref].validateField(field, valid => resolve(valid))
      })
    },
    resetForm (ref) {
      return new Promise((resolve) => {
        return resolve(this.$refs[ref].resetFields())
      })
    }
  }
}
