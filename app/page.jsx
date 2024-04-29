import Image from "next/image";
import { homeBg } from "./(assets)";
import { styles } from "./style";

export default function Home() {
  return (
    <div>
      <div className="w-full h-[50vh] relative">
        <div className="w-full h-full absolute overflow-hidden">
          <Image src={homeBg} alt="hero background" />
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-[2rem] ">
          <h1 className="text-[7rem] font-black text-black">
            Jardin Enchanté
          </h1>
          <p>
            Découvrez notre collection unique de bouquets frais, parfaits pour chaque occasion. Faites sourire vos proches avec nos créations florales.
          </p>
          <button className={`${styles.btnPrimary}`}>
            Voir la boutique
          </button>
        </div>
      </div>
    </div>
  );
}
