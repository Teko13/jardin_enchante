"use client"
import React, { useEffect, useState } from 'react';
import { useCart } from '../(context)/cartContext';
import Image from 'next/image';
import { getFlowersById } from '../(flower_manager)/flower_getter';

export default function CartTable() {
  const {items} = useCart();
  const [detailItems, setDetailItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const ids = items.map(i => i.id);
      getFlowersById(ids).then(setDetailItems);
    } else {
      setDetailItems([]);
    }
  }, [items]);

  useEffect(() => {
    const totalPrice = detailItems.reduce((acc, item) => {
      return acc + (item.price * (items.find(i => i.id === item.id)?.quantity || 0) / 100);
    }, 0);
    setCartPrice(totalPrice);
  }, [detailItems, items]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 bg-black rounded-t-lg flex justify-center">
        <h2 className="text-3xl text-white font-bold">Vos articles</h2>
      </div>
      <table className="w-full flex flex-col">
        <thead className='w-full'>
          <tr className="grid grid-cols-3 p-3 bg-gray-200 items-center border-black border-solid">
            <th>Produit</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detailItems.map((flower, index) => (
            <FlowerRow key={index} flower={flower} items={items} />
          ))}
        </tbody>
        <tfoot className='bg-black rounded-b-lg p-4'>
          <tr className='flex items-center justify-between text-white font-black'>
            <td colSpan="2">Total</td>
            <td>{cartPrice.toFixed(2)} €</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function FlowerRow({ flower, items }) {
  const { addItem } = useCart();
  const item = items.find(i => i.id === flower.id);
  const quantity = item?.quantity || 0;

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    addItem(flower.id, newQuantity);
  };

  const totalPrice = (flower.price * quantity / 100).toFixed(2);

  return (
    <tr className="grid grid-cols-3 gap-2 p-3 border-t-0 border-solid border-black">
      <td className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={flower.image_url} alt={flower.name} width={40} height={40} />
        </div>
        {flower.name}
      </td>
      <td className='flex justify-center'>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="p-2 border rounded w-[30%] "
          min={1}
        />
      </td>
      <td className='flex justify-center'>{totalPrice} €</td>
    </tr>
  );
}
