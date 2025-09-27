# DonkeyKong — Capacitor wrapper (iOS & Android)

Questo pacchetto rende **nativa** la tua app HTML5 (canvas) usando **Capacitor**.

## 1) Requisiti
- Node 18+ e npm
- Xcode (per iOS) su macOS
- Android Studio (per Android)
- (Consigliato) Java 17
- `ios-deploy` per test su device iOS reali: `npm i -g ios-deploy`

## 2) Installazione
```bash
cd DonkeyKong-Capacitor
npm i
```

## 3) Aggiungi piattaforme
```bash
npx cap add ios
npx cap add android
```

## 4) Sincronizza asset web
```bash
npm run build    # non fa nulla, l'app è in ./www
npm run cap:sync
```

## 5) Apri i progetti nativi
```bash
npm run ios      # apre Xcode
npm run android  # apre Android Studio
```

Compila ed esegui da lì (scegli un simulatore o un device collegato).

## Dove mettere le immagini sprite
Copia nella cartella `www/` i file richiesti dal tuo gioco (se già non presenti):
- `mario_luigi_sprites2.png`
- `barrel_sprites.png`
- `DK_sprites.png`
- `mario_and_luigi_sprites.png`
- `dk_title.png`
- `pausemenu.png`

> Se i nomi/percorsi non coincidono, aggiorna i path nei file JS in `www/`.

## Controlli su mobile
Sono stati aggiunti pulsanti tattili che emulano i tasti **W, A, S, D, Space, P**. La prima pressione sullo schermo invia anche **Enter** per superare la schermata "Press Enter".

Se preferisci, puoi rimuoverli modificando `index.html` e cancellando `mobile-bridge.js`.

## Orientamento e dimensioni canvas
`mobile-bridge.js` ridimensiona il canvas a pieno schermo mantenendo la resa pixel-art (`image-rendering: pixelated`). Se vuoi una risoluzione fissa (es. 1510×685) e un letterbox, sostituisci la logica di `fitCanvas()` con un calcolo che rispetti il tuo aspect ratio.

## Note per iOS (WKWebView)
- Se servono richieste HTTP a domini non-https, abilita ATS in Xcode (NSAppTransportSecurity).
- Per nascondere la status bar: in Xcode, **General → Deployment Info**.

## Note per Android
- Blocco del tasto indietro: implementabile con Capacitor App plugin (eventi `backButton`).
- Blocca orientamento in **AndroidManifest.xml** (opzionale).

## Debug locale
```bash
npm run dev
# poi apri http://localhost:5173
```

---
© 2025 pezzaliAPP — MIT
