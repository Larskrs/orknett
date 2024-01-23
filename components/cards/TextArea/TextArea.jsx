import useAutosizeTextArea from "@/hooks/useAutosizeTextArea"
import { useEffect, useRef, useState } from "react"
import styles from "./TextArea.module.css"

export function TextArea({ placeholder = '', defaultValue = '', onChange = () => {}, label }) {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt) => {
    const val = evt.target?.value;
    onChange(evt.target?.value)
    setValue(val);
  };

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div className={styles.App}>
      <label htmlFor="review-text"></label>
      <textarea
        id="review-text"
        onChange={handleChange}
        placeholder="What did you like or dislike?"
        ref={textAreaRef}
        rows={1}
        cols={100}
        value={value}
      />
    </div>
  );
}
  