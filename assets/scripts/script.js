// --------------Global------------ //

const checkboxes = document.querySelectorAll(".add_ons__item input");
const planElement = document.querySelector(".plan");
const yourInfoElement = document.querySelector(".your__info");
const nextButtonElement = document.querySelector(".buttons--next");
const backButtonElement = document.querySelector(".buttons--back");
const rightSideDivs = document.querySelectorAll(".right__side > div");
const leftSideSteps = document.querySelectorAll(
  ".side__bar > .side__bar--items"
);

// --------------Functions------------ //

// Function to handle checkbox changes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const label = this.parentElement;
    label.classList.toggle("add_ons__item--active");
  });
});

// --------------Event Listeners------------ //

nextButtonElement.addEventListener("click", function () {
  // Create a new array excluding the last element
  const stepContent = Array.from(rightSideDivs).slice(0, -1);

  // Find the index of the active element
  const activeIndex = stepContent.findIndex((item) =>
    item.classList.contains("active")
  );

  const lastItem = activeIndex + 1 === stepContent.length - 1;
  // Check if there's a next element and update the UI
  if (activeIndex !== -1 && stepContent[activeIndex + 1]) {
    if (lastItem) {
      nextButtonElement.classList.add("hidden");
    }
    leftSideSteps[activeIndex]?.classList.remove("active");
    leftSideSteps[activeIndex + 1]?.classList.add("active");
    rightSideDivs[activeIndex].classList.remove("active");
    rightSideDivs[activeIndex + 1].classList.add("active");
    lastItem
      ? backButtonElement.classList.remove("active")
      : backButtonElement.classList.add("active");
  }
});

// --------------Event Listeners------------ //

// Event listener for the back button
// --------------Event Listeners------------ //

// Event listener for the back button
backButtonElement.addEventListener("click", function () {
  // Create a new array excluding the last element
  const stepContent = Array.from(rightSideDivs).slice(0, -1);

  // Find the index of the active element
  const activeIndex = stepContent.findIndex((item) =>
    item.classList.contains("active")
  );

  // Log the next element in the array
  activeIndex - 1 === 0 && backButtonElement.classList.remove("active");

  // Check if there's a previous element and update the UI
  if (activeIndex > 0 && stepContent[activeIndex - 1]) {
    leftSideSteps[activeIndex]?.classList.remove("active");
    leftSideSteps[activeIndex - 1]?.classList.add("active");
    rightSideDivs[activeIndex].classList.remove("active");
    rightSideDivs[activeIndex - 1].classList.add("active");
  }
});
