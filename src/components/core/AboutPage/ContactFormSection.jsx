import React from 'react'
import CotactUsForm from '../../ContactPage/CotactUsForm'
import ContactUsForm from '../../ContactPage/CotactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1>Get in Touch</h1>
        <p>We’d love to here for you, Please fill out this form.</p>

        <div>
            <ContactUsForm/>
        </div>
      
    </div>
  )
}

export default ContactFormSection
