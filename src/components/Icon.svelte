<script>
  export let name = 'sparkles';
  export let size = 24;
  export let className = '';

  const icons = {
    user: `
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4 20c1.8-3.2 4.6-4.8 8-4.8s6.2 1.6 8 4.8"></path>
    `,
    bag: `
      <path d="M6 8h12l1.2 10.6A2 2 0 0 1 17.2 21H6.8a2 2 0 0 1-2-2.4L6 8Z"></path>
      <path d="M9 8a3 3 0 0 1 6 0"></path>
    `,
    cart: `
      <circle cx="9" cy="20" r="1.25"></circle>
      <circle cx="18" cy="20" r="1.25"></circle>
      <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7"></path>
    `,
    menu: `
      <path d="M4 7h16"></path>
      <path d="M7 12h13"></path>
      <path d="M4 17h16"></path>
    `,
    search: `
      <circle cx="11" cy="11" r="6"></circle>
      <path d="m20 20-3.6-3.6"></path>
    `,
    arrowRight: `
      <path d="M5 12h14"></path>
      <path d="m13 6 6 6-6 6"></path>
    `,
    plus: `
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    `,
    trash: `
      <path d="M4 7h16"></path>
      <path d="M9 7V5h6v2"></path>
      <path d="M7 7l1 12h8l1-12"></path>
      <path d="M10 11v5"></path>
      <path d="M14 11v5"></path>
    `,
    box: `
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path>
      <path d="m4 7.5 8 4.5 8-4.5"></path>
      <path d="M12 12v9"></path>
    `,
    leaf: `
      <path d="M5 13c6-9 14-8 14-8s1 10-8 14"></path>
      <path d="M7 17c1.2-3 3.8-5.6 8-8"></path>
    `,
    beaker: `
      <path d="M9 3h6"></path>
      <path d="M10 3v5l-5.6 9.1A2 2 0 0 0 6.1 20h11.8a2 2 0 0 0 1.7-2.9L14 8V3"></path>
      <path d="M8 14h8"></path>
    `,
    globe: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18"></path>
      <path d="M12 3a15 15 0 0 1 0 18"></path>
      <path d="M12 3a15 15 0 0 0 0 18"></path>
    `,
    close: `
      <path d="M6 6l12 12"></path>
      <path d="M18 6 6 18"></path>
    `,
    info: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 10v5"></path>
      <path d="M12 7.5h.01"></path>
    `,
    check: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="m8 12 2.5 2.5L16 9"></path>
    `,
    lock: `
      <rect x="5" y="11" width="14" height="10" rx="2"></rect>
      <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>
    `,
    sparkles: `
      <path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"></path>
      <path d="m19 4 .6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6L19 4Z"></path>
      <path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z"></path>
    `,
    chevronRight: `
      <path d="m9 6 6 6-6 6"></path>
    `,
    chevronLeft: `
      <path d="m15 6-6 6 6 6"></path>
    `,
    minus: `
      <path d="M5 12h14"></path>
    `,
    heart: `
      <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0 1 9.3 5.5C10.7 5.5 12 6.4 12 8c0-1.6 1.3-2.5 2.7-2.5A4.3 4.3 0 0 1 19 9.8C19 15.4 12 20 12 20Z"></path>
    `,
    heartFill: `
      <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0 1 9.3 5.5C10.7 5.5 12 6.4 12 8c0-1.6 1.3-2.5 2.7-2.5A4.3 4.3 0 0 1 19 9.8C19 15.4 12 20 12 20Z" fill="currentColor"></path>
    `,
    star: `
      <path d="m12 4 2.6 5.4 5.9.8-4.3 4 1.1 5.8L12 17.3 6.7 20l1.1-5.8-4.3-4 5.9-.8L12 4Z"></path>
    `,
    starFill: `
      <path d="m12 4 2.6 5.4 5.9.8-4.3 4 1.1 5.8L12 17.3 6.7 20l1.1-5.8-4.3-4 5.9-.8L12 4Z" fill="currentColor"></path>
    `,
    truck: `
      <rect x="3" y="7" width="11" height="9" rx="1"></rect>
      <path d="M14 10h4l3 3v3h-7"></path>
      <circle cx="7" cy="18" r="1.6"></circle>
      <circle cx="17" cy="18" r="1.6"></circle>
    `,
    shield: `
      <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z"></path>
      <path d="m9 12 2 2 4-4"></path>
    `,
    refresh: `
      <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"></path>
      <path d="M3 21v-5h5"></path>
    `,
    headset: `
      <path d="M4 13a8 8 0 0 1 16 0v5"></path>
      <rect x="3" y="13" width="4" height="6" rx="1.5"></rect>
      <rect x="17" y="13" width="4" height="6" rx="1.5"></rect>
      <path d="M16 19a4 4 0 0 1-4 3"></path>
    `,
    mail: `
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="m3 7 9 6 9-6"></path>
    `,
    confetti: `
      <path d="M4 4l16 16"></path>
      <path d="M5 14 14 5"></path>
      <circle cx="7" cy="9" r="1"></circle>
      <circle cx="17" cy="14" r="1"></circle>
      <circle cx="13" cy="20" r="1"></circle>
      <circle cx="20" cy="7" r="1"></circle>
    `,
    alert: `
      <path d="M12 4 2 20h20L12 4Z"></path>
      <path d="M12 10v4"></path>
      <path d="M12 17h.01"></path>
    `,
    bed: `
      <path d="M3 17v-6a2 2 0 0 1 2-2h6v8"></path>
      <path d="M11 13h8a2 2 0 0 1 2 2v2"></path>
      <path d="M3 17h18"></path>
      <circle cx="7" cy="11" r="1.6"></circle>
    `,
    ruler: `
      <path d="M3 17 17 3l4 4L7 21Z"></path>
      <path d="M7 13l2 2"></path>
      <path d="M11 9l2 2"></path>
      <path d="M15 5l2 2"></path>
    `,
    mapPin: `
      <path d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z"></path>
      <circle cx="12" cy="9" r="2.6"></circle>
    `,
    phone: `
      <path d="M5 4h3l2 5-2 1.4a11 11 0 0 0 5.6 5.6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"></path>
    `,
    calendar: `
      <rect x="3" y="5" width="18" height="16" rx="2"></rect>
      <path d="M3 10h18"></path>
      <path d="M8 3v4"></path>
      <path d="M16 3v4"></path>
    `,
    home: `
      <path d="M4 11l8-7 8 7"></path>
      <path d="M6 10v10h12V10"></path>
      <path d="M10 20v-5h4v5"></path>
    `,
    key: `
      <circle cx="8" cy="14" r="4"></circle>
      <path d="M11.5 11.5 21 2"></path>
      <path d="m18 5 2 2"></path>
      <path d="m15 8 2 2"></path>
    `,
    eye: `
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `,
    chevronDown: `
      <path d="m6 9 6 6 6-6"></path>
    `,
    instagram: `
      <rect x="3" y="3" width="18" height="18" rx="5"></rect>
      <circle cx="12" cy="12" r="4"></circle>
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"></circle>
    `,
    twitter: `
      <path d="M21 5.5c-.7.4-1.5.7-2.4.8a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1A4 4 0 0 0 11 8.6a11.4 11.4 0 0 1-8.3-4.2 4 4 0 0 0 1.2 5.4c-.7 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8 8 8 0 0 1-5.9 1.7A11.3 11.3 0 0 0 7.5 20c7.4 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0 0 21 5.5Z"></path>
    `,
    youtube: `
      <rect x="3" y="6" width="18" height="12" rx="2.5"></rect>
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor"></path>
    `,
    linkedin: `
      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      <path d="M8 10v8"></path>
      <circle cx="8" cy="7" r="0.8" fill="currentColor"></circle>
      <path d="M12 18v-5a3 3 0 0 1 6 0v5"></path>
      <path d="M12 13v5"></path>
    `,
    apple: `
      <path d="M16.4 4.5a3.7 3.7 0 0 1-3.7 3.7 3.7 3.7 0 0 1 3.7-3.7Z"></path>
      <path d="M19 16.7a8 8 0 0 1-1.6 3 3.5 3.5 0 0 1-3 1.7c-1.2 0-1.5-.7-2.9-.7-1.4 0-1.8.7-2.8.8a3.5 3.5 0 0 1-3-1.6c-2-3-2-7.4 0-9.7a4.6 4.6 0 0 1 3.3-1.5c1.2 0 2.2.7 2.9.7.7 0 2-.9 3.5-.7a4.5 4.5 0 0 1 3.5 2 4.4 4.4 0 0 0-2.7 4 4.5 4.5 0 0 0 2.8 4Z"></path>
    `,
    chat: `
      <path d="M3 12c0-4.4 4-8 9-8s9 3.6 9 8-4 8-9 8c-1.4 0-2.7-.3-3.9-.8L3 21l1.2-4.4A7.4 7.4 0 0 1 3 12Z"></path>
    `,
  };

  $: markup = icons[name] ?? icons.sparkles;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  {@html markup}
</svg>
