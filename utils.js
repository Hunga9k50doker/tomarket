const fs = require("fs");
const path = require("path");

// Đường dẫn đến file .env
const envFilePath = path.join(__dirname, ".env");

// Hàm để ghi đè biến môi trường
function updateEnv(variable, value) {
  // Đọc file .env
  fs.readFile(envFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Không thể đọc file .env:", err);
      return;
    }

    // Tạo hoặc cập nhật biến trong file
    const regex = new RegExp(`^${variable}=.*`, "m");
    const newData = data.replace(regex, `${variable}=${value}`);

    // Kiểm tra nếu biến không tồn tại trong file, thêm vào cuối
    if (!regex.test(data)) {
      newData += `\n${variable}=${value}`;
    }

    // Ghi lại file .env
    fs.writeFile(envFilePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Không thể ghi file .env:", err);
      } else {
        console.log(`Đã cập nhật ${variable} thành ${value}`);
      }
    });
  });
}

module.exports = { updateEnv };
