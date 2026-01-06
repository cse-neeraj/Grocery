import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const ProductDetails = () => {
  const { id } = useParams()
  const { products, addToCart, cartItems, removeFromCart, currency } = useAppContext()
  const [product, setProduct] = useState(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = products.find((item) => item._id === id)
      if (foundProduct) {
        setProduct(foundProduct)
        setImage(foundProduct.image[0])
      }
    }
    if (products.length > 0) {
      fetchProduct()
    }
  }, [id, products])

  if (!product) {
    return <div className='opacity-0'></div>
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {product.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{product.offerPrice} <span className='text-xl text-gray-500 line-through font-normal'>{currency}{product.price}</span></p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description.join(', ')}</p>
          
          <div className='flex flex-col gap-4 my-8'>
             <p>Select Quantity</p>
             <div className='flex items-center gap-3'>
                {cartItems[product._id] ? (
                   <div className='flex items-center gap-3'>
                      <button onClick={()=>removeFromCart(product._id)} className='bg-gray-100 py-1 px-3 rounded'>-</button>
                      <p>{cartItems[product._id]}</p>
                      <button onClick={()=>addToCart(product._id)} className='bg-gray-100 py-1 px-3 rounded'>+</button>
                   </div>
                ) : (
                   <button onClick={()=>addToCart(product._id)} className='bg-primary text-white px-8 py-3 text-sm active:bg-gray-700 rounded-md hover:bg-primary-dull transition'>ADD TO CART</button>
                )}
             </div>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      
      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails