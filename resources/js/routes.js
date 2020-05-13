import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import Login from './components/LoginComponent.vue';
import App from './components/ContainerComponent.vue';
import PageNotFound from './components/PageNotFound.vue';
import Dashboard from './components/MainComponent/DashboardComponent.vue';
import User from './components/MainComponent/UserComponent.vue';
import Role from './components/MainComponent/RoleComponent.vue';
import ExpenseCategory from './components/MainComponent/ExpenseCategoryComponent.vue';
import Expenses from './components/MainComponent/ExpensesComponent.vue';


Vue.use(VueRouter);

let routes = [
    { path: "*", component: PageNotFound },
    { path: "/", component: Login },
	{
        path: '/app',
        name: 'app',
        redirect: '/app/dashboard',
        component: App,
        meta: { 
            requiresAuth: true, 
        },
        children: [
            {
                name: 'dashboard',
                path: 'dashboard',
                meta: { 
                    requiresAuth: true, 
                },
                components: {
                    main: Dashboard
                }
            },
            {
                name: 'user',
                path: 'user',
                meta: { 
                    requiresAuth: true, 
                },
                components: {
                    main: User
                }
            },
            {
                name: 'role',
                path: 'role',
                meta: { 
                    requiresAuth: true, 
                },
                components: {
                    main: Role
                }
            },
            {
                name: 'expense-category',
                path: 'expense-category',
                meta: { 
                    requiresAuth: true, 
                },
                components: {
                    main: ExpenseCategory
                }
            },
            {
                name: 'expenses',
                path: 'expenses',
                meta: { 
                    requiresAuth: true, 
                },
                components: {
                    main: Expenses
                }
            },
        ]
    }
];


const router = new VueRouter({
	mode: 'history',
	routes
});


export default router;


router.beforeEach((to, from, next) => {
    if(to.name !== from.name){
        next();
    }
});
