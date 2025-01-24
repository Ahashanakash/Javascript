var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
var max = friends[0];
for (let i = 1; i < friends.length; i++) {
    if(friends[i].length>max.length){
        max=friends[i];
    }
}
console.log(max);