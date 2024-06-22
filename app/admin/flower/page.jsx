import React from 'react';
import { getFlowers } from '@/app/(flower_manager)/flower_getter';
import { FlowerAdminView } from '@/app/Flower';

export default async function Page() {
    let flowers;
    try {
        flowers = await getFlowers();
    } catch (error) {
        console.error('Error fetching flowers:', error.message);
        flowers = [];
    }

    if (flowers.length === 0) {
        return (
            <div className='flex flex-col items-center gap-10'>
                <div className="flex w-full h-[50vh] bg-black items-center justify-center">
                    <h1 className='text-white text-[4rem] font-black'>
                        TOUTES LES FLEURS PUBLIÉES
                    </h1>
                </div>

                <div className="flex justify-center my-[2rem] w-[70%]">
                    <div className="flex flex-col gap-10 w-full items-center">
                        <h1 className="font-black text-[3rem]">
                            Erreur de chargement des fleurs ou aucune fleur disponible
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center gap-10'>
            <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
                <h1 className='text-white text-[4rem] font-black'>
                    TOUTES LES FLEURS PUBLIÉES
                </h1>
            </div>

            <div className="flex justify-center my-[2rem] w-[70%]">
                <div className="flex flex-col gap-10 w-full items-center">
                    <h1 className="font-black text-[3rem]">
                        Toutes les fleurs
                    </h1>
                    <div className="grid gap-10 w-full lg:grid-cols-3 grid-cols-1">
                        {flowers.map((flower, index) => (
                            <FlowerAdminView key={index} flower={flower} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
