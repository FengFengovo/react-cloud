import classNames from "classnames"
import "./index.scss"
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}
interface FSegmentedProps {
  options: Option[]
  value?: string | number
  onChange?: (value: string | number) => void
  className?: string
}

export default function FSegmented({
  options = [],
  value,
  onChange,
  className,
}: FSegmentedProps) {
  const handleClick = (option: Option) => {
    if (option.disabled) return
    onChange?.(option.value)
  }
  return (
    <div className={`F-Segmented  ${className}`}>
      {options.map((option) => (
        <div
          key={option.value}
          className={classNames("F-Segmented-item", {
            "F-Segmented-item-selected": value === option.value,
            "F-Segmented-item-normal": value !== option.value,
            "cursor-not-allowed opacity-50": option.disabled,
          })}
          onClick={() => handleClick(option)}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
