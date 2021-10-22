<template>
  <div class="table-responsive">
    <table class="table table-dark table-striped">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Товар</th>
        <th scope="col">Описание</th>
        <th scope="col">Количество</th>
        <th scope="col">
          Цена
          <div class="float-end d-inline">
            <a data-curr="rouble" v-on:click="currencyChange" class="currency" href="#">₽</a>
            |
            <a class="currency" v-on:click="currencyChange" data-curr="dollar" href="#">$</a>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="goodsList.length">
        <template v-for="category in goodsList" >
          <tr v-bind:key="'category' + category.id" class="category text-center">
            <td colspan="100">{{ category.title }}</td>
          </tr>
          <productItem
              v-bind:currency="currency"
              v-bind:currencies="currencies"
              v-bind:key="product.id"
              v-bind:params="product"
              v-for="product in category.products"
          />
        </template>
      </tbody>
      <tbody v-else>
        <tr class="category text-center">
          <td colspan="100">Товара нет в наличии</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import productItem from '@/components/productItem'
export default {
  name: "GoodsList",
  data () {
    return {
      currency: 'dollar'
    }
  },
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
    currencies: {
      type: Object,
      required: true
    }
  },
  components: {
    productItem
  },
  methods: {
    currencyChange: function () {
      this.currency = event.target.getAttribute('data-curr');
    }
  }
}
</script>

<style scoped>
 .currency {
   text-decoration: none;
   color: var(--bs-primary);
 }
 .currency:hover {
   text-decoration: none;
   color: var(--bs-info);
 }
 .currency-selected {
   color: var(--bs-info);
 }
 .previewImage {
   max-width: 50px;
   max-height: 50px;
 }
</style>
