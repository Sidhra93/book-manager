<template>
  <div class="my-container">
    <p v-if="!bookDescription">No Description</p>
    <p>{{ bookDescription }}</p>
  </div>
</template>

<script>
import app from '../firebase'

let db = app.database()
let booksRef = db.ref('books')

export default {
  data () {
    return {
      bookDescription: ''
    }
  },
  firebase: {
    books: booksRef
  },
  mounted () {
    this.books.forEach(book => {
      if (book['.key'] === this.$route.params.id) {
        this.bookDescription = book.description
      }
    })
    // this.bookDescription = this.$route.params.id
  }
}
</script>

<style scoped>
  .my-container {
    width: 500px;
    margin-top: 0;
    margin-left: 30px;
  }
</style>
