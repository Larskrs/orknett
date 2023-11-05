import styles from "../styles/layouts/StreamingLayout.module.css"

export default function({children}) {
    return (
        <div className={styles.wrap}>
             <div className={styles.nav}>
                <div>
                    {/* LOGO & Hamburger Bar */}
                </div>   
                <div>
                    {/* SEARCH */}
                </div>   
                <div>
                    {/* ACCOUNT & Shit */}
                </div>   
             </div>  
             <div className={styles.main}>
                {children}
             </div>
        </div>
    );
}