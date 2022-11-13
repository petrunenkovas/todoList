app.component('todo-form', {
    props: {
        todos: {
          type: Array,
          required: true
        },
        users: {
            type: Array,
            required: true
        },
    },
    template: 
    /*html*/
    `   <form @submit.prevent="onSubmit">
            <label>
                <input id="new-todo" name="todo" type="text" placeholder="new todo" v-model="newTodo">
            </label>

            <select id="user-todo" name="user" v-model="author">
                <option v-for="user in users" :value = "user.id">{{ user.name }}</option>
            </select>
            <button id="myBtn">Add Todo</button>
        </form>`,
        data() {
            return {
                newTodo: '',
                author:'',
            }
        },
        
        methods: {
            async onSubmit() {
                try {
                    if (this.newTodo === '' || this.author === '') {
                        alert('Review is incomplete. Please fill out every field.');
                        return;
                    };
                    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                            title: this.newTodo,
                            completed: false,
                            userId: Number(this.author),
                    });
                
                console.log(response);
                this.$emit('create', response.data);
            
                this.newTodo = ''
                this.author = ''
            } catch (error) {
                    this.$emit('error', error);
                }
            },
        },
})