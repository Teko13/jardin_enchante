import Image from "next/image";
import { homeBg } from "./(assets)";
import { styles } from "./style";
import { getFlowers } from "./(flower_manager)/flower_getter";
import Flower from "./Flower";
import Link from "next/link";

export default async function Home() {
  const flowers = await getFlowers(3);
  return (
    <div>
      <div className="w-full h-[55vh] relative">
        <div className="w-full h-full absolute overflow-hidden">
          <Image src={homeBg} alt="hero background" />
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-[2rem] ">
          <h2 className="text-[7rem] font-black text-black">
            Jardin Enchanté
          </h2>
          <p>
            Découvrez notre collection unique de bouquets frais, parfaits pour chaque occasion. Faites sourire vos proches avec nos créations florales.
          </p>
          <button className={`${styles.btnPrimary}`}>
            Voir la boutique
          </button>
        </div>
      </div>
      <div className="flex justify-center my-[2rem]">
        <div className="flex flex-col gap-10 w-[70%] items-center">
        <h1 className="font-black text-[3rem]">
          Nos Derniers Produits
        </h1>
        <div className="gap-10 grid w-full grid-cols-3">
          {
            flowers.map((flower, index) => (
              <Flower flower={flower} />
            ))
          }
        </div>
        <div className="flex w-full my-5 items-center justify-center">
            <Link href="/shop" className={`${styles.btnSecondary}`}>Voir Tout</Link>
          </div>
      </div>
      </div>
    </div>
  );
}
