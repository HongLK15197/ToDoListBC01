import { Task } from '../models/task.js';
import { TaskService } from '../services/TaskServices.js';

//Khai báo đối tượng Service

const taskSV = new TaskService();


//Bước 1: định nghĩa và gọi hàm hàm GetAllTask
const getAllTask = async() => {
    //bước 2: dùng service để gọi api từ backend lấy dữ liệu về
    try {
        const result = await taskSV.getAllTask();
        console.log('result', result.data);
        //Bước 3: từ dữ liệu lấy về tạch ra 2 mảng => render dữ liệu lên giao diện

        let taskToDo = result.data.filter(task => task.status === false);
        console.log('Task chưa làm ', taskToDo);
        //Gọi hàm hiển thị giao diện
        renderTaskToDo(taskToDo);

        let taskCompleted = result.data.filter(task => task.status === true);
        console.log('Task đã làm xong ', taskCompleted);
        //Gọi hàm hiển thị giao diện
        renderTaskDone(taskCompleted);

    } catch (err) {
        //LỖi trong hàm try sẽ trả về biến err của catch
    }
}

const renderTaskToDo = (taskToDo) => {
    const contentTaskToDo = taskToDo.reduce((content, item, index) => {
        content += `
        <li>
            <span style="cursor:pointer">${item.taskName}</span>
            <span style="cursor:pointer" onclick="delTask('${item.taskName}')">
            <i class="fa fa-trash"></i>
            </span>
            <span style="cursor:pointer" onclick="donTask('${item.taskName}')">
            <i class="fa fa-check"></i>
            </span>
        </li>`;
        return content;
    })

    //dom tới giao diện hiện thị các li vào innerHTML của ul
    document.getElementById('todo').innerHTML = contentTaskToDo;
}

//Định nghĩa sự kiện cho nút xóa
window.delTask = async(taskName) => {
    let cfm = confirm('Bạn có muốn xóa task?');
    if (cfm) {
        //Gọi api mỗi lần người dùng bấm nút xóa dữ liệu
        try {
            let result = await taskSV.deleteTask(taskName);

            console.log(result.data);

            //Gọi lại hàm get task sao khi xóa
            getAllTask();
        } catch (err) {
            console.log(err.reponse.data);
        }
    }
}

//Định nghĩa sự kiện donetask
window.donTask = async(taskName) => {
    let cfm = confirm('Bạn đã làm xong Task rồi à?');
    if (cfm) {
        try {
            let result = await taskSV.doneTask(taskName);
            console.log(result.data);

            getAllTask();
        } catch (err) {
            console.log(err);
        }
    }
}

//Định nghĩa sự kiện rejectTask
window.rejTask = async(taskName) => {
    let cfm = confirm('Bạn muốn thực hiện lại Task đấy à?');
    if (cfm) {
        try {
            let result = await taskSV.rejectTask(taskName);
            console.log(result.data);

            getAllTask();
        } catch (err) {
            console.log(err);
        }
    }
}

const renderTaskDone = (taskCompleted) => {
    const contentTaskDone = taskCompleted.reduce((content, item, index) => {
        content += `
        <li>
            <span style="cursor:pointer">${item.taskName}</span>
            <span style="cursor:pointer" onclick="delTask('${item.taskName}')">
            <i class="fa fa-trash"></i>
            </span>
            <span style="cursor:pointer" onclick="rejTask('${item.taskName}')">
            <i class="fa fa-redo"></i>
            </span>
        </li>`;
        return content;
    })

    //dom tới giao diện hiện thị các li vào innerHTML của ul
    document.getElementById('completed').innerHTML = contentTaskDone;
}

getAllTask();

//==========Nghiệp vụ thêm task===========
//Bước 1: định nghĩa sự kiện click cho button #addItem
document.getElementById('addItem').onclick = async(event) => {
    //event.preventDefault(); //Chặn sự kiện hiện tại của thẻ submit hay thẻ href thẻ a
    //event.target <= đại diện cho thể button đang được onclick

    //lấy thông tin người dùng nhập vào giao diện

    let taskName = document.getElementById('newTask').value;

    //tạo ra object backend yêu cầu
    const taskModel = new Task();

    taskModel.taskName = taskName;

    //gọi api đưa dữ liệu về Sever
    try {
        let result = await taskSV.addTask(taskModel);
        console.log('Kết quả thêm task ', result.data);

        //Sau khi thêm thành công, gọi api getAllTask từ hàm đã viết sẳn
        getAllTask();

    } catch (err) {
        console.log(err);
    }
}