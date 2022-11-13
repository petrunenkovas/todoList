app.component('todo-list', {
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
    `
    <ul id="todo-list">
        <li v-for="todo in todos" :key="todo.id">
            <input type='checkbox' :checked="todo.completed" @change="toggleTodoComplete(todo)">
            <span>{{todo.title}} <i>by</i> <b>{{ getUserName (todo.userId) }}</b></span>
            <span class="close" @click="deleteTodo(todo)">&times;</span>
        </li>
    </ul>`,
    methods: {
        getUserName(userId) {
            const user = this.users.find(u => u.id === userId);
            return user.name; 
        },
        async deleteTodo(todo) {
            try {
                const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${todo.id}`);
            if (response.status === 200) {
                this.$emit('delete', todo);
            }
            } catch (error) {
                this.$emit('error', error);
            }
        },
        async toggleTodoComplete (todo) {
            try {
                const response = await axios.patch(`https://jsonplaceholder.typicode.com/users/${todo.id}`, 
                {completed: todo.completed}
            );
            
            if (response.status !== 200) {
                throw new Error('Failed to connect to server. Please try later');
            }
            } catch (error) {
                this.$emit('error', error);
            }
        }
    }
})