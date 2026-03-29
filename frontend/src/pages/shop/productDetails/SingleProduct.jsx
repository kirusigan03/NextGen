import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars'

const SingleCards = () => {
  const {id} = useParams();
  // console.log(id);
  return (
    <>
      <section className='section__container bg-primary-light'>
         <h2 className='section__header capitalize'>Single Product Page</h2>
         <div className='section__subheader space-x-2'>
          <span><Link to="/">Home</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span><Link to="/shop">shop</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className='hover:text-primary'>product name</span>
         </div>
      </section>

      <section className='section__container mt-8'>
          <div className='flex flex-col items-center md:flex-row gap-8'>
            {/* product image */}
            <div className='md:w-1/2 w-full'>
              <img src="https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?
              q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&
              ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              className='rounded-md w-full h-auto' alt=""/>
            </div>

            <div className='md:w-1/2 w-full'>
                <h3 className='text-2xl font-semibold mb-4!'>Product Name</h3>
                <p className='text-xl text-primary mb-4!'>$100 <s>$130</s></p>
                <p className='text-gray-400 mb-4!'>This is product description</p>

                {/* additional product info */}
                <div>
                  <p><strong>Category:</strong> accessories</p>
                  <p><strong>Color:</strong> beige</p>
                  <div className='flex gap-1 items-center'>
                    <strong>Rating:</strong>
                    <RatingStars rating={"4"}/>
                  </div>

                </div>

                <button className='mt-6! px-6! py-3! bg-primary text-white rounded-md'>
                  Add to cart
                </button>
            </div>
          </div>
      </section>
       
       {/* display Reviews */}
       {/* TODO: Work with review when will have api */}
      <section>
          Reviews Here
      </section>
    </>
  )
}

export default SingleCards
