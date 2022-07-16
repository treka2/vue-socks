app.component('product-display',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>

                <div class="product-info">
                    <h1> {{product}} </h1>
                    <p v-if="instock >5">instock</p>
                    <p v-else-if="instock <=5 && instock >0">Harry! almost finish</p>
                    <p v-else>out of stock</p>
                    <p> shipping: {{shipping}} </p>
                    <p v-show="onsale"> on sale </p>
                    <ul>
                        <li v-for="detail in details"> {{detail}} </li>
                    </ul>
                 
                    <div v-for="(variant,index) in variants" :key="variant.id"
                     @mouseover="ubdateVariant(index)" class="color-circle"
                     :style='{backgroundColor:variant.color}' >  </div>

                    <button class="btn" 
                    :class="{disabledBtn:!instock}"
                    :disabled="!instock"
                    @click="addToCart">Add to cart</button>
              
                </div>

            </div>
            <review-list v-if='reviews.length' :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
    `
    // js 
    ,
    data() {
        return{
            selectedVariant:0,
            product:'socks',
            onsale:false,
            details:['50% cotton','30% wool','20% polyester'],
            variants:[
                { id: 2234, color: 'rgb(33 136 83)',image:"./imgs/socks_green.jpg",quantity:35},
                { id: 2235, color: 'rgb(48 68 93)',image:"./imgs/socks_blue.jpg",quantity:2},
            ],
           reviews:[]
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart',this.variants[this.selectedVariant].id);
            
        },
       
        ubdateVariant(index){
            this.selectedVariant=index;
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed :{
        image(){
            return this.variants[this.selectedVariant].image
        },
        instock(){
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if (this.premium){
                return 'free'
            }else{
                return "2.99$"
            }
        }
    }
})