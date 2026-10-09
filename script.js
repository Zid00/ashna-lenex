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

/* MOBILE GALLERY - START AT MIDDLE PHOTO */

(() => {
  const gallery = document.getElementById("weddingGallery");
  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  if (photos.length < 3) return;

  const middlePhoto = photos[2];

  function showMiddlePhoto() {
    if (window.innerWidth > 700) return;

    // Temporarily prevent snapping to Photo 1.
    const previousSnap = gallery.style.scrollSnapType;
    gallery.style.scrollSnapType = "none";

    const galleryBox = gallery.getBoundingClientRect();
    const photoBox = middlePhoto.getBoundingClientRect();

    const target =
      gallery.scrollLeft +
      photoBox.left -
      galleryBox.left -
      (gallery.clientWidth - photoBox.width) / 2;

    // Position Photo 3 immediately, without animation.
    gallery.scrollLeft = target;

    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = previousSnap;
    });
  }

  function initialize() {
    requestAnimationFrame(() => {
      requestAnimationFrame(showMiddlePhoto);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.addEventListener("load", initialize, { once: true });
})();
