"use client"
import React, { useEffect, useState } from 'react';

function Contact() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          CONTACT
        </h1>
      </div>

      <div className='w-full grid lg:grid-cols-2 grid-cols-1 items-center lg:p-0 p-10'>
        <div className="visme_d"
             data-title="Form Jardin Enchanté"
             data-url="n0eng13m-form-jardin-enchante"
             data-domain="forms"
             data-full-page="false"
             data-min-height="500px"
             data-form-id="76717">
          {isClient && <div id="visme-form"></div>}
        </div>
        <div className="w-full overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92457.01789407378!2d1.3504422513922987!3d43.600673659264785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb6fec7552ff%3A0x406f69c2f411030!2sToulouse!5e0!3m2!1sfr!2sfr!4v1718819973948!5m2!1sfr!2sfr"
            width="600" 
            height="450" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
