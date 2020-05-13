<template>
<div>
    <v-row>
        <v-col cols="6">
            <div class="title">Expenses</div>
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
                        <v-col cols="8"> <v-btn color="primary" small @click="create"><v-icon>mdi-plus</v-icon> Add Expenses</v-btn> </v-col>
                        <v-col cols="4">
                            <v-text-field outlined dense v-model="search" 
                            label="Search" prepend-icon="mdi-magnify"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-data-table class="ml-5 elevation-1" :search="search" 
                        :items="expensesList" :headers="headers">
                        <template v-slot:item="{ item }">
                            <tr @click="editRow(item)">
                                <td class="subtitle-2 text-left">{{ item.expense_category_name }}</td>
                                <td class="subtitle-2 text-left">{{ item.amount }}</td>
                                <td class="subtitle-2 text-left">{{ item.entry_date }}</td>
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
                Add Expenses
                </v-card-title>
                <v-card-title class="headline purple lighten-2" primary-title v-else>
                Update Expenses
                </v-card-title>
                <v-card-text class="pt-5 pr-5 pl-5 pb-0">
                    <v-form v-model="isFormValid">
                    <v-select 
                        v-model="expenseObj.expense_category_id"
                        :items="expCategoryList"
                        item-text="name"
                        item-value="id" 
                        :rules="[rules.required]"
                        label="Outlined style"
                        outlined dense></v-select>
                    <v-text-field outlined dense type="number" label="amount" 
                        v-model="expenseObj.amount" :rules="[rules.required]"/>
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="expenseObj.entry_date"
                            label="Entry Date"
                            prepend-icon="mdi-calendar" 
                            :rules="[rules.required]"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="expenseObj.entry_date" @input="menu = false"></v-date-picker>
                    </v-menu>
                    </v-form>
                </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" small @click="saveDelete()" v-show="isCreate === false">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey" small @click="dialog = false">Cancel</v-btn>
                <v-btn color="green" small v-if="isCreate" @click="saveCreate()" 
                :disabled="!isFormValid || !expenseObj.amount || !expenseObj.entry_date">Save</v-btn>
                <v-btn color="indigo" small v-else @click="saveEdit()" 
                :disabled="!isFormValid || !expenseObj.expense_category_id || !expenseObj.expense_category_name || !expenseObj.amount || !expenseObj.entry_date">Update</v-btn>
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
            menu: false,
            dialog: false,
            search: '',
            expCategoryList: [],
            expensesList: [],
            isCreate: false,
            items: [
                {
                    text: 'Expense Management',
                    disabled: false,
                },
                {
                    text: 'Expenses',
                    disabled: false,
                },
            ],
            headers: [
				{ text: 'Expense Category', align: 'left', value: 'expense_category_name', sortable: true},
                { text: 'Amount', align: 'left', value: 'amount', sortable: true},
                { text: 'Entry Date', align: 'left', value: 'entry_date', sortable: true},
	          	{ text: 'Created At', align: 'left', value: 'created_at', sortable: true},
            ],
            expenseObj: {
                id: null,
                expense_category_id: null,
                expense_category_name: null,
                amount: null,
                entry_date: null,
            },
            rules: {
                required: value => !!value || 'Required.',
            },
        }
    },


    computed: {
        userInformation() {
            return this.$store.getters['app/user_detail'];
        },
    },

    created(){
        this.fetchExpenseCategory();
        this.fetchExpenses();
        this.expenseObj.user_id = this.userInformation[0].id;
    },

    methods: {
        fetchExpenseCategory(){
            this.expCategoryList = [];
           
            this.$axios({method: 'get', url: '/api/expensecategories'})
            .then(result => {
                if(result.data.length > 0){
                   this.expCategoryList = result.data;
                }
            }).catch(err => {
                this.$swal.fire(
                    'Failed',
                    'Something went wrong. Please check your connection.',
                    'error'
                );
            });
        },

        fetchExpenses(){
            this.$store.dispatch('app/changeLoading', true);
            this.expensesList = [];
            let user_id = this.userInformation[0].id;

            this.$axios({method: 'get', url: `/api/expenses/${user_id}`})
            .then(result => {
                if(result.data.length > 0){
                   this.expensesList = result.data;
                }else{
                    this.$swal.fire(
                        'Information',
                        'No Expenses Found.',
                        'info'
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
            this.expenseObj.id = null;
            this.expenseObj.expense_category_id = null;
            this.expenseObj.expense_category_name = null;
            this.expenseObj.amount = null;
            this.expenseObj.entry_date = null;
            this.dialog = true;
        },

        editRow(item){
            
            this.isCreate = false;
            this.expenseObj.id = item.id;
            this.expenseObj.expense_category_id = item.expense_category_id;
            this.expenseObj.expense_category_name = item.expense_category_name;
            this.expenseObj.amount = item.amount;
            this.expenseObj.entry_date = item.entry_date;
            this.dialog = true;
        },

        saveCreate(){
            this.$swal.fire({
                title: 'Save Expenses',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'post', url: '/api/expenses/create', params: this.expenseObj})
                    .then(result => {
                        this.expensesList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully add Expenses.',
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
                title: 'Save Update Expenses',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'put', url: '/api/expenses/update', params: this.expenseObj})
                    .then(result => {

                        this.expensesList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully Update Expenses.',
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
                title: 'Delete Expenses',
                text: "Are you sure?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.value){
                    this.$store.dispatch('app/changeLoading', true);
                    this.$axios({method: 'delete', url: '/api/expenses/delete', params: this.expenseObj})
                    .then(result => {
                        
                        this.expensesList = result.data;
                        this.$swal.fire(
                            'Success',
                            'Successfully add Expenses.',
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