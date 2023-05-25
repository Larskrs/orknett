import NewsLayout from "@/layouts/NewsLayout";
import Image from "next/image";

export default function NewsPage() {
    return (
        <NewsLayout 
            title={"Er dataspill farlig for barn?"}
            description={"Hver dag preges av sosiale medier, dagsorden er satt av influensere, og flere unge stoler mere på interett personligheter enn familie. Er dette en godtatt konsekvens av sosiale medier, eller burde vi ta kontroll over et teknologi som selger sine brukere."}
            image={"https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            color={"#2142d"}
            >
            
            <p>Fuck</p>

           <img height="50%" src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
           
        </NewsLayout>
    );
}