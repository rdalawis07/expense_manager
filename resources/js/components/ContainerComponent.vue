<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list three-line dense class="pb-0">
        <v-list-item @click="dialogChangePassword = true">
            <v-list-item-avatar class="pt-2">
                <v-icon>mdi-account-circle mdi-48px</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2 pt-3">{{ userInformation[0].name }}</v-list-item-title>
                <v-list-item-subtitle class="body-2">{{ userInformation[0].role_name  }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-item :class="{'selected-module': '/app/dashboard' === $route.path}" @click="changeRoute('/app/dashboard')">
            <v-list-item-action>
                <v-icon>mdi-chart-pie</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-group prepend-icon="mdi-account-box" v-show="userInformation[0].role_name.includes('ADMIN')">
                <template v-slot:activator>
                    <v-list-item-title>User Management</v-list-item-title>
                </template>
                <v-list-item class="ml-5" :class="{'selected-module': '/app/role' === $route.path}" @click="changeRoute('/app/role')">
                    <v-list-item-content>
                        <v-list-item-title>Roles</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="ml-5" :class="{'selected-module': '/app/user' === $route.path}" @click="changeRoute('/app/user')">
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-group prepend-icon="mdi-account-box">
                <template v-slot:activator>
                    <v-list-item-title>Expense Management</v-list-item-title>
                </template>
                <v-list-item class="ml-5" :class="{'selected-module': '/app/expense-category' === $route.path}" @click="changeRoute('/app/expense-category')" 
                    v-show="userInformation[0].role_name.includes('ADMIN')">
                    <v-list-item-content>
                        <v-list-item-title>Expense Categories</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="ml-5" :class="{'selected-module': '/app/expenses' === $route.path}"  @click="changeRoute('/app/expenses')">
                    <v-list-item-content>
                        <v-list-item-title>Expenses</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="purple darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex flex-row body-2 mt-5">
          <p class="pa-1 pr-2">Welcome to Expense Manager</p>
          <v-btn small color="red" @click="doLogout()">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <transition name="fade-transition">
            <router-view name="main"></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer color="purple darken-2" app>
      <span class="white--text">Rando Dalawis &copy; 2020</span>
    </v-footer>
    <!-- Loader -->
    <v-dialog v-model="loading" persistent width="400">
        <v-card color="indigo" dark>
            <v-card-text>
                Please stand by. Your transaction is on process.
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- change password dialog -->
    <v-dialog v-model="dialogChangePassword" persistent width="400">
        <v-card>
            <v-card-title class="headline purple lighten-2" primary-title>
                Change Password
            </v-card-title>
            <v-card-text class="pt-5 pr-5 pl-5 pb-0">
                <v-form v-model="isFormValid">
                <v-text-field outlined dense label="Old Password" 
                        v-model="passwordObj.old_password" type="password" 
                        :rules="[rules.required]"/>
                <v-text-field outlined dense label="New Password" 
                        v-model="passwordObj.new_password" 
                        ref="password" type="password" 
                        :rules="[rules.required]"/>
                <v-text-field outlined dense label="Verify Password" 
                        v-model="passwordObj.verify_new_password" type="password" 
                        :rules="[rules.required, passwordConfirmationRule]"/>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" small @click="dialogChangePassword = false">Cancel</v-btn>
                <v-btn color="green" small @click="saveChangePassword()" 
                :disabled="!isFormValid || !passwordObj.old_password || !passwordObj.new_password || !passwordObj.verify_new_password">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
        isFormValid: false,
        drawer: null,
        dialogChangePassword: false,
        showOld: false,
        showNew: false,
        showVerify: false,
        passwordObj: {
            old_password: null,
            new_password: null,
            verify_new_password: null,
        },

        rules: {
            required: value => !!value || 'Required.',
        },
    }),

    created(){
        if(localStorage.getItem("user") != null){
            this.$store.dispatch('app/changeUserDetail', JSON.parse(localStorage.getItem("user")));
        }else{
            this.$router.push('/');
        }

        //for selected route
        if(localStorage.getItem("selected_route") != null){
            this.changeRoute(localStorage.getItem("selected_route"));
        }else{
            this.changeRoute('/app/dashboard');
        }
    },

    computed: {
        loading(){
            return this.$store.getters['app/loading'];
        },

        userInformation() {
            return this.$store.getters['app/user_detail'];
        },

        passwordConfirmationRule() {
            return () => (this.passwordObj.new_password === this.passwordObj.verify_new_password) || 'Password must match'
        },
    },


    methods: {
        changeRoute(selected_route){
            if(this.$route.path !== selected_route){
                this.$router.push(selected_route);
                localStorage.setItem("selected_route", selected_route);
            }
        },

        saveChangePassword(){
            this.$swal.fire({
                title: 'Change Password',
                text: "Are you sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.passwordObj.hashed_password = this.userInformation[0].password;
                    this.passwordObj.id = this.userInformation[0].id;
                    this.$axios({method: 'put', url: '/api/users/editpassword', params: this.passwordObj})
                    .then(result => {
                        this.$swal.fire(
                            result.data.api_header,
                            result.data.message,
                            result.data.api_status
                        );
                        this.dialogChangePassword = false;
                        this.$store.dispatch('app/changeLoading', false);
                    }).catch(err => {
                        this.$swal.fire(
                            'Failed',
                            'Something went wrong. Please check your connection.',
                            'error'
                        );
                        this.$store.dispatch('app/changeLoading', false);
                    });
                }
            });
        },

        doLogout(){
            this.$swal.fire({
                title: 'Logout',
                text: "Are you sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    localStorage.removeItem("selected_route");
                    localStorage.removeItem("user");
                    this.$router.push('/');
                }
            });
        }
    }
  }
</script>
<style scoped>
.selected-module {
    background: #90A4AE;
}
</style>