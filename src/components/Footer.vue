<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <span class="text-muted">Maxim, aniright, animecoder, viiprogrammer © {{ new Date().getFullYear() }} Никакие права не защищены :(</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  footer {
    background-color: #222;
  }
</style>
