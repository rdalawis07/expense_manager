<template>
<div v-resize="onResize">
    <v-row>
        <v-col cols="6">
            <div class="title">My Expenses</div>
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
    <div v-if="windowSize.x > 600">
    <v-row>
        <v-col cols="4">
            <v-simple-table class="text-center body-2 d-flex justify-end">
                <thead>
                    <tr>
                        <th class="text-center">Expense Categories</th>
                        <th class="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in myExpenseList" :key="item.expense_category_name">
                        <td>{{ item.expense_category_name }}</td>
                        <td>{{ '$ ' + item.total_amount }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
        <v-col cols="8">
            <canvas id="myExpenses" style="width: 100%; height: 100%;"></canvas>
        </v-col>
    </v-row>
    </div>
    <div v-else>
    <v-row>
        <v-col>
            <canvas id="myExpenses" style="width: 100%; height: 100%;"></canvas>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-simple-table class="text-center body-2 d-flex justify-start">
                <thead>
                    <tr>
                        <th class="text-center">Expense Categories</th>
                        <th class="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in myExpenseList" :key="item.expense_category_name">
                        <td>{{ item.expense_category_name }}</td>
                        <td>{{ '$ ' + item.total_amount }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            windowSize: {
                x: 0,
                y: 0,
            },
            myExpenseList: [],
            chartExpenses: null,
            items: [
                {
                    text: 'Dashboard',
                    disabled: false,
                },
            ],
            randColorList: ['#E91E63', '#F8BBD0', '#FF2301', '#45323FF', '#00FF12', '#4CAF50', '#009688', '#673AB7', '#607D8B', '#FFEB3B', '#4CAF50', '#03A9F4', '#795548', '#FF9800', '#F44336', '#3F51B5'], 
        }
    },

    mounted(){
      this.onResize();
    },

    computed: {
        userInformation() {
            return this.$store.getters['app/user_detail'];
        },
    },

    created(){
        this.fetchMyExpense();
    },

    methods: {
        fetchMyExpense(){
            this.$store.dispatch('app/changeLoading', true);
            this.myExpenseList = [];
            let user_id = this.userInformation[0].id;
            this.$axios({method: 'get', url: `/api/expensegroup/${user_id}`})
            .then(result => {
                if(result.data.length > 0){
                   this.myExpenseList = result.data;

                    //CONFIG PIE (MY EXPENSES)
                    let expenseLabel = this.myExpenseList.map(a => a.expense_category_name);
                    let expenseData = this.myExpenseList.map(a => a.total_amount);
                    let configExpenses = {
                        type: 'pie',
                        data: {
                            datasets: [{
                                data: expenseData,
                                backgroundColor: this.randColorList,
                                label: 'By Expense Category'
                            }],
                            labels: expenseLabel,
                        },
                        options: {
                            responsive: true,
                            legend: {
                                display: false
                            },
                        }
                    };

                    this.chartExpenses = new Chart(document.getElementById("myExpenses").getContext('2d'), configExpenses);
                }else{
                    this.$swal.fire(
                        'Information',
                        'No Expenses Found.',
                        'info'
                    );
                }
                this.$store.dispatch('app/changeLoading', false);
            }).catch(err => {
                console.log(err);
                this.$swal.fire(
                    'Failed',
                    'Something went wrong. Please check your connection.',
                    'error'
                );
                this.$store.dispatch('app/changeLoading', false);
            });
        },

        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        }
        
    }
}
</script>
<style scoped>

</style>