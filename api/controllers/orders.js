const mongoose = require('mongoose')
const Order = require('../models/order');
const product = require('../models/product');


// Get All Orders
exports.get_all_orders =(req,res)=>{
    Order.find().select("_id product quantity").populate('product','name _id price').exec().then((docs)=>{
        res.status(200).json({
            message: "success",
            orders: docs.map(doc =>{
                return {
                    _id : doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type:"GET",
                        url: "localhost:3000/orders/"+doc._id,

                    }
                }
            })
        })
    }

    ).catch(err=>{
        res.status(500).json({
           error:err
        })
    })
}

// Get single Orders
exports.create_order =(req,res)=>{

    product.findById(req.body.product).exec().then((result)=>{
        const order = new Order({
            _id:mongoose.Types.ObjectId(),
            product: req.body.product,
            quantity: req.body.quantity
        })
        order.save().then(result=>{
            res.status(201).json({
                message: "order created",
                createdOrder: result
            })
    
            
        })
    }).catch(err=>{
        res.status(500).json({
           error:err
        })
    })
      
    }


// Get one order
exports.get_one_order =(req,res)=>{
    const id = req.params.orderId
Order.findById(id).populate('product').exec().then(order=>{
    if(!order){
        return res.status(404).json({
            message:"Order Not Found"
        })
    }
    res.status(200).json(order)
}).catch(error=>{res.status(500).json({
    error:error
})})

}

// Update Order
exports.update_order = (req,res)=>{
    const id = req.params.orderId;
    
    Order.findByIdAndUpdate(id,{quantity: req.body.quantity}).exec().then((result)=>{
        res.status(200).json({message:"Order updated"})
    }).catch(error=>{
        res.status(500).json(error);
    })
}

// Delete Order
exports.delete_orders =(req,res)=>{
    const id = req.params.orderId
    Order.findByIdAndDelete(id).exec().then(()=>{
        res.status(200).json({
            message:"order deleted"
        })
    }).catch(error=>{
        res.status(500).json({
            error:error
        })
    })
}
