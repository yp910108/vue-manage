<template>
  <svg v-on="$listeners" aria-hidden="true" class="i-icon">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'IIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.i-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
