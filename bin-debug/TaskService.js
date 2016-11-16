var TaskService = (function () {
    function TaskService() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.addTask("001");
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.Attach = function (observer, type) {
        this.observerList.push(new ObserverType(observer, type));
    };
    p.Notify = function (task) {
        this.observerList.forEach(function (element) {
            element.observer.onChange(task);
        });
    };
    p.finish = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                task.status = 4;
                this.Notify(task);
            default:
                return ErrorCode.TASK_ERROR_UNFIND;
        }
    };
    p.accept = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                task.status = TaskStatus.DURING;
                this.Notify(task);
                break;
            default:
                console.log("Task cannot be found");
        }
    };
    p.during = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                this.Notify(task);
            default:
        }
    };
    p.addTask = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                var task = new Task("001", "Task 1", "找到NPC2", 0, "npc_0", "npc_1");
                task.status = 1;
                this.taskList.push(task);
                this.Notify(task);
                break;
        }
    };
    p.getTaskByCustomRole = function (rule, Id) {
        return rule(this.taskList, Id);
    };
    p.checkTaskRules = function (task, npcId, NPCtalkpanel) {
        switch (task.status) {
            case TaskStatus.ACCEPTABLE:
                switch (task.id) {
                    case "001":
                        if (task.fromNpcId == npcId) {
                            NPCtalkpanel.onOpen(task);
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                switch (task.id) {
                    case "001":
                        if (task.toNpcId == npcId) {
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.DURING:
                switch (task.id) {
                    case "001":
                        if (task.toNpcId == npcId) {
                            task.status = TaskStatus.CAN_SUBMIT;
                            NPCtalkpanel.onOpen(task);
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.SUBMITTED:
                switch (task.id) {
                    case "001":
                        this.Notify(task);
                        break;
                }
                break;
            case TaskStatus.UNACCEPTABLE:
                switch (task.id) {
                    case "001":
                        this.Notify(task);
                        break;
                }
                break;
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
function taskSearch(taskList, id) {
    for (var i = 0; i <= taskList.length - 1; i++) {
        if (taskList[i].id == id) {
            return taskList[i];
        }
        else {
            console.log("task named" + id + "can not be found");
        }
    }
}
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["TASK_ERROR_NULL"] = 0] = "TASK_ERROR_NULL";
    ErrorCode[ErrorCode["TASK_ERROR_UNFIND"] = 1] = "TASK_ERROR_UNFIND";
})(ErrorCode || (ErrorCode = {}));
var ObserverType = (function () {
    function ObserverType(observer, type) {
        this.observer = observer;
        this.type = type;
    }
    var d = __define,c=ObserverType,p=c.prototype;
    return ObserverType;
}());
egret.registerClass(ObserverType,'ObserverType');
//# sourceMappingURL=TaskService.js.map