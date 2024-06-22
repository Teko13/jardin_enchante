"use client"
import { styles } from '@/app/style';
import React from 'react';

export default function FormView({ name, description, price, prevImg, handleImageChange, handleSubmit, setName, setDescription, setPrice }) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:w-[50%] w-[80%] items-center">
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-[1rem] w-full'>
        <div className='flex flex-col items-start gap-1 w-full'>
          <label htmlFor="name">Nom</label>
          <input
            className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
            type="text"
            value={name}
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <label htmlFor="price">Prix</label>
          <input
            className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            cols={30}
            className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <label htmlFor="image_url">Image</label>
          <input
            className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
            type="file"
            name="image_url"
            id="image_url"
            onChange={handleImageChange}
          />
        </div>
        <button type='submit' className={`${styles.btnPrimary} w-full my-[2rem]`}>Créer</button>
      </form>
      <div className='w-full'>
        {prevImg && (
          <div className="flex items-center w-full bg-red">
            <img className='w-full h-full' src={prevImg} alt="image de la fleur" />
          </div>
        )}
      </div>
    </div>
  );
}
