const app = Vue.createApp({
    data() {
        return{
            cart:[],
            premium:false,
            details:['egy','salah'] 
        }
    },
    methods:{
        ubdateCart(id){
            this.cart.push(id)
        },
        remvItem(id){
            this.cart.pop(id)
        }
    }
  
})