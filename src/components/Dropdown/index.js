import React from 'react'
import styles from './styles.module.scss'

export const Dropdown = ({ label, options, id, selectedValue, onChange, className }) => {
  const handleChange = (e) => typeof onChange === 'function' && onChange(e.target.value)

  return (
    <div className={`${styles.dropdown} ${className}`}>
      {label ? <label htmlFor={id}>{label}</label> : null}

      <select id={id} onChange={handleChange} value={selectedValue}>
        {options?.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
