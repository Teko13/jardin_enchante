"use client";
import { useState, useEffect} from 'react';
import { useAuthorization } from '../(authorization)/useAuthorization';
import { useUser } from '../(context)/userContext';
import { customFetch } from '../customeFetch';

function useFlower(flower) {
  const auth = useAuthorization();
  const [flowerLikes, setFlowerLikes] = useState(flower.like);
  const [isLiked, setIsLiked] = useState(false);
  const {custom} = customFetch()
  const { user, setHandleUserLikes, handleUserLikes} = useUser();
  
  // check if login user like this flower
  const checkLike = () => {
    if(!user) {
        return false;
    }
    const check = flowerLikes.some((likeItem) => (
        likeItem.userId === user.id
    ));
    return check;
  }
  const handleLike = async () => {
    const url = window.location.origin + "/api/favorite/" + flower.id;
    const newLikes = await custom(url, {
        next: {
            revalidate: 0
        },
        headers: auth
    });
    if(newLikes) {
        const json = await newLikes;
        setFlowerLikes(json);
        setHandleUserLikes(!handleUserLikes);
    }
  };
  useEffect(() => {
    setIsLiked(checkLike());
  }, [flowerLikes, user]);

  return { flowerLikes, isLiked, handleLike };
}

export default useFlower;
