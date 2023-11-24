import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './FileUploader.module.css';
import classNames from "classnames";

const FileUploader = ({ files, onChange }) => {
  const inputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault()
    setIsDragActive(false);
    if (onChange) {
      onChange(event.dataTransfer.files);
    }
  }, [onChange]);

  const onInputChange = useCallback((event) => {
    if (onChange) {
      onChange(event.target.files);
    }
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.files = files;
    }
  }, [files]);

  return (
    <>
      <label
        for={'media'}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        className={classNames(styles.dropContainer, {[styles.dragActive]: isDragActive})}
      >
        <span className={styles.dropTitle}>
          Кинь файл сюда :3
        </span>
        <span>
          или
        </span>
        <input
          className={styles.inputFile}
          type="file"
          id="media"
          accept="video/*; audio/*"
          onChange={onInputChange}
          ref={inputRef}
          required
        />
      </label>
    </>
  );
};

export default FileUploader;