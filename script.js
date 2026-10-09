// Edit the values below to personalize the wedding website.
const wedding = {
  bride: "Ashna",
  groom: "Lenex",
  weddingDate: " SATURDAY · 16th JANUARY 2027",
  ceremonyDateTime: "Saturday, 16 January 2027<br>03:30 PM",
  church: "Little Flower Church, Thirumudikkunnu",
  churchMap: " https://share.google/3DNBIu2P0LsA9tRFq",
  receptionDateTime: "Saturday, 12 December 2026<br>1:00 PM onwards",
  receptionVenue: "La Mirage Hall Koratty",
  receptionMap: "https://share.google/aKKUOboqbHpjvlu7l",
  familyMessage: "Together with their families, Ashna and Lenex look forward to celebrating this special day with you."
};
const setText = (id, value) => document.getElementById(id).textContent = value;
const setLines = (id, value) => { const el=document.getElementById(id); value.split("<br>").forEach((part,i)=>{if(i)el.append(document.createElement("br"));el.append(document.createTextNode(part));}); };
setText("bride",wedding.bride);setText("groom",wedding.groom);setText("hero-date",wedding.weddingDate);
["ceremony-time","church","reception-time","venue"].forEach((id,i)=>setLines(id,[wedding.ceremonyDateTime,wedding.church,wedding.receptionDateTime,wedding.receptionVenue][i]));
document.getElementById("church-map").href=wedding.churchMap;
document.getElementById("venue-map").href=wedding.receptionMap;
setText("family-text",wedding.familyMessage);setText("footer-names",`${wedding.bride.toUpperCase()} & ${wedding.groom.toUpperCase()}`);
document.title=`${wedding.bride} & ${wedding.groom} | Wedding Invitation`;

/* MOBILE GALLERY - ALWAYS START WITH PHOTO 3 */

(function () {
  const mobileScreen = window.matchMedia("(max-width: 700px)");

  function centerThirdPhoto() {
    if (!mobileScreen.matches) return;

    const gallery = document.getElementById("weddingGallery");
    if (!gallery) return;

    const photos = gallery.querySelectorAll(".gallery-photo");
    if (photos.length < 3) return;

    const thirdPhoto = photos[2];

    // Disable snapping temporarily
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    // Calculate the position of photo 3 inside the gallery
    const galleryRect = gallery.getBoundingClientRect();
    const photoRect = thirdPhoto.getBoundingClientRect();

    const target =
      gallery.scrollLeft +
      photoRect.left -
      galleryRect.left -
      (gallery.clientWidth - photoRect.width) / 2;

    gallery.scrollLeft = target;

    // Restore snapping after positioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gallery.style.scrollSnapType = "";
        gallery.style.scrollBehavior = "";
      });
    });
  }

  function resetGallery() {
    if (!mobileScreen.matches) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(centerThirdPhoto);
    });
  }

  // Fresh page load
  window.addEventListener("load", resetGallery);

  // Returning using browser back/forward
  window.addEventListener("pageshow", resetGallery);

  // Reopening a background browser tab
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetGallery();
  });

  // Also handle scripts loaded after page completion
  if (document.readyState === "complete") {
    resetGallery();
  }
})();
