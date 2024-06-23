"use client"
import React, { useState } from 'react'
import FormView from './FormView'
import { customFetch } from '@/app/customeFetch';
import { useAuthorization } from '@/app/(authorization)/useAuthorization';
import { useRouter } from 'next/navigation';

export default function UpdateForm({flower}) {
    const {custom} = customFetch();
    const auth = useAuthorization();
  const [name, setName] = useState(flower.name);
  const uploadUrl = window.location.origin + "/api/admin/flower/upload";
  const url = window.location.origin + "/api/admin/flower/" + flower.id;
  const [description, setDescription] = useState(flower.description);
  const [price, setPrice] = useState(flower.price / 100);
  const router = useRouter();
  const [submitFile, setSubmitFile] = useState(null);
  const [prevImg, setPrevImg] = useState(flower.image_url);

  const handleSubmit = async (e) => {
        e.preventDefault();
        let image_url = flower.image_url;
        if(submitFile) {
            const uploadImage = await custom(uploadUrl, {
                method: "POST",
                headers: auth,
                body: submitFile
            });
            image_url = uploadImage.url;
        }
        const body = JSON.stringify({name, description, price, image_url: image_url});
        const newFlower = await custom(url, {
            method: "PUT",
            headers: auth,
            body
        });
        router.push("/" + newFlower.slug)
    }
  const handleImageChange = (e) => {
        let render = new FileReader();
        let file = e.target.files[0];
        setSubmitFile(file);
        render.onloadend = () => {
            setPrevImg(render.result);
        }
        render.readAsDataURL(file);
  }

  return (
    <FormView name={name}
     description={description}
     price={price} 
     prevImg={prevImg} 
     handleImageChange={handleImageChange} 
     setName={setName} 
     setDescription={setDescription} 
     setPrice={setPrice} 
     handleSubmit={handleSubmit} />
  )
}
