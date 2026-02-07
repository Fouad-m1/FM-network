const user = JSON.parse(localStorage.getItem("fm_user"));

function addPoint() {
  user.points += 1;
  localStorage.setItem("fm_user", JSON.stringify(user));
  alert("Point added!");
}
