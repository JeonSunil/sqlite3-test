const main = document.querySelector('main');

fetch('/banpick')
.then(response => response.json())
.then(data => {
  let arr = Object.values(data);
  // console.log(JSON.parse(arr[14].data));

  let bigData = [];
  arr.forEach((element) => {
    bigData.push(JSON.parse(element.data));
  });

  console.log(bigData[0]);
  for(let i = 0; i<bigData.length; i++) {
  const game = document.createElement('div');
  const gameNumber = document.createElement('div');
  const blueBan = document.createElement('div');
  const bluePick = document.createElement('div');
  const redBan = document.createElement('div');
  const redPick = document.createElement('div');

  game.classList.add("game", "game" + `${Object.keys(bigData)[i]}`);
  blueBan.classList.add("blueban");
  bluePick.classList.add("bluepick");
  redBan.classList.add("redban");
  redPick.classList.add("redpick");
  gameNumber.classList.add("numberbox");
  gameNumber.textContent = Number(Object.keys(bigData)[i]) + 1

  game.appendChild(gameNumber);
  game.appendChild(blueBan);
  game.appendChild(bluePick);
  game.appendChild(redBan);
  game.appendChild(redPick);
  main.appendChild(game);

  
  for(let n = 0; n<bigData[i].blue.ban.length; n++) { 

  const blueBanList = document.createElement('div');
  const bluePickList = document.createElement('div');
  const redBanList = document.createElement('div');
  const redPickList = document.createElement('div');

  blueBanList.classList.add("list");
  bluePickList.classList.add("list");
  redBanList.classList.add("list");
  redPickList.classList.add("list");

  blueBanList.textContent = bigData[i].blue.ban[n].name;
  bluePickList.textContent = bigData[i].blue.pick[n].name;
  redBanList.textContent = bigData[i].red.ban[n].name;
  redPickList.textContent = bigData[i].red.pick[n].name;

  blueBan.appendChild(blueBanList);
  bluePick.appendChild(bluePickList);
  redBan.appendChild(redBanList);
  redPick.appendChild(redPickList);
  }
}


for(let listCount = 0; listCount<Object.keys(bigData).length; listCount++) {
  const event = document.querySelector(`.game${listCount}`);
  console.log(event);
  event.addEventListener('click', () => {
    if(confirm('삭제하시겠습니까?')) {
    fetch(`http://localhost:3000/banpick/${listCount + 15}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    })
      }  

  });

}


});
