import styles from "@/styles/layouts/NewsPage.module.css"
import Link from "next/link";

export default function NewsPage() {
    return (
        <div>
            <Link href={"/projects/aktueltnytt/SosialeMedier"}>Aktuelt Om Sosiale-medier</Link>
        </div>
    );
}