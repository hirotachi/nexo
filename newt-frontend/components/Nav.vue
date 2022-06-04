<template>
  <div class="nav">
    <SubNav />
    <div class="main">main nav</div>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
