export default function RoundedDiv({children, style, expand}) {
    return (
        <>
        <div className="div" style={style}>
            
        </div>


        <style jsx>{`

            .div {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                background: transparent;
                
                max-width:  ${expand ? '' : 'fit-content'};
                max-height: ${expand ? '' : 'fit-content'};

                border-radius: .5rem;
                outline: 1px solid white;
            }

        `}</style>
        </>
    );
}