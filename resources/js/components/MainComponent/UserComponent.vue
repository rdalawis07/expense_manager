<template>
<div>
    <v-row>
        <v-col cols="6">
            <div class="title">Users</div>
        </v-col>
        <v-col cols="6">
            <v-breadcrumbs :items="items" 
                class="indigo--text font-weight-black pa-0 pt-2 d-flex justify-end">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card class="elevation-1">
                <v-card-title class="pa-2 ma-0">
                    <v-row no-gutters>
                        <v-col cols="8"> <v-btn color="primary" small @click="create"><v-icon>mdi-plus</v-icon> Add User</v-btn> </v-col>
                        <v-col cols="4">
                            <v-text-field outlined dense v-model="search" 
                            label="Search" prepend-icon="mdi-magnify"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-data-table class="ml-5 elevation-1" :search="search" 
                        :items="userList" :headers="headers">
                        <template v-slot:item="{ item }">
                            <tr @click="editRow(item)">
                                <td class="subtitle-2 text-left">{{ item.name }}</td>
                                <td class="subtitle-2 text-left">{{ item.email }}</td>
                                <td class="subtitle-2 text-left">{{ item.password.substring(1,10) + '..' }}</td>
                                <td class="subtitle-2 text-left">{{ item.role_name }}</td>
                                <td class="subtitle-2 text-left">{{ moment(item.created_at).format("YYYY-MM-DD") }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <!-- DIALOG CREATE/EDIT-->
    <v-dialog v-model="dialog" persistent width="400">
        <v-card>
            <v-card-title class="headline purple lighten-2" primary-title v-if="isCreate">
                Add User
                </v-card-title>
                <v-card-title class="headline purple lighten-2" primary-title v-else>
                Update User
                </v-card-title>
                <v-card-text class="pt-5 pr-5 pl-5 pb-0">
                    <v-form v-model="isFormValid">
                    <v-text-field outlined dense label="Name" 
                        v-model="userObj.name" :rules="[rules.required]"/>
                    <v-text-field outlined dense label="Email Address" 
                        v-model="userObj.email" type="email" 
                        :rules="[rules.required, rules.email]"/>
                    <v-text-field outlined dense label="Password" 
                        v-model="userObj.password" type="password" :rules="[rules.required]"/>
                    <v-select 
                        v-model="userObj.role_id"
                        :items="roleList"
                        item-text="name"
                        item-value="id"
                        label="Role"
                        :rules="[rules.required]"
                        outlined dense></v-select>
                    </v-form>
                </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" small @click="saveDelete()" v-show="isCreate === false && isVisibleControl">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey" small @click="dialog = false">Cancel</v-btn>
                <v-btn color="green" small v-if="isCreate" @click="saveCreate()" 
                :disabled="!isFormValid || !userObj.name || !userObj.email || !userObj.password || !userObj.role_id">Save</v-btn>
                <v-btn color="indigo" small v-else @click="saveEdit()" 
                :disabled="!isFormValid || !userObj.name || !userObj.email || !userObj.password || !userObj.role_id" v-show="isVisibleControl">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>
<script>
export default {
    data(){
        return {
            isFormValid: false,
            moment: moment,
            isVisibleControl: true,
            dialog: false,
            search: '',
            roleList: [],
            userList: [],
            isCreate: false,
            items: [
                {
                    text: 'User Management',
                    disabled: false,
                },
                {
                    text: 'Users',
                    disabled: false,
                },
            ],
            headers: [
				{ text: 'Name', align: 'left', value: 'name', sortable: true},
                { text: 'Email', align: 'left', value: 'email', sortable: true},
                { text: 'Password', align: 'left', value: 'password', sortable: true},
                { text: 'Role', align: 'left', value: 'role_name', sortable: true},
	          	{ text: 'Created At', align: 'left', value: 'created_at', sortable: true},
            ],
            userObj: {
                id: null,
                password: null,
                name: null,
                email: null,
                role_id: null,
                role_name: null
            },
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
        }
    },

    created(){
        this.fetchRole();
        this.fetchUsers();
    },

    methods: {
        fetchRole(){
            this.roleList = [];
            this.$axios({method: 'get', url: '/api/roles'})
            .then(result => {
                if(result.data.length > 0){
                   this.roleList = result.data;
                }
            }).catch(err => {
                this.$swal.fire(
                    'Failed',
                    'Something went wrong. Please check your connection.',
                    'error'
                );
            });
        },

        fetchUsers(){
            this.$store.dispatch('app/changeLoading', true);
            this.userList = [];
            this.$axios({method: 'get', url: '/api/users'})
            .then(result => {
                if(result.data.length > 0){
                   this.userList = result.data;
                }else{
                    this.$swal.fire(
                        'Warning',
                        'No Data Found.',
                        'warning'
                    );
                }
                this.$store.dispatch('app/changeLoading', false);
            }).catch(err => {
                this.$swal.fire(
                    'Failed',
                    'Something went wrong. Please check your connection.',
                    'error'
                );
                this.$store.dispatch('app/changeLoading', false);
            });
        },

        create(){
            this.isCreate = true;
            this.userObj.id = null;
            this.userObj.name = null;
            this.userObj.email = null;
            this.userObj.password = null;
            this.userObj.role_id = null;
            this.userObj.role_name = null;
            this.dialog = true;
        },

        editRow(item){
            if(item.role_name.includes('ADMIN')){
                this.isVisibleControl = false;
            }else{
                this.isVisibleControl = true;
            }
            this.isCreate = false;
            this.userObj.id = item.id;
            this.userObj.name = item.name;
            this.userObj.email = item.email;
            this.userObj.password = item.password;
            this.userObj.role_id = item.role_id;
            this.userObj.role_name = item.role_name;
            this.dialog = true;
        },

        saveCreate(){
            this.$swal.fire({
                title: 'Save User',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'post', url: '/api/users/create', params: this.userObj})
                    .then(result => {
                        this.userList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully add User.',
                            'success'
                        );

                        this.dialog = false;
                        this.$store.dispatch('app/changeLoading', false);
                    }).catch(error => {
                        this.$swal.fire(
                            'Failed',
                            'Something went wrong. Please try again later.',
                            'error'
                        );
                        this.$store.dispatch('app/changeLoading', false);
                    }); //end axios
                }
            });
        },

        saveEdit(){
            this.$swal.fire({
                title: 'Save Update User',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'put', url: '/api/users/update', params: this.userObj})
                    .then(result => {

                        this.userList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully Update User.',
                            'success'
                        );
                    
                        this.dialog = false;
                        this.$store.dispatch('app/changeLoading', false);
                    }).catch(error => {
                        this.$swal.fire(
                            'Failed',
                            'Something went wrong. Please try again later.',
                            'error'
                        );
                        this.$store.dispatch('app/changeLoading', false);
                    }); //end axios
                }
            });
        },

        saveDelete(){
            this.$swal.fire({
                title: 'Delete User',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'delete', url: '/api/users/delete', params: this.userObj})
                    .then(result => {
                        
                        this.userList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully add User.',
                            'success'
                        );

                        this.dialog = false;
                        this.$store.dispatch('app/changeLoading', false);
                    }).catch(error => {
                        this.$swal.fire(
                            'Failed',
                            'Something went wrong. Please try again later.',
                            'error'
                        );
                        this.$store.dispatch('app/changeLoading', false);
                    }); //end axios
                }
            });
        }
    }
}
</script>
<style scoped>
.row-clickable{
    cursor: pointer !important;
}
</style>