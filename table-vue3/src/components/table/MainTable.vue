<template>
  <div class="table">
    <div>Back to
      <router-link :to="{ name: 'homepage' }">
        <i class="material-icons home-icon">home</i>
      </router-link>
    </div>

    <div class="select-bar">
      <select
        class="select-bar__columns"
        v-model="columnTitle"
        placeholder="Choose column"
      >
        <option class="option__title" label="Choose column" value="" disabled></option>
        <option
          v-for="column in columns"
          :key="column"
          :label="column"
          :value="column"
        ></option>
      </select>

      <select
        class="select-bar__options"
        v-model="optionType"
        placeholder="Choose option"
      >
        <option class="option__title" label="Choose option" value="" disabled></option>
        <option
          v-for="option in options"
          :key="option"
          :label="option"
          :value="option"
        ></option>
      </select>

      <div class="search-bar">
      <input type="search" v-model="searchValue" placeholder="Search value">
      <i class="material-icons" @click="clearSearch()">close</i>
      </div>
    </div>

    <div class="table__header">
      <p>Name <i class="material-icons" @click="sort('name')">sort</i> </p>
      <p>Quantity <i class="material-icons" @click="sort('quantity')">sort</i></p>
      <p>Distance <i class="material-icons" @click="sort('distance')">sort</i></p>
      <p>Date <i class="material-icons sort-date">sort</i></p>
    </div>

    <div class="table__body">
      <TableRow
        v-for="row in sortedItems"
        :key="row.id"
        :row_data="row"
      />
    </div>

    <div class="table__pagination">
      <button
        class="btn-page btn-prevPage"
        @click="prevPage"
        v-if="sortedItems.length > 0"
      >
        <img src="../../assets/arrow-black-left.svg" alt="">
      </button>
      <div class="pages">
        <div
          class="page"
          v-for="page in pages"
          :key="page"
          :class="{'page__active': page === currentPage}"
          @click="pageClick(page)"
          >
          {{ page }}
        </div>
      </div>
      <button
        class="btn-page btn-nextPage"
        @click="nextPage"
        v-if="sortedItems.length > 0"
      >
        <img src="../../assets/arrow-black-right.svg" alt="">
      </button>
    </div>
  </div>

</template>

<script>
import TableRow from './TableRow.vue'

export default {
  name: "MainTable",
  components: {
    TableRow
  },
  props: {
  },
  data() {
    return {
      itemsPerPages: 15,
      currentPage: 1,
      currentSort: 'name',
      currentSortDir:'asc',
      columnTitle: '',
      columns: [ 'name', 'quantity', 'distance' ],
      optionType: '',
      options: [ 'include', '>', '<', '=' ],
      searchValue: '',
      sortedProducts: [],
    }
  },
  mounted() {
    this.$store.dispatch('getTracks')
  },
  computed: {
    tableData() {
      return this.$store.state.tracks
    },
    pages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPages);
    },
    filteredItems() {
      if (this.columnTitle === 'name' && this.optionType === 'include') {
        return [...this.tableData].filter( item =>
          { return item.name.toLowerCase().includes(this.searchValue.toLowerCase())
        })
      } else if (this.columnTitle === 'name' && this.optionType === '=' && this.searchValue !== '') {
        return [...this.tableData].filter( item => {
          return item.name === this.searchValue;
        })
      } else if (this.optionType === '>') {
        return [...this.tableData].filter( item => {
        return item[this.columnTitle] > +this.searchValue;
      })
      } else if (this.optionType === '<') {
        return [...this.tableData].filter( item => {
          return item[this.columnTitle] < +this.searchValue;
        })
      } else if (this.optionType === '=' && this.searchValue !== '') {
        return [...this.tableData].filter( item => {
          return item[this.columnTitle] === +this.searchValue;
        })
      }
      return [...this.tableData]
    },
    sortedItems() {
      return [...this.filteredItems].sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((item, index) => {
        let start = (this.currentPage - 1) * this.itemsPerPages;
        let end = this.currentPage * this.itemsPerPages;
        if(index >= start && index < end) return true;
      });
    }
  },
  methods: {
    sort(column) {
      //if column == current sort, reverse
      if(column === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else this.currentSortDir = 'asc';
      this.currentSort = column;
    },
    pageClick(page) {
      this.currentPage = page;
    },
    clearSearch() {
      this.searchValue = '';
    },
    nextPage() {
      if(this.currentPage < this.pages) this.currentPage++;
    },
    prevPage() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
}
</script>

<style lang="scss">
.table {
  max-width: 900px;
  margin: 0 auto;
  &__header {
    display: flex;
    justify-content: space-around;
  }
  &__body {
    position: relative;
  }
  &__header, &__body {
    border-bottom: solid 3px #e7e7e7;
    max-width: 700px;
    margin: 0 auto;
  }
  &__options {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin: 15px auto;
  }
  &__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    // position: relative;
  }
}
.option__title {
  font-weight: bold;
  background-color: #e7e7e7;
}
.page {
  padding: 8px;
  border: solid 2px #e7e7e7;
  margin-right: 5px;
  &:hover, &__active {
    background-color: #e7e7e7;
    cursor: pointer;
  }
}
.pages {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}
p {
  font-weight: bold;
  display: inline;
}
.material-icons {
  cursor: pointer;
  position: relative;
  top: 6px;
}
.material-icons.home-icon {
  font-size: 36px;
  margin-bottom: 30px;
  color: black;
}
select {
  width: 140px;
  height: 35px;
  padding: 4px;
  border-radius:4px;
  box-shadow: 2px 2px 8px #999;
  background: #eee;
  border: none;
  outline: none;
  display: inline-block;
  -webkit-appearance:none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}
input {
  width: 200px;
  height: 35px;
  padding: 10px;
  border-radius: 4px;
  background: #eee;
  border: none;
  outline: none;
  display: inline-block;
}
.btn-page {
  position: relative;
  background-color: transparent;
  border-style: none;
  margin: 0;
  padding: 0;
  z-index: 5;
  cursor: pointer;
}
.sort-date {
  visibility: hidden;
}
.select-bar {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  &__pages {
    width: 30px;
  }
}
</style>
