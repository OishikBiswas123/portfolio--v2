'use client'

export function GmailLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6.5V17.5C22 18.88 20.88 20 19.5 20H18V9.5L12 13L6 9.5V20H4.5C3.12 20 2 18.88 2 17.5V6.5C2 5.12 3.12 4 4.5 4H5L12 8.5L19 4H19.5C20.88 4 22 5.12 22 6.5Z" fill="#EA4335"/>
      <path d="M6 9.5L2 6.5V17.5C2 18.88 3.12 20 4.5 20H6V9.5Z" fill="#FBBC05"/>
      <path d="M22 6.5L18 9.5V20H19.5C20.88 20 22 18.88 22 17.5V6.5Z" fill="#34A853"/>
      <path d="M22 6.5V6.4C22 5.08 20.92 4 19.6 4H19L12 8.5L5 4H4.5C3.12 4 2 5.12 2 6.5V6.6C2 7.92 3.08 9 4.4 9H5L12 13L19 9H19.5C20.88 9 22 7.88 22 6.5Z" fill="#C5221F"/>
    </svg>
  )
}

export function WhatsAppLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.88 12.1L4 20l4.05-1.06A7.93 7.93 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68zM12 18.5a6.46 6.46 0 0 1-3.3-.91l-.24-.14-2.47.65.66-2.4-.16-.25A6.46 6.46 0 0 1 12 5.5a6.5 6.5 0 0 1 6.5 6.5 6.46 6.46 0 0 1-6.5 6.5zm3.77-4.7c-.2-.1-1.18-.58-1.36-.65-.19-.06-.32-.1-.46.1-.13.2-.5.65-.62.78-.11.13-.22.15-.42.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.1-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.22.3-.33.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.34-.04-.1-.46-1.1-.63-1.5-.17-.4-.33-.34-.46-.35-.12 0-.25-.03-.39-.03-.13 0-.34.05-.52.25-.17.2-.67.65-.67 1.6 0 .93.68 1.84.78 1.96.1.13 1.34 2.05 3.26 2.87.45.2.81.32 1.08.4.46.15.87.13 1.2.08.37-.05 1.18-.48 1.35-.95.16-.47.16-.87.11-.95-.04-.09-.16-.14-.36-.23z" fill="#25D366"/>
    </svg>
  )
}

export function GoogleMapsLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
      <path d="M12 11.5c1.38 0 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5 9.5 7.62 9.5 9s1.12 2.5 2.5 2.5z" fill="white"/>
      <path d="M12 2c3.87 0 7 3.13 7 7 0 5.25-7 13-7 13V2z" fill="#FBBC04" opacity="0.3"/>
      <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13V2z" fill="#4285F4" opacity="0.3"/>
    </svg>
  )
}

export function LinkedInLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#0A66C2] rounded-lg flex items-center justify-center text-white font-bold text-2xl`}>
      in
    </div>
  )
}

export function PhoneLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#34A853"/>
    </svg>
  )
}
