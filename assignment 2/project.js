const randomplayers = () => {
  fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=f')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let player = data;
        let fdiv = document.getElementById('fdiv');
        document.getElementById('fdiv').value = '';

        for (let i = 0; i < 10; i++) {
          let sal = player.player[i].strWage;
          if (sal == null || sal == '') {
            sal = 'N/A';
          }
          let imag = player.player[i].strThumb;
          if (imag == null || imag == '') {
            imag =
                'https://t3.ftcdn.net/jpg/10/58/16/08/240_F_1058160846_MxdSa2GeeVAF5A7Zt9X7Bp0dq0mlzeDe.jpg';
          }
          let cart = document.createElement('div');
          cart.classList.add(
              'cart', 'text-center', 'w-25', 'py-3', 'rounded', 'shadow',
              'bg-body');
          cart.innerHTML = `
                <div class=" text-center"><img src="${
              imag}" class="img "></div>
                <p class="mt-3">Name: ${player.player[i].strPlayer}</p>
                <p>Nationality: ${player.player[i].strNationality}</p>
                <p>Team: ${player.player[i].strTeam}</p>
                <p>Sports ${player.player[i].strSport}</p>
                <p>Salary: ${sal}</p>
                <p>Male/Female: ${player.player[i].strGender}</p>
                <div>
                <a href="https://${
              player.player[i]
                  .strTwitter}" target="_blank" class="me-2"><i class="fab fa-twitter"></i></a>
                <a href="https://${
              player.player[i]
                  .strInstagram}" target="_blank" class=""><i class="fab fa-instagram text-danger"></i></a>
                </div>
                <button class="border border-none bg-info rounded-2 px-2 py-1" onclick='modal(${
              player.player[i].idPlayer})' id="details">Details</button>
                <button class="border border-none bg-info rounded-2 px-2 py-1" onclick='add("${
              player.player[i].strPlayer}")'>Add to group</button>
            `;
          fdiv.appendChild(cart);
        };
      })
};
randomplayers();

// search by name
const search = (event) => {
  let input = document.getElementById('input').value;
  fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${input}`)
      .then((res) => res.json())
      .then((data) => {
        let fdiv = document.getElementById('fdiv');
        fdiv.innerHTML = ' ';
        data.player.forEach(player => {
          let sal = player.strWage;
          if (sal == null || sal == '') {
            sal = 'N/A';
          }
          let imag = player.strThumb;
          if (imag == null || imag == '') {
            imag =
                'https://t3.ftcdn.net/jpg/10/58/16/08/240_F_1058160846_MxdSa2GeeVAF5A7Zt9X7Bp0dq0mlzeDe.jpg';
          }
          let div = document.createElement('div');
          div.classList.add(
              'cart', 'border', 'border-black', 'py-3', 'text-center', 'w-25',
              'shadow', 'bg-body', 'rounded');
          div.innerHTML = `
        <div class="w-100 text-center"><img src="${
              imag}" class="img container-fluid "></div>
                <p class="mt-3">Name: ${player.strPlayer}</p>
                <p>Nationality: ${player.strNationality}</p>
                <p>Team: ${player.strTeam}</p>
                <p>Sports ${player.strSport}</p>
                <p>Salary: ${sal}</p>
                <p>Male/Female: ${player.strGender}</p>
                <div>
                <a href="https://${
              player
                  .strTwitter}" target="_blank" class="me-2"><i class="fab fa-twitter"></i></a>
                <a href="https://${
              player
                  .strInstagram}" target="_blank" class="me-2"><i class="fab fa-instagram text-danger"></i></a>
                </div>
                <button class="border border-none bg-info rounded-2 px-2 py-1" onclick='modal(${
              player.idPlayer})' id="details">Details</button>
                <button class="border border-none bg-info rounded-2 px-2 py-1" onclick='add("${
              player.strPlayer}")'>Add to group</button>
        `;
          fdiv.appendChild(div);
        });
      });
};

let count = 0;

// search by id
const modal = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        let player = data.players[0];

        let mod = document.getElementById('modl');
        let modl = document.createElement('div');
        modl.classList.add('modal', 'fade');
        modl.setAttribute('tabindex', '-1');
        let des = player.strDescriptionEN;
        if (des == null) {
          des = 'N/A';
        } else {
          des = des.slice(0, 60) + ' ...';
        }
        let sal = player.strWage;
        if (sal == null || sal == '') {
          sal = 'N/A';
        }
        modl.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Player Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Name: ${player.strPlayer}</p>
                            <p>Nationality: ${player.strNationality}</p>
                            <p>Team: ${player.strTeam}</p>
                            <p>Sport: ${player.strSport}</p>
                            <p>Salary: ${sal}</p>
                            <p>Description: ${des}</p>
                            <p>Gender: ${player.strGender}</p>
                            <div>
                            <a href="https://${
            player
                .strTwitter}" target="_blank" class="me-2"><i class="fab fa-twitter"></i></a>
                            <a href="https://${
            player
                .strInstagram}" target="_blank" class="me-2"><i class="fab fa-instagram text-danger"></i></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;
        mod.appendChild(modl);
        let bootstrapModal = new bootstrap.Modal(modl);
        bootstrapModal.show();
      })
      .catch((err) => console.log(err));
};

const addedPlayers = new Set();
const add = (name) => {
  if (addedPlayers.has(name)) {
    alert(`${name} is already in the cart!`);
    return;
  }
  if (count == 11) {
    alert('11 players completed!');
    return;
  }
  let cart = document.getElementById('cart');
  let div = document.createElement('div');
  div.innerHTML = `
        <h5>${name}</h5>
    `;
  cart.appendChild(div);
  addedPlayers.add(name);
  count += 1;
  let cnt = document.getElementById('cnt');
  cnt.innerText = count;
};