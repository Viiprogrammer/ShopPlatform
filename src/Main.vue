<template>
  <div>
    <Header v-bind:shopLogo="shopLogo" v-bind:menuLinks="menuLinks" v-bind:shopName="shopName"/>
    <main>
      <div class="container mt-3">
        <h4>Товары</h4>
        <div class="mb-4 bg-dark rounded-3">
          <div class="container-fluid py-4">
            <div class="d-grid gap-2">
              <GoodsList v-bind:currencies="currencies" v-bind:goodsList="goodsList"/>
              <hr>
              <OrderPanel v-bind:fundsList="fundsList" v-bind:goodsList="goodsList"/>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList.vue'
import OrderPanel from '@/components/OrderPanel.vue'

export default {
  name: 'Main',
  components: {
    GoodsList,
    OrderPanel
  },
  methods: {},
  data () {
    return {
      shopName: "ShopName",
      shopLogo: 'https://via.placeholder.com/150x30?text=LOGO',
      currencies: {
        dollar: '$',
        rouble: 'Руб'
      },
      menuLinks: [{
        title: 'Контакты',
        path: '/contacts',
        icon: 'telephone-fill'
      }],
      fundsList: [{
        name: "WMZ",
        equal: 'dollar',
        disabled: false,
        default: true
      },{
        name: "WMR",
        equal: 'rouble',
        disabled: false,
      }],
      goodsList: new Array(20).fill({
        id: 1,
        preview: 'https://via.placeholder.com/50',
        title: 'Резиновые члены',
        description: "Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.Резиновые члены, новые, запакованные.",
        fullDescription: "fsdfsdfsdfsdfsdfsdfsdfsd",
        count: 1000,
        min: 1,
        max: 3,
        type: "STRINGS",
        prices: {
          dollar: 100.00,
          rouble: 6000.00,
        }
      })
    }
  }
}
</script>

<style>
body {
  background: #373737;
  color: white;
}
</style>
