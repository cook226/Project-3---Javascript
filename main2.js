//using querySelector to select the elements and add event listeners to them
//using addEventListener to handle the events

const weatherAPIKey = "1993079b2c58108a59585ada17354f0d";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// Celsius to Fahrenheit conversion
function celsiusToFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

// Gallery images array
const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },
];

//Products array
const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

// Menu section
function menuHandler() {
  // Menu Section
  document.querySelector("#open-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
  });

  document.querySelector("#close-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
  });
}

// GreetingS Section
function greetingHandler() {
  let greetingText;

  let currentHour = new Date().getHours();
  if (currentHour < 12) {
    greetingText = "Good morning!";
  } else if (currentHour < 18) {
    greetingText = "Good afternoon!";
  } else {
    greetingText = "Good evening!";
  }

  document.querySelector("#greeting").innerHTML = greetingText;
}

// Weather Section
function weatherHandler() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = weatherAPIURL
      .replace("{lat}", latitude)
      .replace("{lon}", longitude)
      .replace("{API key}", weatherAPIKey);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const condition = data.weather[0].description;
        const location = data.name;
        const temperature = data.main.temp;

        let weatherText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(
          1
        )}°C outside.`;

        document.querySelector("p#weather").innerHTML = weatherText;

        // Celsius To Fahrenheit toggle
        document
          .querySelector(".weather-group")
          .addEventListener("click", function (event) {
            if (event.target.id === "celsius") {
              let temperature2 = temperature.toFixed(1);
              weatherText = `The weather is ${condition} in ${location} and it's ${temperature2}°C outside.`;
            } else if (event.target.id === "fahr") {
              let temperature2 = celsiusToFahrenheit(temperature).toFixed(1);
              weatherText = `The weather is ${condition} in ${location} and it's ${temperature2}°F outside.`;
            }
            document.querySelector("p#weather").innerHTML = weatherText;
          });
      })
      .catch((error) => {
        document.querySelector("p#weather").textContent =
          "Unable to get weather information. Please refresh your page.";
      });
  });
}

// Clock Section
function clockHandler() {
  // Update the time every second
  setInterval(() => {
    let localTime = new Date();

    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}

// Gallery Section
function galleryHandler() {
  let mainImage = document.querySelector("#gallery > img");
  let thumbnails = document.querySelector("#gallery .thumbnails");

  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  galleryImages.forEach(function (image, index) {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

    thumb.addEventListener("click", function (event) {
      let selectedIndex = event.target.dataset.arrayIndex;
      let selectedImage = galleryImages[selectedIndex];
      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      thumbnails.querySelectorAll("img").forEach(function (thumb) {
        thumb.dataset.selected =
          thumb.dataset.arrayIndex === selectedIndex ? true : false;
      });
    });

    thumbnails.appendChild(thumb);
  });
}

function populateProducts(productList) {
  let productSection = document.querySelector(".products-area");
  productSection.textContent = "";

  // Run a loop through the products and create an HTML element ("product-item") for each of them
  productList.forEach(function (product, index) {
    // Create the HTML element for the individual product
    let productElm = document.createElement("div");
    productElm.classList.add("product-item");

    // Create the product image
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Image for " + product.title;

    // Create the product details section
    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    // Create product title, author, and price-title, and price
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;

    let priceTitle = document.createElement("p");
    priceTitle.classList.add("price-title");
    priceTitle.textContent = "Price";

    let price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent =
      product.price > 0 ? "$ " + product.price.toFixed(2) : "Free";

    // append the product details
    productDetails.append(productTitle);
    productDetails.append(productAuthor);
    productDetails.append(priceTitle);
    productDetails.append(price);

    // Add all child HTML elements of the product
    productElm.append(productImage);
    productElm.append(productDetails);

    // Add complete individual products to the product section
    productSection.append(productElm);
  });
}

// Product section
function productsHandler() {
  // let paidProducts = products.filter((product) => product.price > 0).length;
  let paidProducts = products.filter((product) => product.price > 0);

  let freeProducts = products.filter(
    (product) => !product.price || product.price === 0
  );

  populateProducts(products);

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).textContent = products.length;

  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).textContent = paidProducts.length;

  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).textContent = freeProducts.length;

  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", function (event) {
    if (event.target.id === "all") {
      populateProducts(products);
    } else if (event.target.id === "paid") {
      populateProducts(paidProducts);
    } else if (event.target.id === "free") {
      populateProducts(freeProducts);
    }
  });
}
// Footer section
function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector(
    "footer"
  ).textContent = `© ${currentYear} - All rights reserved.`;
}

// page load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
