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


// LETS GO
// Kiểm tra form register

function getInput() {
  var reg_username = document.getElementById("reg-username").value
  var reg_email = document.getElementById("reg-email").value
  var reg_pass = document.getElementById("reg-pass").value
  var reg_repass = document.getElementById("reg-repass").value

}
// Mã regex kiểm tra mật khẩu
let usernameCheck = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
let emailCheck = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
let passCheck = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

// Check email, nếu email_check trả về string thì trùng

function validateForm(submit) {
  event.preventDefault()

  if (passCheck.test(reg_pass) == false) {
    alert("Mật khẩu không hợp lệ")
    return false
  }
  // CHeck repass
  else if (reg_pass !== reg_repass) {
    alert("Mật khẩu nhập lại không giống nhau")
    return false
  }
  // Tạo hồ sơ người dùng
  let acc = [
    {
      name: reg_username,
      email: reg_email,
      pass: reg_pass
    },
    [] // Array rỗng để lưu post
  ]
  console.log(acc[1])
  let accify = JSON.stringify(acc)
  localStorage.setItem(reg_email, accify)

  alert("Đăng ký tài khoản thành công!, bạn hãy đăng nhập tài khoản của mình.")
  toggleSlide()
}

function CheckUS() {
  getInput()
  console.log(getInput())
  if (usernameCheck.test(reg_username) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Tên người dùng không hợp lệ"
    console.log(reg_username)
    return false
  }
}

function CheckEmail() {
  getInput()
  let emailUsedCheck = localStorage.getItem(reg_email)
  if (typeof (emailUsedCheck) == "string") {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Email đã được sử dụng"
    return false
  }
  if (emailCheck.test(reg_email) == false) {
    document.getElementById("alert").style.display = "block"
    document.getElementById("errorText").innerText = "Email không hợp lệ"
    return false
  }
}

function login() {
  event.preventDefault()

  let log_email = document.getElementById("email").value
  let log_passwd = document.getElementById("passwd").value
  let parseAcc = JSON.parse(localStorage.getItem(log_email))   // Biến parseAcc để lấy email, nếu trả về null nghĩa là ko có email
  if (parseAcc == null || log_email == "" || log_passwd == "" || log_email !== parseAcc[0].email || log_passwd !== parseAcc[0].pass) {
    alert("Sai tài khoản hoặc mật khẩu")
    return false
  } else {
    alert("Đăng nhập thành công")
    localStorage.setItem("active", parseAcc[0].email) // Tạo một local có tên active lưu gmail sau khi đăng nhập để lấy thông tin
    window.location.href = "./main.html"
  }

}
