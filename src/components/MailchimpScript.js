import Script from "next/script"

export default function MailchimpScript() {
  return (
    <Script
      id="mcjs"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f194f459e5195f688bebd9c64/0d11c910d3ec9fb2ac0a5b153.js");`,
      }}
    />
  )
}
