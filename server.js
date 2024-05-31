const express = require("express");
const path = require("path");
const app = express();

// Définir le chemin vers le dossier de distribution
const distPath = path.join(__dirname, "dist", "portfolio");

// Servir les fichiers statiques depuis le dossier de distribution
app.use(express.static(distPath));

// Route pour servir l'index.html
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
