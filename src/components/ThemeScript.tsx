"use client";

import { useServerInsertedHTML } from "next/navigation";

export default function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('namuste-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
      }}
    />
  ));
  return null;
}
