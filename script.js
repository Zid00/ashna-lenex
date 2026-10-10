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


// Open the mobile wedding gallery at the third photo
window.addEventListener("load", function () {
  const gallery = document.getElementById("weddingGallery");
  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  if (photos.length < 3) return;

  function centerThirdPhoto() {
    if (window.innerWidth > 700) return;

    const thirdPhoto = photos[2];

    const target =
      thirdPhoto.offsetLeft -
      gallery.offsetLeft -
      (gallery.clientWidth - thirdPhoto.clientWidth) / 2;

    gallery.scrollTo({
      left: Math.max(0, target),
      behavior: "instant"
    });
  }

  // Allow layout to finish before centering
  requestAnimationFrame(() => {
    requestAnimationFrame(centerThirdPhoto);
  });

  // Recenter after images finish loading
  gallery.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", centerThirdPhoto, { once: true });
    }
  });
});
// WEDDING COUNTDOWN — 16 JANUARY 2027, 3:30 PM IST
(function () {
  const target = new Date("2027-01-16T15:30:00+05:30").getTime();

  function updateCountdown() {
    const daysEl = document.getElementById("countDays");
    const hoursEl = document.getElementById("countHours");
    const minutesEl = document.getElementById("countMinutes");
    const secondsEl = document.getElementById("countSeconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      console.error("Wedding countdown HTML elements are missing.");
      return;
    }

    const remaining = Math.max(0, target - Date.now());

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining / 3600000) % 24);
    const minutes = Math.floor((remaining / 60000) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateCountdown);
  } else {
    updateCountdown();
  }

  setInterval(updateCountdown, 1000);
})();