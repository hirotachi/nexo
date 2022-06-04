<template>
  <div class="nav">
    <div class="auth">
      <nuxt-link to="/login">Sign in</nuxt-link>
      <nuxt-link to="/register">create account</nuxt-link>
    </div>
    <span><i class="fa-solid fa-plus"></i></span>
  </div>
</template>

<script>
export default {
  name: "SubNav",
};
</script>

<style scoped lang="scss">
.nav {
  display: none;
  height: 3.5rem;
  align-items: center;
  border-bottom: 1px solid rgba($primary-border-color, 0.1);
  justify-content: space-between;
  font-size: 1.2rem;
  text-transform: uppercase;
  @include tablet {
    display: flex;
  }
}

.auth {
  gap: 1rem;
  display: none;
  @include tablet {
    display: flex;
  }
  a {
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
