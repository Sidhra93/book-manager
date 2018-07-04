<template>
  <div class="my-container">
    <div>
        <table class="table">
          <tr>
            <td>
              <span class="glyphicon glyphicon-plus" @click="(addForm = !addForm, editForm = false)"></span>
            </td>
          </tr>
          <tr>
            <th @click="sortTitle">Title</th>
            <th @click="sortAuthor">Author</th>
          </tr>
          <tr v-for="(book, index) in books" :key="index">
            <td><router-link :to="'/' + book['.key']">{{book.title}}</router-link></td>
            <td>{{book.author}}</td>
            <td>
              <span class="glyphicon glyphicon-edit" @click="editBook(book)"></span>
              <span class="glyphicon glyphicon-trash" @click="removeBook(book)"></span>
            </td>
          </tr>
        </table>
    </div>
    <hr>
    <form v-show="addForm">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Author</label>
        <input type="text" class="form-control" v-model="author">
      </div>
      <div class="form-group">
        <label>URL</label>
        <input type="text" class="form-control" v-model="url">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" v-model="description">
      </div>
      <button class="btn btn-primary" @click="addBook">ADD BOOK</button>
      <button class="btn btn-primary" @click="addForm = false">CANCEL</button>
    </form>
    <form v-show="editForm">
      <div class="form-group">
        <label>Key</label>
        <input type="text" class="form-control" v-model="key" disabled>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Author</label>
        <input type="text" class="form-control" v-model="author">
      </div>
      <div class="form-group">
        <label>URL</label>
        <input type="text" class="form-control" v-model="url">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" v-model="description">
      </div>
      <button class="btn btn-primary" @click="submitEdit">EDIT BOOK</button>
      <button class="btn btn-primary" @click="cancel">CANCEL</button>
    </form>
  </div>
</template>

<script>

import app from '../firebase'

let db = app.database()
let booksRef = db.ref('books')

export default {
  data () {
    return {
      key: '',
      title: '',
      author: '',
      url: '',
      description: '',
      editForm: false,
      addForm: false,
      titleAscending: false,
      authorAscending: false
    }
  },
  firebase: {
    books: booksRef
  },
  methods: {
    addBook () {
      booksRef.push({
        title: this.title,
        author: this.author,
        url: this.url,
        description: this.description
      })
      this.title = ''
      this.author = ''
      this.url = ''
      this.description = ''
    },
    removeBook (book) {
      booksRef.child(book['.key']).remove()
      console.log('removed ', book['.key'])
    },
    editBook (book) {
      this.addForm = false
      this.editForm = true
      this.key = book['.key']
      this.title = book.title
      this.author = book.author
      this.url = book.url
      this.description = book.description
    },
    submitEdit () {
      db.ref('books/' + this.key).update({title: this.title, author: this.author, url: this.url, description: this.description})
      this.editForm = false
      this.title = ''
      this.author = ''
      this.url = ''
    },
    cancel () {
      this.title = ''
      this.author = ''
      this.url = ''
      this.description = ''
      this.editForm = false
    },
    sortTitle () {
      this.titleAscending = !this.titleAscending
      if (this.titleAscending) {
        this.books.sort((a, b) => {
          return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
        })
      } else {
        this.books.sort((a, b) => {
          return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0)
        })
      }
    },
    sortAuthor () {
      this.authorAscending = !this.authorAscending
      if (this.authorAscending) {
        this.books.sort((a, b) => {
          return (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0)
        })
      } else {
        this.books.sort((a, b) => {
          return (a.author < b.author) ? 1 : ((b.author < a.author) ? -1 : 0)
        })
      }
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
  th {
    cursor: pointer;
  }
  th:hover {
    text-decoration: underline;
  }
</style>
