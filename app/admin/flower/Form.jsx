"use client"
import { useAuthorization } from '@/app/(authorization)/useAuthorization';
import { customFetch } from '@/app/customeFetch';
import { styles } from '@/app/style';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import FormView from './FormView';


export default function Form() {
    const auth = useAuthorization();
    const uploadUrl = "http://localhost:3000/api/admin/flower/upload";
    const url = "http://localhost:3000/api/admin/flower";
    const {custom} = customFetch()
    const [prevImg, setPrevImg] = useState(null);
    const [name, setName] = useState("");
    const [submitFile, setSubmitFile] = useState(null);
    const [description, setDescription] = useState("");
    const router = useRouter();
    const [price, setPrice] = useState(0);
    const handleImageChange = (e) => {
        let render = new FileReader();
        let file = e.target.files[0];
        setSubmitFile(file);
        render.onloadend = () => {
            setPrevImg(render.result);
        }
        render.readAsDataURL(file);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(submitFile) {
            const image_url = await custom(uploadUrl, {
                method: "POST",
                headers: auth,
                body: submitFile
            });
            const body = JSON.stringify({name, description, price, image_url: image_url.url});
            const newFlower = await custom(url, {
                method: "POST",
                headers: auth,
                body
            });
            router.push("/" + newFlower.slug)
        }
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
