import Image from "next/image";
import { homeBg, pic1, pic2, pic3, aboutImg1, aboutImg2, aboutImg3 } from "./(assets)";
import { styles } from "./style";
import { getFlowers } from "./(flower_manager)/flower_getter";
import {Flower} from "./Flower";
import Link from "next/link";

export default async function Home() {
  const aboutSections = [
  {
    img: aboutImg1,
    title: "Cultiver la Beauté et la Sérénité",
    text: "Au Jardin Enchanté, notre mission est de créer des espaces floraux qui apportent beauté et tranquillité à votre quotidien. Nous croyons que chaque fleur possède une magie unique capable d’enrichir notre environnement et d’apporter de la joie à nos vies. Nous cultivons nos fleurs avec amour et soin pour vous offrir des arrangements floraux qui transforment chaque moment en une expérience enchantée."
  },
  {
    img: aboutImg2,
    title: "Engagement et Qualité",
    text: "Nous nous engageons à vous fournir des fleurs de la plus haute qualité, cultivées de manière durable et éthique. Notre équipe de passionnés sélectionne chaque fleur avec une attention particulière pour garantir fraîcheur et éclat. Chez Le Jardin Enchanté, nous valorisons la transparence, le respect de la nature et la satisfaction de nos clients. Nous mettons un point d’honneur à respecter l’environnement tout en vous offrant le meilleur de la nature."
  },
  {
    img: aboutImg3,
    title: "Une Passion Florale",
    text: "Le Jardin Enchanté est né d'une passion commune pour les fleurs et le jardinage. Depuis nos débuts modestes, nous avons grandi en restant fidèles à notre amour pour la nature et l'art floral. Chaque bouquet, chaque composition raconte une histoire et est conçu pour capturer la beauté éphémère des fleurs. Nous sommes fiers de partager notre passion avec vous et de faire partie de vos moments spéciaux, qu’ils soient grands ou petits."
  }
];
const reviews = [
  {
    name: "Alice Dupont",
    review: "Excellent service! Les fleurs étaient fraîches et magnifiques. Je recommande vivement Le Jardin Enchanté.",
    img: pic1
  },
  {
    name: "Jean Martin",
    review: "Livraison rapide et fleurs de qualité. Très satisfait de ma commande. Merci beaucoup!",
    img: pic2
  },
  {
    name: "Sophie Bernard",
    review: "Les compositions florales sont superbes. Parfait pour toutes les occasions. Service client au top!",
    img: pic3
  }
];


  const flowers = await getFlowers(3);
  return (
    <div>
      <div className="w-full lg:h-[55vh] h-[35vh] overflow-hidden relative">
        <div className="w-full h-full absolute overflow-hidden">
          <Image className="h-full" src={homeBg} alt="hero background" />
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-[2rem] ">
          <h2 className="lg:text-[7rem] text-[3rem] font-black text-black">
            Jardin Enchanté
          </h2>
          <p className="text-center">
            Découvrez notre collection unique de bouquets frais, parfaits pour chaque occasion. Faites sourire vos proches avec nos créations florales.
          </p>
          <button className={`${styles.btnPrimary}`}>
            Voir la boutique
          </button>
        </div>
      </div>
      <div className="flex justify-center lg:my-[2rem] my-[1rem]">
        <div className="flex flex-col gap-10 w-[70%] items-center">
        <h1 className="font-black lg:text-[3rem] text-[2rem]">
          Nos Derniers Produits
        </h1>
        <div className="lg:gap-10 gap-[3rem] grid w-full lg:grid-cols-3 grid-cols-1">
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
      <div className="flex flex-col gap-[5rem] w-full lg:p-[10rem] p-[2rem] ">
        {
          aboutSections.map((section, index) => (
            <div key={index} className={`grid items-center gap-8 grid-cols-1 ${index % 2 === 0 && "lg:grid-cols-[60%_30%]" || "lg:grid-cols-[30%_60%]"}`} >
              <div className={`${index % 2 !== 0 && "lg:order-1" || "lg:order-0"} order-1 flex flex-col gap-2 items-start`}>
                <h2 className="lg:text-[4rem] text-[2rem] font-black">{section.title}</h2>
                <p>{section.text}</p>
              </div>
              <div className={`w-full ${index % 2 !== 0 && "lg:order-0" || "lg:order-1"} order-0`} >
                <Image src={section.img} alt="" />
              </div>
            </div>
          ))
        }
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-7 items-stretch my-[10rem] ">
          {
            reviews.map((review) => (
              <div className="flex flex-col gap-5 p-[3rem] w-full border-black border-solid rounded-[1rem] ">
                <div className="w-[3rem] rounded-full overflow-hidden ">
                  <Image src={review.img} alt="" />
                </div>
                <h3 className="lg:text-[1.8rem] text-[1.3rem] font-black ">{review.name}</h3>
                <p>
                  {review.review}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
