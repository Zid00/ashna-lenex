// Edit the values below to personalize the wedding website.
const wedding = {
  bride: "Ashna",
  groom: "Lenex",
  weddingDate: " SATURDAY · 16th JANUARY 2027",
  ceremonyDateTime: "Saturday, 16 January 2027<br>03:30 PM",
  church: "Little Flower Church, Thirumudikkunnu",
  churchMap: " https://share.google/3DNBIu2P0LsA9tRFq",
  receptionDateTime: "Saturday, 16 January 2027<br>06:00 PM - 10:00 PM",
  receptionVenue: "La Mirage Hall Koratty",
  receptionMap: "https://share.google/aKKUOboqbHpjvlu7l",
  familyMessage: "Together with their families, Ashna and Lenex look forward to celebrating this special day with you."
};
const setText = (id, value) => document.getElementById(id).textContent = value;
const setLines = (id, value) => {
  const el = document.getElementById(id);
  el.replaceChildren();

  value.split("<br>").forEach((part, i) => {
    if (i) el.append(document.createElement("br"));
    el.append(document.createTextNode(part));
  });
};
setText("bride",wedding.bride);setText("groom",wedding.groom);setText("hero-date",wedding.weddingDate);
["ceremony-time","church","reception-time","venue"].forEach((id,i)=>setLines(id,[wedding.ceremonyDateTime,wedding.church,wedding.receptionDateTime,wedding.receptionVenue][i]));
document.getElementById("church-map").href=wedding.churchMap;
document.getElementById("venue-map").href=wedding.receptionMap;
setText("family-text",wedding.familyMessage);setText("footer-names",`${wedding.bride.toUpperCase()} & ${wedding.groom.toUpperCase()}`);
document.title=`${wedding.bride} & ${wedding.groom} | Wedding Invitation`;



/* Mobile gallery: start with the third photo centered */

(() => {
  const mobile = window.matchMedia("(max-width: 700px)");

  function centerThirdPhoto() {
    if (!mobile.matches) return;

    const gallery = document.getElementById("weddingGallery");
    if (!gallery) return;

    const thirdPhoto = gallery.querySelectorAll(".gallery-photo")[2];
    if (!thirdPhoto) return;

    // Disable scroll snapping during initial positioning
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    const galleryBox = gallery.getBoundingClientRect();
    const photoBox = thirdPhoto.getBoundingClientRect();

    const target =
      gallery.scrollLeft +
      photoBox.left -
      galleryBox.left -
      (gallery.clientWidth - photoBox.width) / 2;

    gallery.scrollLeft = target;

    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = "";
      gallery.style.scrollBehavior = "";
    });
  }

  function initializeGallery() {
    if (!mobile.matches) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(centerThirdPhoto);
    });
  }

  window.addEventListener("load", initializeGallery);
  window.addEventListener("pageshow", initializeGallery);

  if (document.readyState === "complete") {
    initializeGallery();
  }
})();
