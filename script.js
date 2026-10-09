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

/* ========================================
   MOBILE GALLERY - PHOTO 3 BY DEFAULT
======================================== */

(() => {
  const gallery = document.getElementById("weddingGallery");

  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");

  // Index 2 means the third photo
  const middlePhoto = photos[2];

  if (!middlePhoto) return;

  function centerMiddlePhoto() {
    // Only apply to mobile screens
    if (window.innerWidth > 700) return;

    // Disable snapping while setting the position
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    // Calculate exact center position
    const galleryRect = gallery.getBoundingClientRect();
    const photoRect = middlePhoto.getBoundingClientRect();

    const targetScroll =
      gallery.scrollLeft +
      photoRect.left -
      galleryRect.left -
      (gallery.clientWidth - photoRect.width) / 2;

    // Move gallery to the third photo
    gallery.scrollLeft = targetScroll;

    // Restore normal swipe behavior
    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = "";
      gallery.style.scrollBehavior = "";
    });
  }

  // Run when page finishes loading
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(centerMiddlePhoto);
    });
  });

  // Handle pages restored from browser cache
  window.addEventListener("pageshow", centerMiddlePhoto);
})();
