/* Edit only this block. Leave a value empty ("") to hide it. */
const SITE = {
  whatsapp: "+917020581028",     
  phone: "+917020581028",        
  email: "stellarbotsandbuilders@gmail.com",        
  instagram: "stellar_bots_builders",    
  websitesUrl: "",  /* full link to your website building page, for example https://example.netlify.app */
  area: "India"          /* for example: Serving businesses in Duliajan and nearby. */
};

const MESSAGE = "Hi Stellar Bots and Builders, I would like to know more about a chat assistant for my business.";
const missing = "[stellarshubh25@gmail.com]";

document.querySelectorAll("[data-fill='email']").forEach(function (el) {
  el.textContent = SITE.email || missing;
});
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
document.querySelectorAll("[data-area]").forEach(function (el) {
  el.textContent = SITE.area;
});

if (SITE.websitesUrl) {
  document.querySelectorAll(".js-web, .js-web-nav").forEach(function (a) {
    a.href = SITE.websitesUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.hidden = false;
  });
}

var list = document.getElementById("contact-list");
if (list) {
  function add(label, href, primary) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "btn" + (primary ? " primary" : "");
    a.href = href;
    a.textContent = label;
    if (href.indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(a);
    list.appendChild(li);
  }
  var wa = "";
  if (SITE.whatsapp) {
    wa = "https://wa.me/" + SITE.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(MESSAGE);
    add("WhatsApp", wa, true);
  }
  if (SITE.phone) add("Call " + SITE.phone, "tel:" + SITE.phone.replace(/\s/g, ""));
  if (SITE.email) add("Email", "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Chat assistant enquiry"));
  if (SITE.instagram) add("Instagram", "https://instagram.com/" + SITE.instagram.replace("@", ""));
  if (!list.children.length) {
    var li = document.createElement("li");
    li.textContent = "Contact details have not been added yet.";
    list.appendChild(li);
    console.warn("Add your contact details in the SITE block of script.js before launching.");
  }
  if (wa) {
    document.querySelectorAll(".js-wa").forEach(function (a) {
      a.href = wa; a.target = "_blank"; a.rel = "noopener";
    });
  }
}
