// PREPARE
// Function để toggle box đăng nhập và đăng ký
function toggleSlide() {
  var login = document.getElementById("login-box");
  var reg = document.getElementById("register-box");
  if (login.style.transform == "translate(-50%, -200%)") {
    login.style.transform = "translate(-50%, -50%)";
    reg.style.transform = "translate(-50%, -200%)";

  } else {
    login.style.transform = "translate(-50%, -200%)";
    reg.style.transform = "translate(-50%, -50%)";
  }
  document.getElementById("alert-login").style.display = "none"
  document.getElementById("alert").style.display = "none"
}

// Function để toggle khi bấm vào quên mk
function toggleforgot() {
  var login = document.getElementById("login-box");
  var forg = document.getElementById("forgot-box");
  if (login.style.transform == "translate(-50%, -200%)") {
    login.style.transform = "translate(-50%, -50%)";
    forg.style.transform = "translate(-50%, -200%)";

  } else {
    login.style.transform = "translate(-50%, -200%)";
    forg.style.transform = "translate(-50%, -50%)";
  }
}

setTimeout(() => {
  let getDialog = document.getElementById("dialog-box")
  getDialog.style.transform = "translateY(-100%)"
}, 1000)

function toggleDialog(text) {
  let getDialog = document.getElementById("dialog-box")
  getDialog.style.transform = "translateY(0%)"
  setTimeout(() => {
    getDialog.style.transform = "translateY(-100%)"
  }, 3000)
  return document.getElementById("dialog-text").innerText = text
}


// LETS GO!
// Lấy giá trị của input
function getInput() {
  var reg_username = document.getElementById("reg-username").value
  var reg_pass = document.getElementById("reg-pass").value
  var reg_repass = document.getElementById("reg-repass").value
  return {
    username: reg_username,
    password: reg_pass,
    retype: reg_repass
  }
}

// Mã regex kiểm tra
let usernameCheck = /^(?=.{4,15}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
let passCheck = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

// Check info
function validateForm(submit) {
  event.preventDefault()
  if (CheckUS(), CheckPass(), CheckRepass() == false) {
    console.log(CheckUS(), CheckPass(), CheckRepass())
    return false
  } else if (localStorage.getItem(getInput().username) == null) {
    let acc = [
      {
        name: getInput().username,
        pass: getInput().password
      },
      [] // Array rỗng để lưu post
    ]
    console.log(acc[1])
    let accify = JSON.stringify(acc)
    localStorage.setItem(getInput().username, accify)

    toggleDialog("Đăng ký thành công, hãy đăng nhập bằng tài khoản của bạn!")

    toggleSlide()
  } else {
    toggleDialog("Tên người dùng đã được sử dụng")
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Tên người dùng đã được sử dụng"

  }
}

// Check username
function CheckUS() {
  if (usernameCheck.test(getInput().username) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Tên người dùng không hợp lệ"
    toggleDialog("Tên người dùng phải chứa ít nhất 4 ký tự, không có ký tự đặc biệt")
    return false
  } else {
    document.getElementById("alert").style.display = "none"
  }
}

// Check pass
function CheckPass() {
  if (passCheck.test(getInput().password) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Mật khẩu không hợp lệ"
    toggleDialog("Mật khẩu phải chứa chữ hoa, thường, ký tự đặc biệt và số")
    return false
  } else {
    document.getElementById("alert").style.display = "none"
  }
}

// Check pass nhập lại
function CheckRepass() {
  if (getInput().password !== getInput().retype) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Mật khẩu nhập lại không giống nhau"
    return false
  } else if (passCheck.test(getInput().password) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Bạn phải nhập đúng mật khẩu"
    return false
  } else {
    document.getElementById("alert").style.display = "none"
  }
}

// Login
function login() {
  event.preventDefault()

  let log_usr = document.getElementById("email").value
  let log_passwd = document.getElementById("passwd").value
  let parseAcc = JSON.parse(localStorage.getItem(log_usr))   // Biến parseAcc để lấy email, nếu trả về null nghĩa là ko có email
  if (parseAcc == null || log_usr == "" || log_passwd == "" || log_usr !== parseAcc[0].name || log_passwd !== parseAcc[0].pass) {
    document.getElementById("alert-login").style.display = "block"
    document.getElementById("errorText-login").innerText = "Mật khẩu của bạn không đúng"
    return false
  } else {
    localStorage.setItem("active", parseAcc[0].name) // Tạo một local có tên active lưu gmail sau khi đăng nhập để lấy thông tin
    toggleDialog("Đăng nhập thành công!, đang chuyển hướng...")
    setTimeout(() => {
      window.location.href = "./index.html"
    }, 2000)
  }

}