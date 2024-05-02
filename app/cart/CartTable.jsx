"use client";
import React, { useEffect, useState } from 'react'
import { useCart } from '../(context)/cartContext'
import Image from 'next/image';
import { getFlowersById } from '../(flower_manager)/flower_getter';
import { styles } from '../style';

export default function CartTable() {
  const {items} = useCart();
  const [detailItems, setDetailItems] = useState([]);
  const [serverDetailItems, setServerDetailItems] = useState([]);
  const init = () => {
        const ids = items.map(i => i.id);
       if(ids.length > 0) {
         getFlowersById(ids)
        .then(res => res)
        .then((res) => {
            setServerDetailItems(res);
        });
       }
   }
  // add cart item's detail to given flower detail from server
  const completItemsDetail = () => {
    for(let item in serverDetailItems) {
        const index = items.findIndex(e => serverDetailItems[item].id === e.id);
        if(Number.isInteger(index) && index >= 0) {
            const detailObj = {...serverDetailItems[item], quantity: items[index].quantity};
            setDetailItems(prevItems => [...prevItems, detailObj]);
        }
    }
  }
  useEffect(() => {
    init()
  }, [items]);
  useEffect(() => {
    // Ensure cart items is loaded and is not empty
    if(items.length > 0) {
        completItemsDetail();
    }
  }, [serverDetailItems]);
  
  return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-center p-4 bg-black rounded-t-[1rem]">
                <h2 className=' text-[3rem] text-white font-black'>Vos articles</h2>
            </div>
            <table className="w-full">
                <thead>
                    <tr className='grid grid-cols-[50%_25%_25%] p-3 border-solid border-black'>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        detailItems.map((flower, index) => (
                            <tr key={index} className='grid grid-cols-[50%_25%_25%] border-solid border-t-0 border-b-black'>
                                <td className='flex items-center gap-[1rem] p-3 justify-start'>
                                    <div className='rounded-full w-[40px] h-[40px] overflow-hidden flex justify-center items-center'>
                                        <img src={flower.image_url} alt='image produit' />
                                    </div>
                                    <h3 className=' text-[1.4rem]'>{flower.name}</h3>
                                </td>
                                <td className='flex p-3 justify-center items-center'>
                                    <input type="number" value={flower.quantity} min={1} max={1} className='p-3 border-[1px] border-solid border-black rounded-lg' />
                                </td>
                                <td className='flex p-3 justify-center'>
                                    {(flower.price * flower.quantity)/100}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot className=' gap-2'>
                    <tr>
                        <td>Total</td>
                    </tr>
                    <tr>
                        <td>3</td>
                    </tr>
                </tfoot>
            </table>
        </div>
   )
}
