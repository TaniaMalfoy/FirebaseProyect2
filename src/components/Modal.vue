<template>
  <div class="modal">
      <div class="modal-content">
          <p>{{ this.modalMessage }}</p>
          <button v-on:click="closeModal"> Close </button>
      </div>
  </div> 
</template>

<script>
export default {
    props:["modalMessage"],
    methods: {
        closeModal(){
            this.$emit("close-modal");
        },
    },

};
</script>

<style>
.modal{
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    width: 100%;
    /*height:100%;*/
    top: 0;
    background-color: rbga(0,0,0,0.7);
    height: fit-content;
}

.modal-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    margin: 631px 0 0 -853px; /*Para centrar el modal en la pantalla */
}

p{
    text-align: center;
}
button{
    align-self: center;
}

</style>