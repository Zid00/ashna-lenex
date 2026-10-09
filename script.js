// Edit the values below to personalize the wedding website.
const wedding = {
  bride: "Ashna",
  groom: "Lenex",
  weddingDate: "SATURDAY · 16th JANUARY 2027",
  ceremonyDateTime: "Saturday, 16 January 2027<br>03:30 PM",
  church: "Little Flower Church, Thirumudikkunnu",
  churchMap: "https://share.google/3DNBIu2P0LsA9tRFq",
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

/* MOBILE GALLERY - DEFAULT THIRD PHOTO */

(() => {
  const gallery = document.getElementById("weddingGallery");
  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  if (photos.length < 3) return;

  let initialized = false;

  function centerThirdPhoto() {
    if (window.innerWidth > 700 || initialized) return;

    const thirdPhoto = photos[2];

    // Prevent scroll snapping during initial positioning
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    // Calculate the exact position of Photo 3
    const galleryRect = gallery.getBoundingClientRect();
    const photoRect = thirdPhoto.getBoundingClientRect();

    const target =
      gallery.scrollLeft +
      photoRect.left -
      galleryRect.left -
      (gallery.clientWidth - photoRect.width) / 2;

    gallery.scrollLeft = target;

    // Allow the browser to settle before restoring snapping
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gallery.style.removeProperty("scroll-snap-type");
        gallery.style.removeProperty("scroll-behavior");
        initialized = true;
      });
    });
  }

  function initializeGallery() {
    requestAnimationFrame(() => {
      requestAnimationFrame(centerThirdPhoto);
    });
  }

  if (document.readyState === "complete") {
    initializeGallery();
  } else {
    window.addEventListener("load", initializeGallery, { once: true });
  }
})();
