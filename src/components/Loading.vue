<template>
  <div class="loading">
      <span class="s"></span>
  </div>
</template>

<script>

export default {
    name: "loading",

};

</script>

<style>

.loading{
    top:0;
    z-index: 101;
    height: 80%;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

@keyframes spin {
    to {
        transform: rotateZ(360deg);
}
}

.s{
     display: block;
     height: 60px;
     width: 80%;
     width: 80%;
     margin: 0 auto;
     border: 3px solid transparent;
     border-top-color: #fff;
     border-bottom-color: #fff;
     animation: spin ease 1000ms infinite;
}

</style>