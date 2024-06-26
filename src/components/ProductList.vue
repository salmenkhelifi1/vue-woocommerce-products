<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">chaktech.tn Products</h1>

    <!-- Search Section -->
    <div class="search-container flex mb-4 space-x-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
        class="border p-2 flex-grow max-w-60"
      />
      <button @click="searchProducts" class="bg-blue-500 text-white p-2 ml-2 rounded">
        Search
      </button>
    </div>

    <!-- Product Listing Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-if="loading" class="text-center">
        Loading products...
      </div>
      <div v-else-if="products.length === 0 && !loading" class="text-center">
        No products found.
      </div>
      <div v-else class="product bg-white p-4 rounded-lg shadow" v-for="product in paginatedProducts" :key="product.id">
        <img
          :src="product.images.length ? product.images[0].src : 'placeholder-image-url.jpg'"
          :alt="product.name"
          class="h-64 object-cover mb-4 rounded"
          loading="lazy"
        />
        <div>
          <h2 class="text-xl font-bold mb-2">{{ product.name }}</h2>
          <p class="text-gray-700 font-bold">Price: DT {{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination Section -->
    <div class="pagination flex-wrap flex justify-center mt-4 rounded" v-if="totalPages > 1">
      <button
        v-for="page in totalPagesArray"
        :key="page"
        @click="fetchProducts(page)"
        :class="{ 'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage }"
        class="mx-1 p-2 border rounded"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',

  data() {
    return {
      currentPage: 1,
      productsPerPage: 20, // Adjusting for demo purposes
      searchQuery: "",
      products: [], // Array to hold all products
      totalPages: 0,
      loading: false
    };
  },

  mounted() {
    this.fetchProducts(); // Fetch products when component is mounted
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.products.slice(start, end);
    },
    totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  },

  methods: {
    async fetchProducts(page = 1) {
      this.loading = true;
      this.currentPage = page;

      try {
        console.log('Fetching products...');
        // Simulating fetching data.json locally
        const response = await axios.get('/data.json');
        console.log('Response:', response);

        let products = response.data;
        console.log('Products:', products);

        // Filter by search query
        if (this.searchQuery) {
          products = products.filter(product =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }

        this.products = products;

        // Calculate total pages
        this.totalPages = Math.ceil(products.length / this.productsPerPage);
        console.log('Total Pages:', this.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    searchProducts() {
      this.fetchProducts(1); // Reset to first page when searching
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
