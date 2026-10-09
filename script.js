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
/* INITIALIZE GALLERY – CENTER THE MIDDLE PHOTO */
(() => {
  const gallery = document.getElementById("weddingGallery");
  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery-photo");
  if (photos.length < 3) return;

  const middlePhoto = photos[Math.floor(photos.length / 2)]; // Photo 3 (index 2)

  function centerMiddlePhoto() {
    // Temporarily disable snap for accurate positioning
    gallery.style.scrollSnapType = "none";
    gallery.style.scrollBehavior = "auto";

    const galleryWidth = gallery.clientWidth;
    const photoWidth = middlePhoto.offsetWidth;
    const targetScroll =
      middlePhoto.offsetLeft - (galleryWidth - photoWidth) / 2;

    gallery.scrollLeft = Math.max(0, targetScroll);

    // Re-enable snap after a short delay
    requestAnimationFrame(() => {
      gallery.style.scrollSnapType = "";
      gallery.style.scrollBehavior = "";
    });
  }

  // Run after images have loaded (important!)
  const images = gallery.querySelectorAll("img");
  let loaded = 0;

  function checkLoaded() {
    loaded++;
    if (loaded === images.length) {
      centerMiddlePhoto();
      // Extra safety pass
      setTimeout(centerMiddlePhoto, 100);
    }
  }

  images.forEach((img) => {
    if (img.complete) {
      checkLoaded();
    } else {
      img.addEventListener("load", checkLoaded);
      img.addEventListener("error", checkLoaded);
    }
  });

  // Also recenter on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(centerMiddlePhoto, 150);
  });

  // Optional: drag-to-scroll support (desktop)
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener("mousedown", (e) => {
    isDown = true;
    gallery.classList.add("active");
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener("mouseleave", () => {
    isDown = false;
    gallery.classList.remove("active");
  });

  gallery.addEventListener("mouseup", () => {
    isDown = false;
    gallery.classList.remove("active");
  });

  gallery.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
  });
})();