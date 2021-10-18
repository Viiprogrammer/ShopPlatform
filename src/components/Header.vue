<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img v-if="shopLogo" v-bind:src="shopLogo" v-bind:alt="shopName" class="img-fluid">
        <span v-if="!shopLogo">{{ shopName }}</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-bind:key="link.path" v-for="link of menuLinks" class="nav-item">
            <router-link class="nav-link" v-bind:href="link.path" to="/contacts">
              <i v-if="link.icon" v-bind:class="['bi', 'bi-' + link.icon]"></i> {{ link.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Header",
  props: {
    shopName: {
      type: String,
      required: true
    },
    shopLogo: {
      required: true
    },
    menuLinks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
