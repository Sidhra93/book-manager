<template>
  <div class="my-container">
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
      if (book['.key'] === this.$router.params.id) {
        this.bookDescription = book.description
      }
    })
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
