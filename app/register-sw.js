// Script pour enregistrer le service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        // L'enregistrement a réussi
        console.log("ServiceWorker enregistré avec succès: ", registration.scope)
      },
      (err) => {
        // L'enregistrement a échoué
        console.log("Échec de l'enregistrement du ServiceWorker: ", err)
      },
    )
  })
}
