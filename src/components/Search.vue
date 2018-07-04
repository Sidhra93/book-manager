<template>
  <div class="my-container">
    <table>
      <td>
        <input type="text" class="form-control" v-model="search" placeholder="Search">
      </td>
      <td>
        <button class="btn btn-primary" @click="searchBook">Search</button>
      </td>
    </table>
    <div class="search-results" v-show="searchResults">
      <h4>-Search Results-</h4>
      <h6 v-show="filteredBooks.length === 0"> No Results Found</h6>
      <table class="table" v-show="filteredBooks.length > 0">
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          <tr v-for="(book, index) in filteredBooks" :key="index">
            <td><a :href="book.url">{{book.title}}</a></td>
            <td>{{book.author}}</td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
import app from '../firebase'

let db = app.database()
let booksRef = db.ref('books')

export default {
  data () {
    return {
      search: '',
      filteredBooks: [],
      searchResults: false
    }
  },
  firebase: {
    books: booksRef
  },
  methods: {
    searchBook () {
      this.searchResults = true
      if (!this.search) return
      this.filteredBooks = this.books.filter(book => {
        if (book.title.toLowerCase().includes(this.search.toLowerCase())) {
          return book
        } else if (book.author.toLowerCase().includes(this.search.toLowerCase())) {
          return book
        }
      })
    }
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
