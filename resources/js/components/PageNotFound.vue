<template>
<v-app>
  <v-container fill-height justify-center align-center class="div-container">
    <div class="p-container">
      <p class="display-4 font-italic font-weight-bold">Error 404</p>
      <p class="display-3 font-weight-medium">Page Not Found</p>
      <v-btn x-large dark color="indigo darken-4" @click="goBack">
        Go Back 
        <v-icon>
          mdi-reply
        </v-icon>
      </v-btn>
    </div>
  </v-container>
</v-app>
</template>
<script>
export default {
    methods: {
        goBack(){
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.div-container{
    background: url('/images/undraw_not_found_60pq.svg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;   
}

.p-container p:nth-child(1){
    color: #B71C1C;
}

</style>