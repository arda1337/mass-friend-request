const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
  // See other options here
  // https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
  // All partials are loaded automatically
});
const fs = require("fs")

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
});

const filePath = './id.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`An error occurred while reading the file : ${err}`);
    return;
  }

  const userIDs = data.split('\n').map((id) => id.trim());

  // Her kullanıcıya arkadaşlık isteği gönderin
  let i = 0;
  const sendFriendRequest = setInterval(() => {
    if (i >= userIDs.length) {
      clearInterval(sendFriendRequest);
      console.log('Tüm arkadaşlık istekleri gönderildi.');
      return;
    }

    const userID = userIDs[i];
    client.users.fetch(userID)
      .then(user => {
        console.log(`Sending friend request to ${user.tag}`);
        user.sendFriendRequest()
          .then(() => console.log(`Friend request sent successfully to ${user.tag}`))
          .catch((error) => console.error(`An error occurred while sending friend request: ${error}`));
      })
      .catch((error) => console.error(`An error occurred while sending friend request: ${error}`));

    i++;
  }, 10000);
});

client.login("MzI0Mjc2OTMyODc3NDg0MDMy.G4SjzW.SzFr8-CkXnb6S2UeRVMBa-BYyoWCCHaWwIgs-k"); 
