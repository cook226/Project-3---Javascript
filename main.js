// using jQuery to handle the events

const weatherAPIKey = "1993079b2c58108a59585ada17354f0d";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

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

// Function to handle greeting and weather
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

  $("#greeting").html(greetingText);
}
// Weather Section
function weatherHandler() {
  // Handle geolocation errors by adding an error callback.
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let url = weatherAPIURL
        .replace("{lat}", latitude)
        .replace("{lon}", longitude)
        .replace("{API key}", weatherAPIKey);

      // Use $.getJSON to call the weather API and chain .fail() for error handling.
      $.getJSON(url, function (data) {
        const condition = data.weather[0].description;
        const location = data.name;
        const temperature = data.main.temp;

        let weatherText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(
          1
        )}°C outside.`;
        $("p#weather").html(weatherText);

        // Celsius to Fahrenheit toggle
        $(".weather-group").on("click", function (event) {
          if (event.target.id === "celsius") {
            let temperature2 = temperature.toFixed(1);
            weatherText = `The weather is ${condition} in ${location} and it's ${temperature2}°C outside.`;
          } else if (event.target.id === "fahr") {
            let temperature2 = celsiusToFahrenheit(temperature).toFixed(1);
            weatherText = `The weather is ${condition} in ${location} and it's ${temperature2}°F outside.`;
          }
          $("p#weather").html(weatherText);
        });
      }).fail((error) => {
        $("p#weather").text(
          "Unable to get weather information. Please refresh your page."
        );
      });
    },
    (error) => {
      // Geolocation error callback
      $("p#weather").text(
        "Unable to retrieve your location. Please enable location services."
      );
    }
  );
}

// Function to handle navigation menu
function navHandler() {
  // Open the navigation menu
  $("#open-nav-menu").click(function () {
    $("header nav .wrapper").addClass("nav-open");
  });

  // Close the navigation menu
  $("#close-nav-menu").click(function () {
    $("header nav .wrapper").removeClass("nav-open");
  });
}

// Function to handle gallery & thumbnails
function galleryHandler() {
  let $mainImage = $("#gallery > img");
  let $thumbnails = $("#gallery .thumbnails");

  $mainImage.attr("src", galleryImages[0].src);
  $mainImage.attr("alt", galleryImages[0].alt);

  $.each(galleryImages, function (index, image) {
    let $thumb = $("<img>")
      .attr("src", image.src)
      .attr("alt", image.alt)
      .attr("data-array-index", index)
      .attr("data-selected", index === 0 ? "true" : "false");

    $thumb.click(function () {
      let selectedIndex = $(this).attr("data-array-index");
      let selectedImage = galleryImages[selectedIndex];

      $mainImage.attr("src", selectedImage.src);
      $mainImage.attr("alt", selectedImage.alt);

      $thumbnails.find("img").attr("data-selected", "false");
      $(this).attr("data-selected", "true");
    });

    $thumbnails.append($thumb);
  });
}

// Function to handle the clock
function clockHandler() {
  // Update the time every second
  setInterval(function () {
    let localTime = new Date();

    $("span[data-time=hours]").text(
      localTime.getHours().toString().padStart(2, "0")
    );
    $("span[data-time=minutes]").text(
      localTime.getMinutes().toString().padStart(2, "0")
    );
    $("span[data-time=seconds]").text(
      localTime.getSeconds().toString().padStart(2, "0")
    );
  }, 1000);
}

// Function to populate product arrays
function populateProducts(productList) {
  let $productSection = $(".products-area");
  $productSection.empty();

  // Loop through products and create an HTML element for each
  $.each(productList, function (index, product) {
    let $productElm = $('<div class="product-item"></div>');

    // Create product image
    let $productImage = $("<img>").attr({
      src: product.image,
      alt: "Image for " + product.title,
    });

    // Create product details section
    let $productDetails = $('<div class="product-details"></div>');

    // Create product title, author, price title, and price
    let $productTitle = $('<h3 class="product-title"></h3>').text(
      product.title
    );
    let $productAuthor = $('<p class="product-author"></p>').text(
      product.author
    );
    let $priceTitle = $('<p class="price-title"></p>').text("Price");
    let $price = $('<p class="product-price"></p>').text(
      product.price > 0 ? "$ " + product.price.toFixed(2) : "Free"
    );

    // Append elements
    $productDetails.append($productTitle, $productAuthor, $priceTitle, $price);
    $productElm.append($productImage, $productDetails);
    $productSection.append($productElm);
  });
}
// Function to handle products
function productsHandler() {
  let paidProducts = products.filter((product) => product.price > 0);
  let freeProducts = products.filter(
    (product) => !product.price || product.price === 0
  );

  populateProducts(products);

  $(".products-filter label[for=all] span.product-amount").text(
    products.length
  );
  $(".products-filter label[for=paid] span.product-amount").text(
    paidProducts.length
  );
  $(".products-filter label[for=free] span.product-amount").text(
    freeProducts.length
  );

  $(".products-filter").on("click", function (event) {
    let targetId = event.target.id;
    if (targetId === "all") {
      populateProducts(products);
    } else if (targetId === "paid") {
      populateProducts(paidProducts);
    } else if (targetId === "free") {
      populateProducts(freeProducts);
    }
  });
}
// Function to handle footer
function footerHandler() {
  let currentYear = new Date().getFullYear();
  $("footer").text(`© ${currentYear} - All rights reserved.`);
}

$(document).ready(function () {
  greetingHandler();
  weatherHandler();
  navHandler();
  galleryHandler();
  clockHandler();
  productsHandler();
  footerHandler();
});
