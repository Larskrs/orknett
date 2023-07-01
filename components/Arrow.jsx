export default function Arrow({direction="right"}) {
    return (
        <div>
            <div className={"arrow " + direction}></div>
            <style jsx>{`
                
            .arrow {
              border: solid white;
              border-width: 0 3px 3px 0;
              display: inline-block;
              padding: 3px;
            }
            
            .right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
            
            .left {
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
            
            .up {
              transform: rotate(-135deg);
              -webkit-transform: rotate(-135deg);
            }
            
            .down {
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
            }

                `}</style>
        </div>
    );
}