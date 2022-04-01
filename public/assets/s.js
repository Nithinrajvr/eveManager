const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const tktcount = document.getElementById("tktcount");
const totalamt = document.getElementById("totalamt");
const seatNumbers = document.getElementById("seatNumbers");
const seatindex1 = document.getElementById("seatindex");
const price = localStorage.getItem("price");
populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);

  // localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  localStorage.setItem("selectedSeats", seatsIndex);

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = Number(selectedSeatsCount) * Number(ticketPrice);
  tktcount.value = selectedSeatsCount;
  totalamt.value = Number(selectedSeatsCount) * Number(ticketPrice);
  seatNumbers.innerText = seatsIndex;
  seatindex1.value = seatsIndex;
  localStorage.setItem("seatcount", Number(selectedSeatsCount));
  localStorage.setItem(
    "totalamt",
    Number(selectedSeatsCount) * Number(ticketPrice)
  );
  // alert(Number(selectedSeatsCount) * Number(ticketPrice));
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function populateOccupied() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatsoccupied"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }
}
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
updateSelectedCount();
