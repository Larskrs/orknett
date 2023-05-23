import NewsLayout from "@/layouts/NewsLayout";
import Image from "next/image";

export default function() {
    return (
        <NewsLayout 
            title={"Har sosiale medier for mye makt?"}
            description={"Hver dag preges av sosiale medier, dagsorden er satt av influensere, og flere unge stoler mere på interett personligheter enn familie. Er dette en godtatt konsekvens av sosiale medier, eller burde vi ta kontroll over et teknologi som selger sine brukere."}
            image={"https://cdn.discordapp.com/attachments/1009799380796178475/1107987635810611290/PXL_20230516_104720636.MP.jpg "}
            color={"#2142d"}
            >
            
            <p>{`I løpet av få år har Sosiale medier oppnådd enorm innflytelse og makt. Dette skyldes flere faktorer, inkludert deres evne til å gi en plattform for uttrykkelse av meninger og synspunkter på en måte som tidligere var begrenset til tradisjonelle medier og offentlige debattfora. Her er alminnelig folk fått taler stolen, og kan offentligjøre hva de vil uten å følge lovverk til presse, eller utføre pressens samfunnsoppdrag. Sosiale medier har også gjort det lettere å nå ut til større publikum, spesielt for mindre grupper og enkeltpersoner som tidligere ikke hadde den samme tilgangen til en bredere offentlighet. I tillegg har sosiale medier utviklet seg til å bli en sentral arena for handel, reklame og markedsføring, noe som har bidratt til å øke deres økonomiske og politiske innflytelse. Sosiale medier gir også muligheten til å samle store mengder data om brukerne, og bruke denne informasjonen til å tilpasse innhold og annonsering på en måte som tradisjonelle medier ikke kan matche. Alt dette har gjort sosiale medier til en kraftig aktør i samfunnet, med en påvirkningskraft som vil fortsette å øke i tiden som kommer.`}</p>
            <Image src={""} />
            <h2>Ekkokammer og polarisering</h2>
            <p>{"Ekkokammer er fenomener som oppstår når personer søker ut informasjon og meninger som allerede samsvarer med deres egne oppfatninger og verdier. Dette kan skje i ulike sammenhenger, inkludert i sosiale medier og nyhetsstrømmer på nettet. Når personer kun eksponeres for informasjon som bekrefter deres egne synspunkter og meninger, kan det føre til en forsterkning av deres allerede eksisterende holdninger og ståsteder."}</p>

            <img src="https://cdn.discordapp.com/attachments/1009799380796178475/1107994045072027660/DSC_0306.JPG"></img>

            <h2>22. Juli 2011</h2>
            <p>{"Anders Bering Breivik, som utførte terrorangrepet på Utøya og i Oslo i 2011, er et eksempel på hvordan ekkokammer-effekten kan påvirke en persons synspunkter og handlinger. Breivik tilhørte en ekstrem høyreorientert bevegelse i Norge, og hadde gjennom flere år eksponert seg selv for informasjon og meninger som støttet hans ekstreme synspunkter."}</p>
            <p>{"Breivik brukte aktivt internett og sosiale medier for å finne likesinnede og informasjon som støttet hans verdensbilde. Han ble en del av flere ekstreme nettverk og fora, hvor han kunne diskutere og dele informasjon med likesinnede. Dette førte til at hans egne synspunkter og holdninger ble forsterket og radikalisert over tid."}</p>
            <p>{"Ekko-kammeret bidro til Breiviks radikalisering og til slutt hans terrorangrep. Breivik følte at han var en del av en større bevegelse, og at hans handlinger var nødvendige for å beskytte det han oppfattet som en truet europeisk kultur og samfunn."}</p>

        </NewsLayout>
    );
}