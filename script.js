// Edit the values below to personalize the wedding website.
const wedding = {
  bride: "Ashna",
  groom: "Lenex",
  weddingDate: " SATURDAY · 16th JANUARY 2027",
  ceremonyTime: "11:00 AM",
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

/* Show third photo first on mobile */

window.addEventListener("load", () => {
  const gallery = document.getElementById("weddingGallery");

  if (!gallery || window.innerWidth > 700) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  const thirdPhoto = photos[2];

  if (!thirdPhoto) return;

  // Position the third photo in the center
  const scrollPosition =
    thirdPhoto.offsetLeft -
    gallery.offsetLeft -
    (gallery.clientWidth - thirdPhoto.clientWidth) / 2;

  gallery.scrollTo({
    left: scrollPosition,
    behavior: "instant"
  });
});


/* Center third photo when website opens */

function centerDefaultPhoto() {
  const gallery = document.getElementById("weddingGallery");

  if (!gallery || window.innerWidth > 700) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  const thirdPhoto = photos[2];

  if (!thirdPhoto) return;

  // Calculate exact horizontal center
  const galleryRect = gallery.getBoundingClientRect();
  const photoRect = thirdPhoto.getBoundingClientRect();

  const targetScroll =
    gallery.scrollLeft +
    (photoRect.left - galleryRect.left) -
    (gallery.clientWidth - photoRect.width) / 2;

  gallery.scrollTo({
    left: targetScroll,
    behavior: "instant"
  });
}

if (document.readyState === "complete") {
  centerDefaultPhoto();
} else {
  window.addEventListener("load", centerDefaultPhoto);
}
