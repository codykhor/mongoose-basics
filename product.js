const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
        .then(() => {
            console.log("CONNECTION OPEN")
        }).catch((err) => {
            console.log("OH NO ERROR")
            console.log(err)
        })
}

// Mongoose schema validations
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number, // Expects something that can be turned into a number
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String], // Array only containing strings
    },
    // categories: [String]
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

const Product = mongoose.model('Product', productSchema)

// const bike = new Product({name: 'Mountain Bike', price: 599})
// bike.save()
// .then(data => {
//     console.log('IT WORKED!')
//     console.log(data)
// }).catch(err => {
//     console.log('ERROR')
//     console.log(err.errors.name.message)
// })

Product.findOneAndUpdate({name: 'Mountain Bike'}, {price: -699}, {new: true, runValidators: true})
    .then(data => {
        console.log('IT WORKED!')
        console.log(data)
    }).catch(err => {
    console.log('ERROR')
    console.log(err)
})