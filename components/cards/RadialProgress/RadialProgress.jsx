
import styles from "./RadialProgress.module.css"

const RadialProgress = (props) => {
        let {
          size = 150,
          progress = 0,
          trackWidth = 10,
          trackColor = `#ddd`,
          indicatorWidth = 10,
          indicatorColor = `#07c`,
          indicatorCap = `round`,
          label = `Loading...`,
          labelColor = `#333`,
          spinnerMode = false,
          spinnerSpeed = 1
        } = props

        const center = size / 2,
        radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100)

        let hideLabel = (size < 100 || !label.length || spinnerMode) ? true : false

        return (
                <div>
                  <div
                    className={styles["svg-pi-wrapper"]}
                    style={{ width: size, height: size }}
                  >
                    <svg
                      className={styles["svg-pi"]}
                      style={{ width: size, height: size }}
                    >
                      <circle
                        className={styles["svg-pi-track"]}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={trackWidth}
                      />
                      <circle
                        className={`${styles["svg-pi-indicator"]} ${
                          spinnerMode ? styles["svg-pi-indicator--spinner"] : ""
                        }`}
                        style={{ animationDuration: spinnerSpeed * 1000 + "ms" }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={indicatorColor}
                        strokeWidth={indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap={indicatorCap}
                      />
                    </svg>




                      {!hideLabel && (
                        <div 
                          className={styles["svg-pi-label"]} 
                          style={{ color: labelColor }}
                        >
                          <span className={styles["svg-pi-label__loading"]} >
                            {label}
                          </span>
                        
                          {!spinnerMode && (
                            <span className={styles["svg-pi-label__progress"]} style={{color: indicatorColor}} >
                              {`${
                                progress > 100 ? 100 : Math.floor(progress)
                              }%`}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                </div>
        )
}
  
  export default RadialProgress