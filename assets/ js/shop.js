const user = JSON.parse(localStorage.getItem("fm_user"));

function buy(cost) {
  if (user.points < cost) {
    alert("Not enough points");
    return;
  }

  user.points -= cost;
  localStorage.setItem("fm_user", JSON.stringify(user));
  alert("Purchased!");
}
