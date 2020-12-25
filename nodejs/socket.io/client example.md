# socket.io client example

index.html
```
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous">

      <title>MongoChat</title>
      <style>
        #messages{height:300px;}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-sm-12">
            <h1 class="text-center">
              MongoChat
              <button id="clear" class="btn btn-danger">Clear</button>
            </h1>
            <div id="status" class="status"></div>
            <div id="chat">
              <input type="text" id="username" class="form-control" placeholder="Enter name...">
              <br>
              <div class="card">
                <div id="messages" class="card-block">

                </div>
              </div>
              <br>
              <textarea
              id="textarea" class="form-control"
              placeholder="Enter Message..." ></textarea>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js">
      </script>
      <script>
        (function () {
          let element = function (id) {
            // use # or . before the id string
            return document.querySelector(id);
          }

          // reference elements in a variable
          let status = element('#status');
          let messages = element('#messages');
          let textarea = element('#textarea');
          let username = element('#username');
          let clearBtn = element('#clear');

          // set default status
          let statusDefault = status.textContent;// idk why he didn't just set it to ""

          let setStatus = function (s) {
            // set status - good for use with error messsages and other user information
            status.textContent = s;
            if(s !== statusDefault){
              var delay = setTimeout(function () {
                setStatus(statusDefault);
              }, 4000);
            }//if - if its not blank, set it back to blank
          }// setStatus

          // connect to socket.io
          let socket = io.connect('http://127.0.0.1:4000');// io from above script

          if (socket != undefined) {
            console.log('Connected to socket...');

            //  get the chats (output)
            // Handle outputs
            socket.on('output',function (data) {
              console.log(data);
              if(data.length){
                for(let x = 0; x < data.length; x++){
                  // build out message div
                  var message = document.createElement("div");
                  message.setAttribute('class','chat-message');
                  message.textContent = data[x].name + ": " + data[x].message;
                  messages.appendChild(message);
                  messages.insertBefore(message, messages.firstChild);
                }
              }
            }); // output

            socket.on('status',function (data) {
              // get message status
              setStatus((typeof data === 'object') ? data.message : data);

              // If status is clear, clear text
              if(data.clear){
                textarea.value = "";
              }//if
            })// status

            // Handle Input
            textarea.addEventListener('keydown', function (event) {
              // detect enter keypress (not shift + enter)
              if (event.which === 13 && event.shiftKey == false) {
                // emit to server input
                socket.emit('input', {
                  name: username.value,
                  message: textarea.value
                });// emit
              }
            });

            // handle chat clear
            clearBtn.addEventListener('click', function () {
              socket.emit('clear');
            })// click

            socket.on('cleared', function () {
              messages.textContent = "";
              // setStatus("messages cleared");// unnecessary but i wanted to see if i could easily do it.
            })

          }// if socket != undefined
        })();//closure - why wrapped in a self-invoking closure?
      </script>
    </body>
  </html>

```
