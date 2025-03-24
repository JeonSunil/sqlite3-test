const blueBan = document.querySelector('.blueban');
const bluePick = document.querySelector('.bluepick');
const redBan = document.querySelector('.redban');
const redPick = document.querySelector('.redpick');
const gameNumber = document.querySelectorAll('section')[0];


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
  const gameSet = document.createElement('div');
  const gameCount = document.createElement('div');
  const blueBanList = document.createElement('div');
  const bluePickList = document.createElement('div');
  const redBanList = document.createElement('div');
  const redPickList = document.createElement('div');
  
  blueBanList.classList.add("list", "list" + `${Object.keys(bigData)[i]}`);
  bluePickList.classList.add("list", "list" + `${Object.keys(bigData)[i]}`);
  redBanList.classList.add("list", "list" + `${Object.keys(bigData)[i]}`);
  redPickList.classList.add("list", "list" + `${Object.keys(bigData)[i]}`);
  gameSet.classList.add("numberList", "list" + `${Object.keys(bigData)[i]}`);
  gameCount.classList.add("champion");
  gameCount.textContent = Number(Object.keys(bigData)[i]) + 1

  blueBan.appendChild(blueBanList);
  bluePick.appendChild(bluePickList);
  redBan.appendChild(redBanList);
  redPick.appendChild(redPickList);
  gameNumber.appendChild(gameSet);
  gameSet.appendChild(gameCount);
  
  for(let n = 0; n<bigData[i].blue.ban.length; n++) { 

  const blueBanChampion = document.createElement('div');
  const bluePickChampion = document.createElement('div');
  const redBanChampion = document.createElement('div');
  const redPickChampion = document.createElement('div');

  blueBanChampion.classList.add("champion");
  bluePickChampion.classList.add("champion");
  redBanChampion.classList.add("champion");
  redPickChampion.classList.add("champion");

  blueBanChampion.textContent = bigData[i].blue.ban[n].name;
  bluePickChampion.textContent = bigData[i].blue.pick[n].name;
  redBanChampion.textContent = bigData[i].red.ban[n].name;
  redPickChampion.textContent = bigData[i].red.pick[n].name;

  blueBanList.appendChild(blueBanChampion);
  bluePickList.appendChild(bluePickChampion);
  redBanList.appendChild(redBanChampion);
  redPickList.appendChild(redPickChampion);
  }
}


for(let listCount = 0; listCount<Object.keys(bigData).length; listCount++) {
  const event = document.querySelector(`.list${listCount}`);
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
