// --------------Global------------ //

const checkboxesEl = document.querySelectorAll(".add_ons__item input");
const planElement = document.querySelector(".plan");
const yourInfoElement = document.querySelector(".your__info");
const nextButtonElement = document.querySelector(".buttons--next");
const backButtonElement = document.querySelector(".buttons--back");
const rightSideDivs = document.querySelectorAll(".right__side > div");
const leftSideSteps = document.querySelectorAll(
  ".side__bar > .side__bar--items"
);
const btnContainerEl = document.querySelector(".right__side--buttons");
const planContainerEl = document.querySelector(".plan__container");
const planOptionsEl = document.querySelectorAll(
  ".plan__options > .plan__option"
);
const addOneCostEl = document.querySelectorAll(".add_ons--cost");

const priceEL = planContainerEl.querySelectorAll(".plan__option > .price");
const planDurationEl = document.querySelector("#plan");
const summaryPlanCostEl = document.querySelector(".summary__plan--cost h3");
const summaryPlanOptionEl = document.querySelector(".summary__plan--title h3");
const summaryAddons = document.querySelector(".summary__content");
const summaryTotalEl = document.querySelector(".summary__total h3");

// --------------Functions------------ //

addEventListener("DOMContentLoaded", (event) => {
  planDurationEl.checked = true;
  checkboxesEl.forEach((item) => {
    item.checked = false;
  });
});

// Function to handle plan changes

planDurationEl.onchange = () => {
  priceEL.forEach((item) => {
    const getPrice = (multiplier) => {
      const cost = Number(
        item.innerText
          .replace("+", "")
          .replace("$", "")
          .replace("/mo", "")
          .replace("/yr", "")
          .trim()
      );
      return cost * multiplier;
    };

    const extraMonths = item.parentElement.querySelectorAll(".extra__months");
    extraMonths.forEach((extra) => {
      extra.classList.toggle("active");
    });
    if (planDurationEl.checked) {
      const monthlyPrice = getPrice(1 / 10);
      item.innerText = `$${monthlyPrice}/mo`;
    } else {
      const yearlyPrice = getPrice(10);
      item.innerText = `$${yearlyPrice}/yr`;
    }
  });

  planOptionsEl.forEach((item) => {
    if (item.classList.contains("active")) {
      item.click();
    }
  });
};

// Function to handle checkbox changes
checkboxesEl.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const label = this.parentElement;
    const addName = label.querySelector("h4").innerText;
    const addPrice = label
      .querySelector(".add_ons--cost")
      .innerText.replace("+$", "")
      .replace("/mo", "")
      .replace("/yr", "")
      .trim();

    const htmlEl = `<div class="summary__add_ons">
                        <p>${addName}</p>
                        <p>+$${addPrice}/mo</p>
                  </div>`;
    this.checked
      ? summaryAddons.insertAdjacentHTML("beforeend", htmlEl)
      : summaryAddons.removeChild(summaryAddons.lastChild);

    label.classList.toggle("active");
  });
});

// --------------Event Listeners------------ //

planOptionsEl.forEach((item) => {
  item.addEventListener("click", () => {
    planOptionsEl.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    const planSelected = item.innerText.split("\n").filter((str) => str !== "");
    console.log(planSelected);
    summaryPlanOptionEl.innerText = planSelected[0];
    summaryPlanCostEl.innerText = planSelected[planSelected.length - 1];
  });
});

btnContainerEl.onclick = (e) => {
  const selectedBtn = e.target.className;
  // Create a new array excluding the last element
  const stepContent = Array.from(rightSideDivs).slice(0, -1);

  // Find the index of the active element
  const activeIndex = stepContent.findIndex((item) =>
    item.classList.contains("active")
  );

  const lastItem = activeIndex + 1 === stepContent.length - 1;

  switch (selectedBtn) {
    case "buttons--next":
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
      break;
    case "buttons--back active":
      activeIndex - 1 === 0 && backButtonElement.classList.remove("active");
      if (activeIndex > 0 && stepContent[activeIndex - 1]) {
        leftSideSteps[activeIndex]?.classList.remove("active");
        leftSideSteps[activeIndex - 1]?.classList.add("active");
        rightSideDivs[activeIndex].classList.remove("active");
        rightSideDivs[activeIndex - 1].classList.add("active");
      }
      break;
    default:
      break;
  }
};
