var database = firebase.database();

let user;
user = prompt("enter your name");
console.log(user)
click();
let msgs = document.getElementById("container");

var count = 0;
var count1 = 0;
async function click() {
    // console.log("yes");

    await database.ref("masseges").on('child_added', function(snapshot) {
        let data = snapshot.val();
        let loader = document.querySelector(".loader");
        if (loader) {
            loader.remove();
        }
        let html;
        if (user === data["user"]) {
            html = ` <div class="d-flex flex-row-reverse align-items-start mb-3">
                <img src="img002.jpg" class="img" alt="img">
                <div class="div d-inline-block mx-2">
                  <div class="clearfix">
                    <small class="font-weight-light text-secondary float-right">${data["user"]}</small>
                   </div>
                    <h5 class="bg-primary p-2 rounded-lg border font-weight-light text-white m-0">${data["text"]}</h5>
                    <div class="clearfix">
                        <small class="font-weight-light text-secondary">${data["date"]}</small>
                    </div>
                </div>
            </div>`
        } else {
            html = ` <div class="d-flex align-items-start mb-3">
                <img src="img002.jpg" class="img" alt="img">
                <div class="div d-inline-block mx-2">
                   <div class="clearfix">
                     <small class="font-weight-light text-secondary">${data["user"]}</small>
                   </div>
                    <h5 class="bg-primary p-2 rounded-lg border font-weight-light text-white m-0">${data["text"]}</h5>
                    <div class="clearfix">
                        <small class="font-weight-light text-secondary float-right">${data["date"]}</small>
                    </div>
                </div>
            </div>`
        }
        msgs.insertAdjacentHTML("beforeend", html)

        console.log(data);
    });

}
// var now = new Date().getTime();
// var query = database.ref("masseges/").orderByChild('timestamp').endAt(now);
// query.on('child_added', function(snap) {
//     if (count === 0) {
//         console.log(snap.val() + "hello")
//     } else {
//         count1++;
//     }

// });



document.getElementById("btn").addEventListener("click", addMsg);
document.getElementById("textInput").addEventListener("keypress", e => {
    if (e.code === "Enter") {
        addMsg();
    }
})


function addMsg() {
    let textInput = document.getElementById("textInput").value;
    document.getElementById("textInput").value = "";
    if (textInput !== "") {
        let time = new Date;
        database.ref('masseges/').push({
            user: user,
            date: time.getHours() + ":" + time.getMinutes(),
            text: textInput
        });
    }

}