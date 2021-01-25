import { BaseService } from "./BaseService.js";

export class TaskService extends BaseService {

    constructor() {
        super()
    }

    //Định nghĩa công thức GetAllTask

    getAllTask = () => {
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    }

    //định nghĩa hàm đưa dữ liệu về BackEnd

    addTask = (task) => { //<= đúng định dạng theo quy định của backend
        return promise = this.post('http://svcy.myclass.vn/api/ToDoList/AddTask', task);
    }

    //===============Nghiệp vụ xóa dữ liệu==================
    deleteTask = (taskName) => {
        return promise = this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`);
    }

    //===========Xây dựng chức năng donetask, reject task============
    doneTask = (taskName) => {
        return promise = this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`);
    }

    rejectTask = (taskName) => {
        return promise = this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`);
    }
}