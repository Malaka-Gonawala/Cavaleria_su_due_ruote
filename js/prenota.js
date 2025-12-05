const form = document.querySelector("#Form");
const nameInput = document.querySelector("#nameInput");
const email = document.querySelector("#emailInput");
const tel = document.querySelector("#phoneInput");
const select = document.querySelector("#bikeSelect");
const dateInput = document.querySelector("#dateInput");
const timeInput = document.querySelector("#timeInput");

(() => {
    "use strict";

    // Bootstrap validation setup
    const inputs = form.querySelectorAll("input, select");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.classList.add("was-validated");
        if (form.checkValidity) {
            alert(
                nameInput.value,
                email.value,
                tel.value,
                select.value,
                dateInput.value,
                timeInput.value
            );
        }
    });

    form.addEventListener("reset", () => {
        form.classList.remove("was-validated");
        inputs.forEach((input) =>
            input.classList.remove("is-valid", "is-invalid")
        );
    });

    // Live validation
    inputs.forEach((input) => {
        const validate = () => {
            if (input.checkValidity()) {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            } else {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
            }
        };

        input.addEventListener("input", validate);
        input.addEventListener("change", validate);
    });

    // Fill bike select
    const choose = document.querySelector("#Choose");
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    function findProductById(id) {
        for (const brand in bikeCatalog) {
            const categories = bikeCatalog[brand];
            for (const category in categories) {
                const bikes = categories[category];
                for (const key in bikes) {
                    const bike = bikes[key];
                    if (bike && typeof bike === "object" && bike.id === id) {
                        return bike;
                    }
                }
            }
        }
        return null;
    }

    const selectedBike = findProductById(id);

    function fillSelect() {
        for (const brand in bikeCatalog) {
            const categories = bikeCatalog[brand];
            for (const category in categories) {
                const bikes = categories[category];

                if (category === "logo") continue;

                const group = document.createElement("optgroup");
                group.label = `${brand} – ${category}`;

                for (const key in bikes) {
                    const bike = bikes[key];
                    if (!bike || typeof bike !== "object") continue;

                    const option = document.createElement("option");
                    option.textContent = bike.name;
                    option.value = bike.id ?? bike.name;

                    if (selectedBike && bike.id === selectedBike.id) {
                        option.selected = true;
                        select.classList.add("is-valid");
                    }

                    group.appendChild(option);
                }

                select.appendChild(group);
            }
        }
    }

    fillSelect();
    if (!selectedBike) choose.selected = true;
})();
