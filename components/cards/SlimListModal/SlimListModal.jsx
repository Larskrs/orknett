import { useState } from "react";

import styles from "./SlimListModal.module.css"

export default function SlimListModal ({
    data= [],
    alreadySelected= [],
    onSelect=(element, id) => {},
    onConfirm=(selected) => {},
    onCancel=() => {},
    onRenderItem=(element, id) => {},
    visible=false,
    
    title="",
    description="",
    children,
    
}) {

    const [selected, setSelected] = useState(alreadySelected)
    const [isVisible, setIsVisible] = useState(visible)


    function toggleSelection(element, id) {
        if (selected.includes(element)) {
            // Remove the selected element.
            const filtered = selected.filter((s) => s.id !== element.id)
            setSelected(filtered)
        } else {
            setSelected([element, ...selected])
        }
    }
    function CloseModal () {
        setIsVisible(false);
        setSelected(alreadySelected)
    }

    return (
        <>
            <div onClick={() => {setIsVisible(true)}} style={{cursor: "pointer"}}>
                {children}
            </div>
            {isVisible &&
            <>
                <div className={styles.deadzone} onClick={() => {setIsVisible(false)}} />
                <div className={styles.wrap}>
                    <div className={styles.details}>
                        {title && <h3>{title}</h3>}
                        {description && <p>{description}</p>}
                    </div>
                    <div className={styles.list}>
                        {data.map((element,id) => (<div key={element.id} className={styles.element} style={{background: selected.map((s) => s.id).includes(element.id) ? "#333" : "unset"}} onClick={() => {toggleSelection(element, id)}}>
                            {onRenderItem(element, id)}
                        </div>))}
                    </div>
                    <div className={styles.footer}>
                        <button onClick={() => {CloseModal()}}>Cancel</button>
                        <button onClick={() => {onConfirm(selected); CloseModal(); }} style={{background: selected.length > 0 ? "var(--folly)" : "#222"}} className={styles.confirm}>{selected.length > 0 ? "Add " + selected.length : "Nothing Selected"}</button>
                    </div>  
                </div>
            </>}
        </>
    );
}