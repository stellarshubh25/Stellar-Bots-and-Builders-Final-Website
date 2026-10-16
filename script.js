const SITE = {
  whatsapp: "+917020581028",
  phone: "+917020581028",
  email: "stellarbotsandbuilders@gmail.com",
  instagram: "stellar_bots_builders",
  websitesUrl: "",
  area: "India"
};

const MESSAGE =
  "Hi Stellar Bots and Builders, I would like to know more about a chat assistant for my business.";

const missing = "[contact email not configured]";

document.querySelectorAll("[data-fill='email']").forEach(function (el) {
  el.textContent = SITE.email || missing;
});

document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-area]").forEach(function (el) {
  el.textContent = SITE.area || "";
});

if (SITE.websitesUrl) {
  document.querySelectorAll(".js-web, .js-web-nav").forEach(function (link) {
    link.href = SITE.websitesUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  });
}

const contactList = document.getElementById("contact-list");

if (contactList) {
  function addContact(label, href, primary) {
    const item = document.createElement("li");
    const link = document.createElement("a");

    link.className = "btn" + (primary ? " primary" : "");
    link.href = href;
    link.textContent = label;

    if (href.indexOf("http") === 0) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    item.appendChild(link);
    contactList.appendChild(item);
  }

  let whatsappUrl = "";

  if (SITE.whatsapp) {
    whatsappUrl =
      "https://wa.me/" +
      SITE.whatsapp.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(MESSAGE);

    addContact("Message us on WhatsApp", whatsappUrl, true);
  }

  if (SITE.phone) {
    addContact("Call us", "tel:" + SITE.phone.replace(/[^\d+]/g, ""));
  }

  if (SITE.email) {
    addContact(
      "Send an email",
      "mailto:" +
        SITE.email +
        "?subject=" +
        encodeURIComponent("Stellar Bots and Builders enquiry")
    );
  }

  if (SITE.instagram) {
    addContact(
      "Instagram",
      "https://instagram.com/" + SITE.instagram.replace("@", "")
    );
  }

  if (!contactList.children.length) {
    const item = document.createElement("li");
    item.textContent = "Contact details have not been added yet.";
    contactList.appendChild(item);
  }

  if (whatsappUrl) {
    document.querySelectorAll(".js-wa").forEach(function (link) {
      link.href = whatsappUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }
}

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

navigation?.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  });
});