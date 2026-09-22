const SRC = "/survey-man-logo-removebg-preview.png"

export default function Logo({ className = "", invert = false, alt = "Survey Man" }) {
  return (
    <img
      src={SRC}
      alt={alt}
      className={`w-auto object-contain object-left ${invert ? "brightness-0 invert" : ""} ${className}`}
    />
  )
}
