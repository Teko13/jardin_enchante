import React from 'react';
import { getFlower } from '../(flower_manager)/flower_getter';
import { FlowerDetail } from '../Flower';

export default async function Page({ params }) {
    const flower = await getFlower(params.slug);
    if (!flower) {
        return (
            <div className='flex flex-col w-full items-center min-h-[100vh] justify-center'>
                <p>Error loading flower data.</p>
            </div>
        );
    }
    return (
        <div className='flex flex-col w-full items-center min-h-[100vh] justify-center'>
            <FlowerDetail flower={flower} />
        </div>
    );
}
