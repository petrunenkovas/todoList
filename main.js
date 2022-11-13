const app = Vue.createApp({
    template: 
    /*html*/
    `<todo-form :todos="todos" :users="users" @create="createToDo" @error="alertError"></todo-form>
     <todo-list :todos="todos" :users="users" @delete="deleteTodo" @error="alertError"></todo-list>
    `,
    data() {
        return {
            todos: [],
            users: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                this.todos = response.data;
            });
            await axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.users = response.data;
            });
            } catch (error) {
                alertError(error);
            }
        },
        alertError(error) {
            alert(error.message);
        },
        createToDo(toDo) {
            this.todos.unshift(toDo);
        },
        deleteTodo(todo) {
            this.todos = this.todos.filter((item) => item !== todo);
         }
    },
});