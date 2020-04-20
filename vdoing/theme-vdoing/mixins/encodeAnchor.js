export default {
  methods: {
    encodeAnchor(str) {
      str = str.replace(/ |((?=[\x21-\x7e]+)[^A-Za-z0-9])/g, '-')
      return str
    },
  }
}