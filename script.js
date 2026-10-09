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



/* OPEN MOBILE GALLERY AT PHOTO 3 */

(function () {
  const gallery = document.getElementById("weddingGallery");

  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");

  if (photos.length < 3) return;

  function centerPhoto3() {
    if (window.innerWidth > 700) return;

    const photo = photos[2];

    // Calculate Photo 3's position inside the gallery.
    const galleryRect = gallery.getBoundingClientRect();
    const photoRect = photo.getBoundingClientRect();

    const target =
      gallery.scrollLeft +
      photoRect.left -
      galleryRect.left -
      (gallery.clientWidth - photoRect.width) / 2;

    // Center immediately, without an opening animation.
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";
    gallery.scrollLeft = target;

    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = "x mandatory";
      gallery.style.scrollBehavior = "smooth";
    });
  }

  if (document.readyState === "complete") {
    centerPhoto3();
  } else {
    window.addEventListener("load", centerPhoto3, {
      once: true
    });
  }
})();