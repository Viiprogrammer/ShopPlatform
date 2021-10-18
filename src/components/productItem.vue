<template>
  <tr>
    <td>
      <img v-if="params.preview" width="50" height="50" class="previewImage rounded mx-auto d-block" v-bind:src="params.preview" v-bind:alt="params.description">
    </td>
    <td>{{ params.title }}</td>
    <td v-on:click="showDescription" class="description">
      {{ params.description.length > 150 ? params.description.substr(0, 100) + '...' : params.description}}
      <i class="bi bi-info-circle-fill"></i>
    </td>
    <td>{{ params.count }} шт.</td>
    <td>{{ params.prices[currency] }} {{ currencies[currency] }} за шт.</td>
  </tr>
</template>

<script>
export default {
  name: "productItem",
  methods: {
    showDescription () {
      this.$swal({
        title: this.params.title,
        html: this.params.fullDescription,
        text: !this.params.fullDescription ? this.params.description : undefined,
        showCloseButton: true,
        showConfirmButton: false
      });
    }
  },
  props: {
    params: {
      type: Object,
      required: true
    },
    currencies: {
      type: Object,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .description {
    cursor: pointer;
    width: 60%;
  }
</style>
