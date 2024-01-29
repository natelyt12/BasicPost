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
  var reg_email = document.getElementById("reg-email").value
  var reg_pass = document.getElementById("reg-pass").value
  var reg_repass = document.getElementById("reg-repass").value
  return {
    username: reg_username,
    email: reg_email,
    password: reg_pass,
    retype: reg_repass
  }
}

// Mã regex kiểm tra
let usernameCheck = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
let emailCheck = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
let passCheck = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

// Check info
function validateForm(submit) {
  event.preventDefault()
  if (CheckUS(), CheckEmail(), CheckPass(), CheckRepass() == false) {
    console.log(CheckUS(), CheckEmail(), CheckPass(), CheckRepass())
    return false
  } else {
    let acc = [
      {
        name: getInput().username,
        email: getInput().email,
        pass: getInput().password
      },
      [] // Array rỗng để lưu post
    ]
    console.log(acc[1])
    let accify = JSON.stringify(acc)
    localStorage.setItem(getInput().email, accify)

    toggleDialog("Đăng ký thành công, hãy đăng nhập bằng tài khoản của bạn!")
    toggleSlide()
  }
}

// Check username
function CheckUS() {
  if (usernameCheck.test(getInput().username) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Tên người dùng không hợp lệ"
    toggleDialog("Tên người dùng phải chứa ít nhất 3 ký tự, không có ký tự đặc biệt")
    return false
  } else {
    document.getElementById("alert").style.display = "none"
  }
}

// Check email
function CheckEmail() {
  let getEmail = getInput().email
  let emailUsedCheck = localStorage.getItem(getEmail)
  if (typeof (emailUsedCheck) == "string") {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Email đã được sử dụng"
    return false
  } else
    if (emailCheck.test(getEmail) == false) {
      document.getElementById("alert").style.display = "block"
      document.getElementById("errorText").innerText = "Email không hợp lệ"
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


function login() {
  event.preventDefault()

  let log_email = document.getElementById("email").value
  let log_passwd = document.getElementById("passwd").value
  let parseAcc = JSON.parse(localStorage.getItem(log_email))   // Biến parseAcc để lấy email, nếu trả về null nghĩa là ko có email
  if (parseAcc == null || log_email == "" || log_passwd == "" || log_email !== parseAcc[0].email || log_passwd !== parseAcc[0].pass) {
    document.getElementById("alert-login").style.display = "block"
    document.getElementById("errorText-login").innerText = "Sai tài khoản hoặc mật khẩu"
    return false
  } else {
    localStorage.setItem("active", parseAcc[0].email) // Tạo một local có tên active lưu gmail sau khi đăng nhập để lấy thông tin
    toggleDialog("Đăng nhập thành công!, đang chuyển hướng...")
    setTimeout(() => {
      window.location.href = "./index.html"
    },2000)
  }

}
