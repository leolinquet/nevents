// On a laptop this draws a phone-sized screen in the middle of the page.
// On a real phone it fills the whole screen.
export default function PhoneFrame({ children }) {
  return (
    <div className="stage">
      <div className="phone">{children}</div>
    </div>
  )
}
