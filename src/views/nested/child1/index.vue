<template>
  <div class="app-content">
    this is page nested child1.
    <br />
    <y-button type="primary" class="mt-10" @click="$router.push(`${$route.path}/second`)">跳转至二级路由</y-button>
  </div>
</template>
