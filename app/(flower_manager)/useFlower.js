"use client";
import { useState, useEffect} from 'react';
import { useAuthorization } from '../(authorization)/useAuthorization';
import { useUser } from '../(context)/userContext';

function useFlower(flower) {
  const auth = useAuthorization();
  const [likesNumber, setLikesNumber] = useState(flower.like.length);
  const [flowerLikes, setFlowerLikes] = useState(flower.like);
  const [isLiked, setIsLiked] = useState(false);
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
    const url = "http://localhost:3000/api/favorite/" + flower.id;
    const newLikes = await fetch(url, {
        next: {
            revalidate: 0
        },
        headers: auth
    });
    const json = await newLikes.json();
    setLikesNumber(json.length);
    setFlowerLikes(json);
    setHandleUserLikes(!handleUserLikes);
  };
  useEffect(() => {
    setIsLiked(checkLike());
  }, [flowerLikes, user]);

  return { likesNumber, isLiked, handleLike };
}

export default useFlower;
