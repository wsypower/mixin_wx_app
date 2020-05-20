<template>
  <div class="skeleton1-wrapper">
    <img
      src="./banner.png"
      alt=""
    >
    <div class="make">
      <div class="make-warp">
        <div class="loader">
          <div class="outer"></div>
          <div class="middle"></div>
          <div class="inner"></div>
        </div>
      </div>

    </div>
  </div>

</template>
<style lang="scss" scoped>
.skeleton1-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f0f1f8;
}
img {
  width: 100%;
}
.make {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #1b1b1b78;
  z-index: 10;
}
.make-warp {
  width: 100%;
  height: 100%;
  position: relative;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.outer,
.middle,
.inner {
  border: 3px solid transparent;
  border-top-color: #3cefff;
  border-right-color: #3cefff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}

.outer {
  width: 3.5em;
  height: 3.5em;
  margin-left: -1.75em;
  margin-top: -1.75em;
  animation: spin 2s linear infinite;
}

.middle {
  width: 2.1em;
  height: 2.1em;
  margin-left: -1.05em;
  margin-top: -1.05em;
  animation: spin 1.75s linear reverse infinite;
}

.inner {
  width: 0.8em;
  height: 0.8em;
  margin-left: -0.4em;
  margin-top: -0.4em;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>