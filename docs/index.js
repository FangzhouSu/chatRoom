// 登录处的逻辑设计
const userName = document.getElementById('userName');// 用户名
const password = document.getElementById('password');// 密码
const loginBox = document.getElementById('login');// 登录框主体
const chatroom = document.getElementById('chatroom');// 聊天室主体
const loginBtn = document.querySelector('.login-button');// 登录按钮


// 调用API去与服务端取得连接
// 聊天室主体处的逻辑设计
const sendBtn = document.getElementById('send');// 发送信息的按钮
const sendInput = document.getElementById('sendInput');// 消息输入框
const msgList = document.querySelector('.list');// 聊天内容显示框
const msgBox = document.querySelector('.list-item');// 一条聊天内容——包括头像、消息

let socket = null// 简单地直接定义全局变量socket
// 登录功能的封装
function login(userName, passWord) {
	// 01 建立WebSocket连接
	// @ts-ignore
	socket = io({
		query: {
			name: userName,
			password: passWord,
		},
		reconnection: false,
	})
	// 02 处理认证错误——认证失败 进入这个事件回调
	socket.on('connect_error', (err) => {
		if(err && err.message === 'INVALID_USERNAME' || err.message === 'INVALID_PASSWORD') {
			alert('认证失败！');
			return;
		}
		// 或者因为网络原因 服务端没启动 那么就显示认证失败
		alert('连接失败，请检查WebSocket服务器')
	})
	// 登陆成功
	socket.on('connect', () => {
		// 通过HTTP的GET请求获取历史聊天记录
		// fetch(path) 返回promise对象 然后进行接下来的回调
		// alert(`欢迎你！${userName}!`)
		// console.log(`用户${userName}登录了！`);
		window.localStorage.setItem('userName', userName)
		window.localStorage.setItem('passWord', passWord)
		showChatroom()
		fetch('/history').then(res => res.json()).then((history) => {
			// console.log('history:', history);
			history.forEach(item => {
				// 确定history中哪条信息是之前自己发的 赋予其样式
				if(item.sender === userName) {
					item.isMsgMe = true
				}
			})
			updateMessageList(history)
		})
	})
	// 存疑——这里在刷新页面（退出聊天室）时没有被触发
	socket.on('disconnect', (users) => {
		console.log(`${userName}下线了！`);
		renderUserList(users)
		// 连接断开
	})
	// 03 接收广播消息——只要有登录用户发消息，服务端就会向所有客户端广播
	socket.on('receiveMessage', (message) => {
		console.log('received a broadcast message.', message);
		if(message.sender === userName) {
			message.isMsgMe = true// 是本人发的则将属性赋为true
		}
		addMsg(message)
	})
	// 有人登录的消息——打印当前登录者的信息
	socket.on('online', (users) => {
		console.log('online users', users);
		renderUserList(users)
	})
}
// 发送一条消息
function send(msg) {
	socket.emit('sendMessage', msg)
}
// 渲染在线用户列表
function renderUserList(users) {
	const userList = document.querySelector('.contact-list')
	userList.innerHTML = '';
	users.forEach(user => {
		const li = document.createElement('li')
		li.setAttribute('class', 'contact-item')
		li.innerText = user
		userList.appendChild(li)
	})
}
// 每次登录（重新进入聊天室）时更新消息框中的所有消息
function updateMessageList(history) {
	history.forEach(hr => {
		console.log(JSON.stringify(hr));
		addMsg(hr)
	})
}
// 向消息框追加一条消息
function addMsg(message) {
	const msgBox = document.createElement('div');
	const msgMe = document.createElement('div');
	const imgMe = document.createElement('img');
	// console.log("对话框中的信息是传过来的：" + JSON.stringify(message));
	imgMe.src = "./favicon.ico"
	msgMe.innerHTML = message.content
	// 给新添的文本和头像加样式
	msgMe.setAttribute('class', 'message');
	imgMe.setAttribute('class', 'avatar');
	// 根据发送者是否为自己来确定消息气泡的样式与位置
	if(message.isMsgMe === true) {
		msgBox.setAttribute('class', 'list-item');// 新添的那一条聊天内容整体-消息、头像
		msgBox.appendChild(msgMe);
		msgBox.appendChild(imgMe);
	}
	else { 
		msgBox.setAttribute('class', 'list-item-left')// 如果消息不是自己发的，放到左边
		msgBox.appendChild(imgMe);
		msgBox.appendChild(msgMe);
	}
	msgList.appendChild(msgBox);// 将一条信息放到对话窗口中
}
// 点击登录按钮的监听函数
function handleLogin() {
	// @ts-ignore
	const username = document.querySelector('#userName').value
	// @ts-ignore
	const password = document.querySelector('#password').value
	login(username, password)
}
function showChatroom() {
	loginBox.style.display = 'none'
	chatroom.style.visibility = 'visible'
}

sendBtn.addEventListener('click', () => {
	// @ts-ignore
	// 发送聊天消息
	let message = sendInput.value
	console.log(message)
	if(message.length > 0) {
		send(message)
		clearBox()
	}
})

function clearBox(){
	// @ts-ignore
	// 清空输入框
	document.getElementById('sendInput').value = null
}