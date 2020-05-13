<template>
<div>
    <v-row>
        <v-col cols="6">
            <div class="title">Roles</div>
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
                        <v-col cols="8"> <v-btn color="primary" small @click="create"><v-icon>mdi-plus</v-icon> Add Role</v-btn> </v-col>
                        <v-col cols="4">
                            <v-text-field outlined dense v-model="search" 
                            label="Search" prepend-icon="mdi-magnify"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-data-table class="ml-5 elevation-1" :search="search" 
                        :items="roleList" :headers="headers">
                        <template v-slot:item="{ item }">
                            <tr :class="{'row-clickable': item.name.includes('ADMIN')}" @click="editRow(item)">
                                <td class="subtitle-2 text-left">{{ item.name }}</td>
                                <td class="subtitle-2 text-left">{{ item.description }}</td>
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
                Add Role
                </v-card-title>
                <v-card-title class="headline purple lighten-2" primary-title v-else>
                Update Role
                </v-card-title>
                <v-card-text class="pt-5 pr-5 pl-5 pb-0">
                    <v-form v-model="isFormValid">
                    <v-text-field outlined dense label="Display Name" 
                        v-model="roleObj.name" :rules="[rules.required]"/>
                    <v-text-field outlined dense label="Description" 
                        v-model="roleObj.description" :rules="[rules.required]"/>
                    </v-form>
                </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" small @click="saveDelete()" v-show="isCreate === false && isVisibleControl">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey" small @click="dialog = false">Cancel</v-btn>
                <v-btn color="green" small v-if="isCreate" @click="saveCreate()" 
                :disabled="!isFormValid || !roleObj.name || !roleObj.description">Save</v-btn>
                <v-btn color="indigo" small v-else @click="saveEdit()" 
                :disabled="!isFormValid || !roleObj.name || !roleObj.description" v-show="isVisibleControl">Update</v-btn>
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
            isCreate: false,
            items: [
                {
                    text: 'User Management',
                    disabled: false,
                },
                {
                    text: 'Roles',
                    disabled: false,
                },
            ],
            headers: [
				{ text: 'Display Name', align: 'left', value: 'name', sortable: true},
	          	{ text: 'Description', align: 'left', value: 'description', sortable: true},
	          	{ text: 'Created At', align: 'left', value: 'created_at', sortable: true},
            ],
            roleObj: {
                id: null,
                name: null,
                description: null,
            },
            rules: {
                required: value => !!value || 'Required.',
            },
        }
    },

    created(){
        this.fetchRole();
    },

    methods: {
        fetchRole(){
            this.$store.dispatch('app/changeLoading', true);
            this.roleList = [];
            this.$axios({method: 'get', url: '/api/roles'})
            .then(result => {
                if(result.data.length > 0){
                   this.roleList = result.data;
                }else{
                    this.$swal.fire(
                        'Failed',
                        'No Data.',
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
            this.roleObj.id = null;
            this.roleObj.name = null;
            this.roleObj.description = null;
            this.dialog = true;
        },

        editRow(item){
            if(item.name.includes('ADMIN')){
                this.isVisibleControl = false;
            }else{
                this.isVisibleControl = true;
            }
            this.isCreate = false;
            this.roleObj.id = item.id;
            this.roleObj.name = item.name;
            this.roleObj.description = item.description;
            this.dialog = true;
        },

        saveCreate(){
            this.$swal.fire({
                title: 'Save Role',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'post', url: '/api/roles/create', params: this.roleObj})
                    .then(result => {
                        if(result.data[0].id  || result.data.length <= 0){
                            this.roleList = result.data;
                            this.$swal.fire(
                                'Success',
                                'Successfully add role.',
                                'success'
                            );
                        }else{
                            this.$swal.fire(
                                'Failed',
                                'Something went wrong. Please try again later.',
                                'error'
                            );
                        }
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
                title: 'Save Update Role',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'put', url: '/api/roles/update', params: this.roleObj})
                    .then(result => {
                        if(result.data[0].id  || result.data.length <= 0){
                            this.roleList = result.data;
                            this.$swal.fire(
                                'Success',
                                'Successfully Update role.',
                                'success'
                            );
                        }else{
                            this.$swal.fire(
                                'Failed',
                                'Something went wrong. Please try again later.',
                                'error'
                            );
                        }

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
                title: 'Delete Role',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'delete', url: '/api/roles/delete', params: this.roleObj})
                    .then(result => {
                        if(result.data[0].id || result.data.length <= 0){
                            this.roleList = result.data;
                            this.$swal.fire(
                                'Success',
                                'Successfully add role.',
                                'success'
                            );
                        }else{
                            this.$swal.fire(
                                'Failed',
                                'Something went wrong. Please try again later.',
                                'error'
                            );
                        }

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