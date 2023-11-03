"use strict";

// 1. Bắt sự kiện Click vào nút "Submit"
//  1.1 Lấy các DOM  Element cần sử dụng
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBMI = document.getElementById("BMI-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const petArr = [];

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  breed: "Tobby",
  color: "red",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: new Date(2023, 8, 13),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  breed: "Mixed Breed",
  color: "green",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  date: new Date(2023, 9, 13),
};

petArr.push(data1, data2);
// petArr.push(data2);

// *** CONDITION VALIDATE
const validateData = function (data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;
  // Không có trường nào bị nhập thiếu dữ liệu.
  if (data.id.trim() === "") {
    alert(`You need to fill a ID`);
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert(`You need to fill a Name`);
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert(`You need to fill a Age`);
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert(`You need to fill a Weight`);
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert(`You need to fill a Length`);
    isValidate = false;
  }

  // Giá trị ID là duy nhất!
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert(`ID must be unique!`);
      isValidate = false;
    }
  }

  //  1=< Age =< 15
  if (data.age < 1 || data.age > 15) {
    alert(`Age must be between 1 and 15!`);
    isValidate = false;
  }
  //  1=< Weight =< 15
  if (data.weight < 1 || data.weight > 15) {
    alert(`Weight must be between 1 and 15!`);
    isValidate = false;
  }
  // 1=< Length =< 100
  if (data.length < 1 || data.length > 100) {
    alert(`Length must be between 1 and 100!`);
    isValidate = false;
  }
  // Bắt buộc phải chọn giá trị cho trường Type.
  if (data.type === "Select Type") {
    alert(`Please select Type!`);
    isValidate = false;
  }
  //Bắt buộc phải chọn giá trị cho trường Breed.
  if (data.breed === "Select Breed") {
    alert(`Please select Breed!`);
    isValidate = false;
  }
  return isValidate;
};

// *** Hàm hiển thị danh sách thú cưng
const renderTableData = function (petArr) {
  // Xóa toàn bộ nội dung của bảng
  tableBodyEl.innerHTML = "";
  // Tạo các hàng mới tương ứng với từng thú cưng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); // Tạo 1 thẻ tr
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>

    <td>${petArr[i].bmi}</td>

    <td>${petArr[i].date.getDate()} / ${petArr[i].date.getMonth() + 1}/${petArr[
      i
    ].date.getFullYear()}
    </td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td>
    `;
    tableBodyEl.appendChild(row);
  }
};
renderTableData(petArr);

// *** Hàm xóa một thú cưng (DELETE)
const deletePet = function (petID) {
  // Xác nhận trước khi xóa
  const isDelete = confirm(`Are you sure?`);
  // Thực hiện xóa thú cưng
  for (let i = 0; i < petArr.length; i++) {
    if (petID === petArr[i].id) {
      petArr.splice(i, 1);
    }
  }
  // Hiển thị lại các phần tử còn lại trong petArr
  renderTableData(petArr);
};

// *** Hàm xóa các dữ liệu nhập trong Form Input
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// 1.2 Bắt sự kiện khi nhấn nút SUBMIT
submitBtn.addEventListener("click", function () {
  // 1.2.1. Lấy được dữ liệu nhập vào của người dùng từ các Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: "?",

    // action:
  };

  // 1.2.2. Validate dữ liệu hợp lệ. If true => 1.2.3-5, if false => Hiển thị lỗi đó ra cho người dùng.
  const validate = validateData(data);
  console.log(validate);

  if (validate) {
    // 1.2.3. Thêm thú cưng vào danh sách
    petArr.push(data);
    console.log(petArr);
    // 1.2.4. Hiển thị danh sách thú cưng
    renderTableData(petArr);
    // 1.2.5. Xóa các dữ liệu nhập trong Form Input
    clearInput();
  }
});

// 1.3 Hiển thị các thú cưng khỏe mạnh bắt sự kiện "Show All Pet"
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    // Nếu thú cưng đươc tiêm chủng rồi thì thêm vào mảng healthyPetArr
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    // Hiển thị thú cưng khỏe mạnh
    renderTableData(healthyPetArr);
    // Đổi tên nút khi nhấn vào
    healthyBtn.textContent = "Show All Pet";
    // Đổi lại trạng thái biến cờ hiệu
    healthyCheck = false;
  } else {
    // Hiển thị tất cả thú cưng
    renderTableData(petArr);
    // Đổi tên nút khi nhấn vào
    healthyBtn.textContent = "Show Healthy Pet";
    // Đổi lại trạng thái biến cờ hiệu
    healthyCheck = true;
  }
});

// 1.3 (Nâng cao) Tính toán chỉ số BMI
calculateBMI.onclick = function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = petArr[i].type = "dog"
      ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
      : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }

  renderTableData(petArr);
};
