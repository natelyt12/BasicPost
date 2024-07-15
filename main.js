
function logout() {
    // Set lại active thành none
    localStorage.setItem("active", "none")
    location.reload()
}

function delLocal() {
    localStorage.clear()
    location.reload()
}

function dummy() {
    localStorage.setItem('a@gm.co', '[{"name":"Natelyt","email":"a@gm.co","pass":"Zz123456@"},[]]')
    localStorage.setItem('active', 'a@gm.co')
    location.reload()
}

if (localStorage.getItem('nopopup') == 'true') {
    document.getElementById('black').style.display = 'none'
}

function ok() {
    document.getElementById('black').style.opacity = '0'
    setTimeout(() => {
        document.getElementById('black').style.display = 'none'
    }, 500);
    localStorage.setItem('nopopup', 'true')
}

function no() {
    window.location.href = 'https://www.youtube.com/watch?v=9O24MDSSxt8&list=RD0A6hCfFZVj4&index=20'
    localStorage.clear()
}

// Lấy ngày tháng năm, tên người đăng post
function getHeader(date) {
    // Dates
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1; // months start from 0
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    // Lấy tên trên navbar:))
    let namE = document.getElementById("usernamE").innerHTML

    // Trả về dữ liệu func
    return `Đăng bởi ${namE} - ${day}/${month}/${year} - ${hour}:${minute}`;
}

// Toggle box tạo post
function PostBoxToggle() {
    let postBox = document.getElementById("post-box");
    let addPost = document.getElementById("add-post-box");
    if (addPost.style.transform == "translateX(0%)") {
        addPost.style.transform = "translateX(110%)";
        postBox.style.transform = "translateX(-50%)"
    } else {
        addPost.style.transform = "translateX(0%)";
        postBox.style.transform = "translateX(-85%)"
    }
}

// Check ký tự
let charcheck = /^[a-zA-Z0-9?!.áàảãạâấầẩẫậăắằẳẵặóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựđíìỉĩịéèẻẽẹêéềểễệÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰĐÍÌỈĨỊÉÈẺẼẸÊÉỀỂỄỆ\s]+$/
let titleInp = document.getElementById('post-title')
let charCount = document.getElementById('charCount')

titleInp.addEventListener('input', () => {
    const textLength = titleInp.value.length;
    charCount.textContent = `${textLength}/30`;
    if (charcheck.test(titleInp.value) == false) {
        charCount.textContent = `${textLength}/30, dính ký tự đặc biệt`
    } else if (titleInp.value.length < 4) {
        charCount.textContent = `${textLength}/30, tiêu đề quá ngắn`
    }
})


// Tạo post
function createPost() {
    event.preventDefault()

    // Lấy thông tin trong form tạo
    let getTitle = document.getElementById("post-title").value.trim()
    let getDesc = document.getElementsByClassName("ql-editor")[0]

    if (getTitle == '') {
        getTitle = 'Không có tiêu đề'
    }
    if (getDesc.innerHTML == '<p><br></p>') {
        getDesc.innerText = 'Không có nội dung bài viết'
    }

    // Tạo một object lưu thông tin
    var newPost = {
        title: getTitle,
        desc: getDesc.innerHTML,
        date: getHeader()
    }

    console.log(getTitle)
    console.log(getDesc.innerHTML)
    console.log(newPost)
    let getInfo = localStorage.getItem("active") // Lấy gmail trong local tên active
    let parseInfo = JSON.parse(localStorage.getItem(getInfo)) // Parse cái gmail đó
    parseInfo[1].unshift(newPost) // Thêm post mới vào
    console.log(parseInfo) // Console để check post mới đã thêm chưa
    let stringInfo = JSON.stringify(parseInfo) // String lại gmail đó
    localStorage.setItem(getInfo, stringInfo) // Đẩy lên gmail đó
    PostBoxToggle() // Toggle tắt cái box tạo post
    location.reload() // reload trang


}

// Code chính
// lệnh if này check xem có đăng nhập hay đăng xuất, nếu if đúng thì đang đăng xuất, còn không thì đang đăng nhập

if (localStorage.getItem("active") == null || localStorage.getItem("active") == "none") {
    localStorage.setItem("active", "none") // Đang logout nên active sẽ thành none
    console.log("No active") // log trang thái ra ngoài
    document.getElementById("logout-link").style.display = "none" // ẩn nút logout vì bạn đang logout
    document.getElementById("login-link").style.display = "block" // hiện nút login
    document.getElementById("post-link").style.display = "none" // ẩn nút tạo post
    // add element p để thông báo, element p này nếu đăng nhập sẽ hiển thị số bài đăng
    let postCon = document.getElementById("post-box")
    let counter = document.createElement("p")
    counter.id = "post-counter"
    postCon.appendChild(counter)
    document.getElementById("post-counter").innerHTML = " - Mỗi không gian trống là một khởi đầu - "

} else { // khi đăng nhập
    let getInfo = localStorage.getItem("active") // lấy active vì lúc này active đã có gmail đăng nhập
    let parseInfo = JSON.parse(localStorage.getItem(getInfo)) // lấy local của gmail trong active
    let postLength = parseInfo[1].length // lấy số post trong gmail
    document.getElementById("usernamE").innerText = parseInfo[0].name // ném vào username trên navbar
    document.getElementById("avt").innerText = parseInfo[0].name.charAt(0) // ném chữ đầu vào avt
    document.getElementById("logout-link").style.display = "block" // hiện nút đăng xuất
    document.getElementById("login-link").style.display = "none" // ẩn nút đăng nhập

    // phần này tạo post hiện lên trên trang web, lúc tạo post sẽ lưu post vào array nên bây h lấy thoai:)
    let postCon = document.getElementById("post-box")

    let counter = document.createElement("p")
    counter.id = "post-counter"
    postCon.appendChild(counter)

    for (var item of parseInfo[1]) {
        let postBody = document.createElement("div")
        postBody.classList.add("post")
        postCon.appendChild(postBody)

        let header = document.createElement("div")
        header.id = "header"
        postBody.appendChild(header)
        header.innerHTML = item.date

        let title = document.createElement("p")
        title.id = "title"
        title.innerHTML = item.title
        postBody.appendChild(title)

        let desc = document.createElement("p")
        desc.id = "desc"
        desc.innerHTML = item.desc
        postBody.appendChild(desc)

    }

    // Đếm post
    if (postLength == 0) {
        document.getElementById("post-counter").innerHTML = "Hãy bắt đầu bằng một post mới nào!"
    } else {
        document.getElementById("post-counter").innerHTML = postLength + " Bài đăng"
    }

}

