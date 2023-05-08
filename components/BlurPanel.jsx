export default function BlurPanel ({children, animated, padding="2rem", },...props) {
    return (
        <>
        
        <div className="main">

            {children}
            {props.map((p) => { <p>{p}</p>})}
        </div>
        
        <style jsx>{`
            
            .main {
                display: flex;
                flex-direction: column;
                background: transparent;
                padding: ${padding}; 
                gap: .25rem;
                width: 100%;
                ${animated ? "animation: pop 500ms ease-in-out;" : ""}
                            
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.17);
                white-space: break-spaces;
            }
            @keyframes pop {
                0% {
                    opacity: 0;
                    scale: 0;
                }
                100% {
                    scale: 1;
                    opacity: 1;
                }
            }

            `}</style>

        </>
    );
}