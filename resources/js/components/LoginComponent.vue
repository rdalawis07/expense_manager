<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="purple darken-2"
                dark
                flat
              >
                <v-toolbar-title>Expense Manager</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" :disabled="email.length <= 0 || password.length <= 0" 
                @click="doLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog v-model="dialogLoader" :persistent="true" width="300">
        <v-card color="primary" dark>
            <v-card-text>
              Please wait while fetching data.
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            dialogLoader: false,
        }   
    },

    methods: {
        doLogin(){
            let loginParams = {
                email: this.email,
                password: this.password
            };

            this.dialogLoader = true;

            this.$axios({method: 'get', url: '/api/user-login', params: loginParams})
            .then(result => {
                if(result.data[0].id){
                    localStorage.setItem('user', JSON.stringify(result.data));
                    this.$router.push('/app');
                }else{
                    this.$swal.fire(
                        'Failed',
                        'Invalid Account Credential.',
                        'error'
                    );
                }
                
                this.dialogLoader = false;
            }).catch(err => {
                this.$swal.fire(
                    'Failed',
                    'Something went wrong. Please check your connection.',
                    'error'
                );
                this.dialogLoader = false;
            });

        }
    }
}
</script>