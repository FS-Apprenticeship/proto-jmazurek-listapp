<script setup>

</script>

<template>
  <router-view />
</template>

<style scoped>
/* App-wide baseline */
:root {
  --bg: #f6f7f9;
  --fg: #1f1f1f;
  --accent: lightseagreen;
  --muted: #6b7280;
  --card: #ffffff;
}
* { box-sizing: border-box; }
html, body, #app { height: 100%; }
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--fg);
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}

</style>
