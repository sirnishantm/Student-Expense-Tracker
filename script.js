const nameInput = document.querySelector("#expenseName");

const amountInput = document.querySelector("#expenseAmount");

const categorySelect = document.querySelector("#expenseCategory");

const addBtn = document.querySelector("#addBtn");

const expenseList = document.querySelector("#expenseList");

const totalAmountEl = document.querySelector("#totalAmount");

const filterSelect = document.querySelector("#filterCategory");

function updateTotal() {
    let items = document.querySelectorAll("#expenseList li");

    let total = 0;

    items.forEach(function (item) {
        total += parseFloat(item.getAttribute("data-amount"));
    });

    totalAmountEl.textContent = total.toFixed(2);
}

function filterExpenses() {
    let filter = filterSelect.value;

    let items = document.querySelectorAll("#expenseList li");

    items.forEach(function (item) {
        let category = item.getAttribute("data-category");

        if (filter === "All" || category === filter) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

function addExpense() {
    let name = nameInput.value.trim();

    let amount = parseFloat(amountInput.value);

    let category = categorySelect.value;

    if (name === "") {
        alert("Please enter expense name");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount");
        return;
    }

    if (category === "") {
        alert("Please select a category");
        return;
    }

    let li = document.createElement("li");
    li.setAttribute("data-amount", amount);
    li.setAttribute("data-category", category);

    let nameSpan = document.createElement("span");
    nameSpan.textContent = name;

    let categorySpan = document.createElement("span");
    categorySpan.textContent = category;
    categorySpan.classList.add("category");

    let amountSpan = document.createElement("span");
    amountSpan.textContent = "₹" + amount.toFixed(2);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateTotal();
    });

    li.appendChild(nameSpan);
    li.appendChild(categorySpan);
    li.appendChild(amountSpan);
    li.appendChild(deleteBtn);

    expenseList.appendChild(li);

    nameInput.value = "";
    amountInput.value = "";
    categorySelect.selectedIndex = 0;

    updateTotal();
    filterExpenses();
}

addBtn.addEventListener("click", addExpense);

filterSelect.addEventListener("change", filterExpenses);
