export const siteConfig = {
  brand: "ABDT",
  legalName: "Abraj Al Bahar Documents Typing & Copying",
  logo: "/assets/abdt-logo.png?v=3",
  phone: {
    display: "06 704 4137",
    href: "tel:+97167044137",
  },
  mobile: {
    display: "+971 54 537 2505",
    href: "tel:+971545372505",
  },
  whatsappNumber: "971545372505",
  email: "abdctyping.service@gmail.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al%20Shuwaihean%20Rolla%20Sharjah%20UAE",
  social: {
    // Leave blank until the company provides official profiles. Empty links are not shown.
    instagram: "",
    facebook: "",
    linkedin: "",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
    about:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    categories: {
      government:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
      visa: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      driving:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
      medical:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      documents:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
      business:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      property:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    },
  },
};

export function whatsappHref(message) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
