const monthlySavings = (newarr, number) => {
  let sum = 0;
  for (let i = 0; i < newarr.length; i++) {
    if (newarr[i] >= 3000) {
      let x = newarr[i] * (20 / 100);
      newarr[i] -= x;
    }
    sum += newarr[i];
  }
  sum -= number;
  return sum;
};


let arr = prompt('Enter payments');
arr = arr.split(' ');
let n = prompt('enter living cost');
n = n.split(' ');
let number = n.map(string => parseFloat(string));
let newarr = arr.map(string => parseFloat(string));
if (number.length <= 1) {
  let savings = monthlySavings(newarr, number);
  if (savings >= 0) {
    console.log(savings);
  } else {
    console.log('"earn more money"');
  }
} 
else {
  console.log('invalid input');
}