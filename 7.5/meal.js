const alliteam = (item) => {
  if (item) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.meals) {
            meallist(data.meals);
          } 
          else {
            let div1 = document.getElementById('allitem').innerHTML="";
            let div = document.getElementById('no');
            let h4 = document.createElement('h4');
            h4.classList.add('h4', 'mt-1');
            h4.innerText = 'No meal found!';
            div.appendChild(h4);
          }
        })
  }
};

const meallist = (array) => {
  // let div = document.getElementById("list");
  let div1 = document.getElementById('no').innerHTML="";
  let div = document.getElementById('allitem');
  div.innerHTML="";
  array.forEach(element => {
    let div1 = document.createElement('div');
    div1.classList.add('col-3');
    div1.addEventListener('click', () => show(element));
    div1.innerHTML = `
            <div class="x rounded-3 border border-black shadow bg-body"><img src="${element.strMealThumb}" class="image ">
            <h4 class="text-center text-primary">${element.strMeal}</h4>
            </div>
        `;
    div.appendChild(div1);
  });
};

const btn = (event) => {
  let search = document.getElementById('item').value;
  alliteam(search);
  document.getElementById('item').value="";
}; 
const show = (element) => {
  let start = document.getElementById('start');
  let ingredients = '';
  for (let i = 1; i <=9; i++) {
    const ingredient = element[`strIngredient${i}`];
    if (ingredient) {
      ingredients += `<li>${ingredient}</li>`;
    }
    else{
        break;
    }
  }
  start.innerHTML = `
        <img src="${element.strMealThumb}" class="imag container-fluid shadow rounded bg-body">
        <h4 class="ms-3">${element.strMeal}</h4>
        <h5 class="ms-3">Ingredients</h5>
        <ul>${ingredients}</ul>
    `;
}
