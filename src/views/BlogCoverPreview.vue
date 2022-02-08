<template>
  <div class="modal" ref="modal">
      <div class="modal-content">
          <close @click="closePreview" class="icon" />
          <img :src="this.blogCoverPhoto" alt=""/>
      </div>
  </div> 
</template>

<script>
import close from "../assets/Icons/times-circle-light.svg";

export default {
    components: {
        close,
    },
    methods: {
        closePreview(){
            this.$store.commit("openPhotoPreview");
        },
    },
    computed:{
        blogCoverPhoto(){
            return this.$store.state.blogPhotoFileURL;
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
    width: 450px;
    padding: 40px 30px;
    background-color: #fff;
    /*margin: 631px 0 0 -853px; Para centrar el modal en la pantalla */
    margin: 213px 0 0 -372px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.icon{
    width: 24px;
    height: auto;
    cursor: pointer;
    font-size: 24px;
    position: initial;
    top: 15px;
    right: 15px;
    color: #303030;
}

.img{
    margin-top: 24px;
    display: block;
    width: auto;
    height: 100%;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
img{
    margin-top: 16px;
    display: block;
    width: auto;
    height: 100%;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
/*
p{
    text-align: center;
}
button{
    align-self: center;
}*/

</style> 
