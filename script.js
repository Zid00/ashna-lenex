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

/* DEFAULT MOBILE GALLERY - CENTER PHOTO 3 */

(() => {
  const gallery = document.getElementById("weddingGallery");

  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  const middlePhoto = photos[2];

  if (!middlePhoto) return;

  function centerMiddlePhoto() {
    // Apply only on mobile
    if (window.innerWidth > 700) return;

    // Disable snapping temporarily
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    // Calculate the middle photo's position
    const galleryRect = gallery.getBoundingClientRect();
    const photoRect = middlePhoto.getBoundingClientRect();

    const targetScroll =
      gallery.scrollLeft +
      photoRect.left -
      galleryRect.left -
      (gallery.clientWidth - photoRect.width) / 2;

    // Display photo 3 in the center
    gallery.scrollLeft = targetScroll;

    // Restore normal horizontal swiping
    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = "";
      gallery.style.scrollBehavior = "";
    });
  }

  // Center when website first opens
  if (document.readyState === "complete") {
    centerMiddlePhoto();
  } else {
    window.addEventListener("load", centerMiddlePhoto);
  }

  // Center when page is restored
  window.addEventListener("pageshow", centerMiddlePhoto);
})();
