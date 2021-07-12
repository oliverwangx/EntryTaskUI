const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const changeButton = document.getElementById('change');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

myJson = { a: 'foo', b: 42, c: {} };


const changeAvatar = async () => {
	file_upload = document.getElementById('file-upload').files[0].name
    file_upload = 'image/' + file_upload
    if (file_upload == null) {
        return
    }
	const response = await fetch('http://127.0.0.1:8888/api/v1/avatar', {
	  method: 'POST',
      credentials: 'include',
	  body: JSON.stringify({'avatar_path': file_upload}), // string or object
	});

    resp = await response.json();
    document.getElementById('avatar').src = myJson.avatar_path
 
    
}

const changeAction = async () => {
	nick_name = document.getElementById('NickName').value

    if (nick_name == null) {
        return
    }
	const response = await fetch('http://127.0.0.1:8888/api/v1/nickname', {
	  method: 'POST',
      credentials: 'include',
	  body: JSON.stringify({'nick_name': nick_name}), // string or object
	});
    resp = await response.json();
    document.getElementById('new-nick-name').textContent = myJson.nick_name
}


const userAction = async () => {
	emailId = document.getElementById('username').value
	passwordId = document.getElementById('password').value
	const response = await fetch('http://127.0.0.1:8888/api/v1/users', {
	  method: 'POST',   
	  body: JSON.stringify({'username':emailId,'password': passwordId}), // string or object
	});
	myJson = await response.json()//extract JSON from the http response
	// do something with myJson
    console.log(response.headers.get('set-cookie'))
    document.getElementById('new-nick-name').textContent = myJson.nick_name
    document.getElementById('avatar').src = myJson.avatar_path
    document.cookie = 'session_token='+myJson.session_token
	console.log(myJson);
    container.classList.add("right-panel-active");
  }


  $(document).ready(function() {
	
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});