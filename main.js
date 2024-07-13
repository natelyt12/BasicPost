function logout() {
    // Set lại active thành none
    localStorage.setItem("active", "none")
    location.reload()
}

function delLocal() {
    localStorage.clear()
    location.reload()
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

// Tạo post
function createPost() {
    event.preventDefault()

    // Lấy thông tin trong form tạo
    let getTitle = document.getElementById("post-title").value.trim()
    let getDesc = document.getElementById("post-desc")

    if (getTitle.value == 'null' || getDesc == 'null') {
        console.log('no')
        console.log(getTitle + ',' + getDesc.value)
        return false
    } else {
        // Tạo một object lưu thông tin
        var newPost = {
            title: getTitle,
            desc: getDesc.value,
            date: getHeader()
        }
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

function dummy() {
    localStorage.setItem('a@gm.co', '[{"name":"Natelyt","email":"a@gm.co","pass":"Zz123456@"},[]]')
    localStorage.setItem('active', 'a@gm.co')
    location.reload()
}