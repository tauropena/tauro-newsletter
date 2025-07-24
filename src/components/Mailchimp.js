// app/components/MailchimpInjection.js
"use client"

import { useEffect } from "react"

export default function MailchimpInjection() {
  useEffect(() => {
    const script = document.createElement("script")
    script.id = "mcjs"
    script.innerHTML = `
      !function(c,h,i,m,p){
        m=c.createElement(h),p=c.getElementsByTagName(h)[0],
        m.async=1,m.src=i,p.parentNode.insertBefore(m,p)
      }(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f194f459e5195f688bebd9c64/712d935707c8d37b6ac2fad4d.js");
    `
    // Insert the script before the first existing <script> tag
    const firstScript = document.getElementsByTagName("script")[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  }, [])

  return null
}
