import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { products, cartItems, removeFromCart, addToCart, currency, navigate } = useAppContext()

  const totalAmount = Object.keys(cartItems).reduce((acc, itemId) => {
    const product = products.find(p => p._id === itemId);
    return acc + (product ? product.offerPrice * cartItems[itemId] : 0);
  }, 0);

  return (
    <div className='mt-10'>
      <div className='flex items-center gap-3 mb-6'>
        <p className='text-2xl md:text-3xl font-medium'>Your Cart</p>
        <p className='text-gray-500'>({Object.keys(cartItems).length} Items)</p>
      </div>

      {Object.keys(cartItems).length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-4 mt-20'>
          <img src={assets.cart_icon} className='w-16 opacity-20' alt="" />
          <p className='text-xl text-gray-500'>Your cart is empty</p>
          <button onClick={() => navigate('/')} className='bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dull transition'>Shop Now</button>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Cart Items List */}
          <div className='flex-1 flex flex-col gap-6'>
            {products.map((product) => {
              if (cartItems[product._id] > 0) {
                return (
                  <div key={product._id} className='flex items-center justify-between border border-gray-200 p-4 rounded-lg bg-white shadow-sm'>
                    <div className='flex items-center gap-4 md:gap-6'>
                      <div className='w-20 h-20 flex items-center justify-center bg-gray-50 rounded-md'>
                        <img src={product.image[0]} alt={product.name} className='max-w-full max-h-full object-contain' />
                      </div>
                      <div>
                        <p className='font-medium text-lg text-gray-800'>{product.name}</p>
                        <p className='text-gray-500 text-sm'>{product.category}</p>
                        <p className='font-medium text-indigo-500 mt-1'>{currency}{product.offerPrice}</p>
                      </div>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                      <div className='flex items-center border border-gray-300 rounded-md'>
                        <button onClick={() => removeFromCart(product._id)} className='px-3 py-1 text-gray-600 hover:bg-gray-100'>-</button>
                        <span className='px-3 py-1 border-x border-gray-300 text-sm font-medium'>{cartItems[product._id]}</span>
                        <button onClick={() => addToCart(product._id)} className='px-3 py-1 text-gray-600 hover:bg-gray-100'>+</button>
                      </div>
                      <p className='text-gray-800 font-medium'>Total: {currency}{product.offerPrice * cartItems[product._id]}</p>
                    </div>
                  </div>
                )
              }
              return null;
            })}
          </div>

          {/* Order Summary */}
          <div className='w-full lg:w-96'>
            <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
              <p className='text-xl font-medium mb-4'>Order Summary</p>
              <div className='flex flex-col gap-3 text-sm text-gray-600'>
                <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p className='font-medium text-gray-800'>{currency}{totalAmount}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Delivery Fee</p>
                  <p className='font-medium text-green-600'>Free</p>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between text-lg font-semibold text-gray-800'>
                  <p>Total</p>
                  <p>{currency}{totalAmount}</p>
                </div>
              </div>
              <button className='w-full bg-primary text-white py-3 rounded-md mt-6 font-medium hover:bg-primary-dull transition'>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
