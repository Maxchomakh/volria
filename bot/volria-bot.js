// Bot Telegram officiel de Volria (VOLRIA).
// Fonctions : solde VOLRIA d'une adresse Ethereum + questions fréquentes (FAQ), en français et en anglais.
//
// Lancement : npm run bot
// Variables nécessaires dans .env :
//   TELEGRAM_BOT_TOKEN = jeton donné par @BotFather (SECRET, ne jamais le partager)
//   MAINNET_RPC_URL    = adresse RPC Ethereum (Alchemy), utilisée en lecture seule
//
// Le bot ne fait que LIRE la blockchain : il n'a besoin d'aucune clé privée.

require("dotenv").config();

const CONTRACT = "0xE22A0D6e66CEe90F3A5c7C2e043781f4B1f1e6da";
const DECIMALS = 18n;
const WEBSITE = "https://maxchomakh.github.io/volria/";
const ETHERSCAN = `https://etherscan.io/token/${CONTRACT}`;
const GITHUB = "https://github.com/Maxchomakh/volria";
const X_URL = "https://x.com/MChomakh12634";
const DISCORD = "https://discord.gg/M4znq7nzs";

// ---------------------------------------------------------------------------
// Textes (français / anglais)
// ---------------------------------------------------------------------------
const TEXT = {
  fr: {
    welcome:
      "Bienvenue sur le bot officiel de Volria (VOLRIA) 👋\n\n" +
      "• Envoie une adresse Ethereum (0x...) pour voir son solde VOLRIA.\n" +
      "• Tape /faq pour les questions fréquentes.\n" +
      "• Tape /langue pour changer de langue.\n\n" +
      "⚠️ Ce bot ne t'écrira jamais en premier et ne te demandera jamais ta clé privée ni ta phrase secrète.",
    menuBalance: "💰 Voir un solde",
    menuFaq: "❓ Questions fréquentes",
    askAddress: "Envoie l'adresse Ethereum à vérifier (elle commence par 0x et fait 42 caractères).",
    badAddress: "Ce n'est pas une adresse Ethereum valide. Elle doit commencer par 0x et contenir 40 caractères (0-9, a-f) après.",
    balance: (addr, amount) => `Solde de ${addr} :\n\n💰 ${amount} VOLRIA\n\nVérifier sur Etherscan :\n${ETHERSCAN}?a=${addr}`,
    rpcError: "Impossible de lire la blockchain pour le moment. Réessaie dans quelques minutes.",
    faqTitle: "Questions fréquentes : choisis une question 👇",
    chooseLang: "Choisis ta langue / Choose your language :",
    langSet: "Langue : français 🇫🇷",
    unknown: "Je n'ai pas compris. Envoie une adresse 0x..., ou tape /faq ou /start.",
    back: "⬅️ Retour aux questions",
  },
  en: {
    welcome:
      "Welcome to the official Volria (VOLRIA) bot 👋\n\n" +
      "• Send an Ethereum address (0x...) to see its VOLRIA balance.\n" +
      "• Type /faq for frequently asked questions.\n" +
      "• Type /language to change the language.\n\n" +
      "⚠️ This bot will never message you first and will never ask for your private key or secret phrase.",
    menuBalance: "💰 Check a balance",
    menuFaq: "❓ FAQ",
    askAddress: "Send the Ethereum address to check (it starts with 0x and is 42 characters long).",
    badAddress: "This is not a valid Ethereum address. It must start with 0x followed by 40 characters (0-9, a-f).",
    balance: (addr, amount) => `Balance of ${addr}:\n\n💰 ${amount} VOLRIA\n\nVerify on Etherscan:\n${ETHERSCAN}?a=${addr}`,
    rpcError: "Unable to read the blockchain right now. Please try again in a few minutes.",
    faqTitle: "Frequently asked questions: pick one 👇",
    chooseLang: "Choisis ta langue / Choose your language:",
    langSet: "Language: English 🇬🇧",
    unknown: "I didn't understand. Send a 0x... address, or type /faq or /start.",
    back: "⬅️ Back to questions",
  },
};

const FAQ = [
  {
    id: "what",
    q: { fr: "Qu'est-ce que Volria ?", en: "What is Volria?" },
    a: {
      fr: "Volria est un projet éducatif et open source qui étudie une blockchain compatible EVM basée sur le DAG, la preuve de travail (PoW) et le cryptage. VOLRIA est le jeton ERC-20 du projet, sur Ethereum.",
      en: "Volria is an educational, open-source project studying an EVM-compatible blockchain based on DAG, Proof-of-Work and encryption. VOLRIA is the project's ERC-20 token on Ethereum.",
    },
  },
  {
    id: "contract",
    q: { fr: "Quelle est l'adresse officielle ?", en: "What is the official address?" },
    a: {
      fr: `Adresse officielle du contrat VOLRIA (Ethereum) :\n${CONTRACT}\n\nTout autre jeton nommé Volria est un faux. Vérifie toujours cette adresse.\n${ETHERSCAN}`,
      en: `Official VOLRIA contract address (Ethereum):\n${CONTRACT}\n\nAny other token named Volria is fake. Always check this address.\n${ETHERSCAN}`,
    },
  },
  {
    id: "supply",
    q: { fr: "Combien de VOLRIA existent ?", en: "How many VOLRIA exist?" },
    a: {
      fr: "L'offre maximale est fixée à 1 000 000 000 VOLRIA et ne pourra jamais être augmentée. Le propriétaire du contrat peut créer des jetons jusqu'à cette limite. L'offre actuelle est visible sur Etherscan.",
      en: "The maximum supply is fixed at 1,000,000,000 VOLRIA and can never be increased. The contract owner can mint tokens up to this limit. The current supply is visible on Etherscan.",
    },
  },
  {
    id: "buy",
    q: { fr: "Où acheter VOLRIA ? Quel est son prix ?", en: "Where can I buy VOLRIA? What is the price?" },
    a: {
      fr: "VOLRIA n'est pas en vente et n'est listé sur aucun exchange. Il n'a pas de prix. Le projet ne fait aucune promesse de valeur ni de gain. Si quelqu'un te propose d'acheter du VOLRIA, c'est une arnaque.",
      en: "VOLRIA is not for sale and is not listed on any exchange. It has no price. The project makes no promise of value or returns. If someone offers to sell you VOLRIA, it is a scam.",
    },
  },
  {
    id: "metamask",
    q: { fr: "Comment ajouter VOLRIA à MetaMask ?", en: "How do I add VOLRIA to MetaMask?" },
    a: {
      fr: `1. Ouvre MetaMask sur le réseau Ethereum.\n2. Clique sur « Importer des jetons ».\n3. Colle l'adresse : ${CONTRACT}\n4. Le symbole VOLRIA et 18 décimales s'affichent : valide.\n\nOu utilise le bouton « Add VOLRIA to MetaMask » sur le site : ${WEBSITE}`,
      en: `1. Open MetaMask on the Ethereum network.\n2. Click "Import tokens".\n3. Paste the address: ${CONTRACT}\n4. The VOLRIA symbol and 18 decimals appear: confirm.\n\nOr use the "Add VOLRIA to MetaMask" button on the website: ${WEBSITE}`,
    },
  },
  {
    id: "audit",
    q: { fr: "Le contrat est-il sûr / audité ?", en: "Is the contract safe / audited?" },
    a: {
      fr: "Le code est public et vérifié sur Etherscan, et il est basé sur OpenZeppelin. Mais il n'a pas encore été audité par une entreprise spécialisée. Ne mets jamais en jeu de l'argent que tu ne peux pas perdre.",
      en: "The code is public, verified on Etherscan and based on OpenZeppelin. However, it has not yet been audited by a specialized firm. Never risk money you cannot afford to lose.",
    },
  },
  {
    id: "scam",
    q: { fr: "Comment éviter les arnaques ?", en: "How do I avoid scams?" },
    a: {
      fr: "• L'équipe Volria ne t'écrira jamais en privé en premier.\n• Personne de Volria ne te demandera ta clé privée, ta phrase secrète ou de l'argent.\n• Il n'y a ni prévente, ni airdrop, ni « listing » payant.\n• Vérifie toujours l'adresse officielle du contrat avec /faq.",
      en: "• The Volria team will never message you privately first.\n• Nobody from Volria will ask for your private key, secret phrase or money.\n• There is no presale, no airdrop and no paid \"listing\".\n• Always check the official contract address with /faq.",
    },
  },
  {
    id: "links",
    q: { fr: "Liens officiels", en: "Official links" },
    a: {
      fr: `🌐 Site : ${WEBSITE}\n💻 GitHub : ${GITHUB}\n𝕏 X : ${X_URL}\n💬 Discord : ${DISCORD}\n🔎 Etherscan : ${ETHERSCAN}`,
      en: `🌐 Website: ${WEBSITE}\n💻 GitHub: ${GITHUB}\n𝕏 X: ${X_URL}\n💬 Discord: ${DISCORD}\n🔎 Etherscan: ${ETHERSCAN}`,
    },
  },
];

// ---------------------------------------------------------------------------
// Fonctions utiles (testables sans Telegram)
// ---------------------------------------------------------------------------
const ADDRESS_RE = /0x[0-9a-fA-F]{40}/;

function findAddress(text) {
  const m = (text || "").match(ADDRESS_RE);
  return m ? m[0] : null;
}

function isAddress(text) {
  return /^0x[0-9a-fA-F]{40}$/.test(text || "");
}

// Formate un montant en unités de base (BigInt, 18 décimales) : 1234500000000000000000n -> "1 234,5" (fr) ou "1,234.5" (en)
function formatAmount(raw, lang) {
  const base = 10n ** DECIMALS;
  const whole = raw / base;
  const frac = (raw % base).toString().padStart(Number(DECIMALS), "0").slice(0, 4).replace(/0+$/, "");
  const sep = lang === "fr" ? " " : ",";
  const dec = lang === "fr" ? "," : ".";
  const wholeStr = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return frac ? `${wholeStr}${dec}${frac}` : wholeStr;
}

function pickLang(code) {
  return (code || "").toLowerCase().startsWith("fr") ? "fr" : "en";
}

// ---------------------------------------------------------------------------
// Lecture de la blockchain (lecture seule, via JSON-RPC)
// ---------------------------------------------------------------------------
async function getVolriaBalance(address) {
  const rpc = process.env.MAINNET_RPC_URL;
  if (!rpc) throw new Error("MAINNET_RPC_URL manquant dans .env");
  // balanceOf(address) = 0x70a08231 + adresse sur 32 octets
  const data = "0x70a08231" + address.toLowerCase().replace("0x", "").padStart(64, "0");
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to: CONTRACT, data }, "latest"] }),
  });
  const json = await res.json();
  if (json.error || !json.result) throw new Error(json.error ? json.error.message : "réponse vide");
  return BigInt(json.result === "0x" ? 0 : json.result);
}

// ---------------------------------------------------------------------------
// Telegram
// ---------------------------------------------------------------------------
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;
const userLang = new Map(); // langue choisie par chaque chat (gardée en mémoire)

async function tg(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`${method}: ${json.description}`);
  return json.result;
}

function langOf(chatId, from) {
  return userLang.get(chatId) || pickLang(from && from.language_code);
}

function mainMenu(lang) {
  const t = TEXT[lang];
  return {
    inline_keyboard: [
      [{ text: t.menuBalance, callback_data: "balance" }],
      [{ text: t.menuFaq, callback_data: "faq" }],
      [{ text: "🇫🇷 Français", callback_data: "lang:fr" }, { text: "🇬🇧 English", callback_data: "lang:en" }],
    ],
  };
}

function faqMenu(lang) {
  return { inline_keyboard: FAQ.map((f) => [{ text: f.q[lang], callback_data: `faq:${f.id}` }]) };
}

async function send(chatId, text, extra = {}) {
  return tg("sendMessage", { chat_id: chatId, text, disable_web_page_preview: true, ...extra });
}

async function replyBalance(chatId, lang, address) {
  try {
    const raw = await getVolriaBalance(address);
    await send(chatId, TEXT[lang].balance(address, formatAmount(raw, lang)));
  } catch (err) {
    console.error("Erreur RPC :", err.message);
    await send(chatId, TEXT[lang].rpcError);
  }
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || "").trim();
  const lang = langOf(chatId, msg.from);
  const t = TEXT[lang];
  const command = text.split(/[\s@]/)[0].toLowerCase();

  if (command === "/start" || command === "/menu") return send(chatId, t.welcome, { reply_markup: mainMenu(lang) });
  if (command === "/faq") return send(chatId, t.faqTitle, { reply_markup: faqMenu(lang) });
  if (command === "/langue" || command === "/language" || command === "/lang") {
    return send(chatId, t.chooseLang, {
      reply_markup: { inline_keyboard: [[{ text: "🇫🇷 Français", callback_data: "lang:fr" }, { text: "🇬🇧 English", callback_data: "lang:en" }]] },
    });
  }
  if (command === "/balance" || command === "/solde") {
    const addr = findAddress(text);
    if (!addr) return send(chatId, t.askAddress);
    return replyBalance(chatId, lang, addr);
  }

  const addr = findAddress(text);
  if (addr) return replyBalance(chatId, lang, addr);
  if (text.startsWith("0x")) return send(chatId, t.badAddress);
  return send(chatId, t.unknown, { reply_markup: mainMenu(lang) });
}

async function handleCallback(cb) {
  const chatId = cb.message.chat.id;
  const data = cb.data || "";
  await tg("answerCallbackQuery", { callback_query_id: cb.id }).catch(() => {});

  if (data.startsWith("lang:")) {
    const lang = data.slice(5) === "fr" ? "fr" : "en";
    userLang.set(chatId, lang);
    await send(chatId, TEXT[lang].langSet);
    return send(chatId, TEXT[lang].welcome, { reply_markup: mainMenu(lang) });
  }

  const lang = langOf(chatId, cb.from);
  const t = TEXT[lang];
  if (data === "balance") return send(chatId, t.askAddress);
  if (data === "faq") return send(chatId, t.faqTitle, { reply_markup: faqMenu(lang) });
  if (data.startsWith("faq:")) {
    const item = FAQ.find((f) => f.id === data.slice(4));
    if (item) {
      return send(chatId, `❓ ${item.q[lang]}\n\n${item.a[lang]}`, {
        reply_markup: { inline_keyboard: [[{ text: t.back, callback_data: "faq" }]] },
      });
    }
  }
}

async function setCommands() {
  await tg("setMyCommands", {
    commands: [
      { command: "start", description: "Menu / Main menu" },
      { command: "balance", description: "Solde VOLRIA / VOLRIA balance" },
      { command: "faq", description: "Questions fréquentes / FAQ" },
      { command: "language", description: "Langue / Language" },
    ],
  });
}

async function main() {
  if (!TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN manquant dans .env. Crée le bot avec @BotFather puis ajoute le jeton.");
    process.exit(1);
  }
  if (!process.env.MAINNET_RPC_URL) {
    console.error("MAINNET_RPC_URL manquant dans .env (nécessaire pour lire les soldes).");
    process.exit(1);
  }
  const me = await tg("getMe", {});
  await setCommands();
  console.log(`Bot démarré : @${me.username}. Appuie sur Ctrl+C pour l'arrêter.`);

  let offset = 0;
  for (;;) {
    try {
      const updates = await tg("getUpdates", { offset, timeout: 30, allowed_updates: ["message", "callback_query"] });
      for (const u of updates) {
        offset = u.update_id + 1;
        try {
          if (u.message && u.message.text) await handleMessage(u.message);
          else if (u.callback_query) await handleCallback(u.callback_query);
        } catch (err) {
          console.error("Erreur de traitement :", err.message);
        }
      }
    } catch (err) {
      console.error("Erreur de connexion à Telegram :", err.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { findAddress, isAddress, formatAmount, pickLang, FAQ, TEXT, handleMessage, handleCallback };
