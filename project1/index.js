const TestComponent = Vue.component('TestComponent', {
    name: 'TestComponent',
    template: '#test-component',
    props: ['title'],
  });

// The Vue instance
let app = new Vue({
    // Options
    el: '#app',
    data: {
        listItems:[1,2,3]
    },
    components: {
        TestComponent: TestComponent,
    }, 
})
