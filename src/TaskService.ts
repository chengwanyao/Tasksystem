class TaskService {
	observerList: ObserverType[];
	taskList: Task[];
	public constructor() {
		this.observerList = new Array();
		this.taskList = new Array();
		this.addTask("001");

	}
	task: Task;
	public Attach(observer: Observer, type: string): void {
		this.observerList.push(new ObserverType(observer, type));
	}
	public Notify(task: Task): void {
		this.observerList.forEach(element => {
			element.observer.onChange(task);
		});
	}

	public finish(id: string): ErrorCode {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "001":
				task.status = 4;
				this.Notify(task);
			default:
				return ErrorCode.TASK_ERROR_UNFIND;
		}
	}
	public accept(id: string): void {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "001":
				task.status = TaskStatus.DURING;
				this.Notify(task);
				break;
			default:
				console.log("Task cannot be found");
		}
	}
	public during(id: string) {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "001":
				this.Notify(task);
			default:
		}
	}
    public addTask(id: string) {
		var task: Task;
		task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                var task = new Task("001", "Task 1", "找到NPC2", 0, "npc_0", "npc_1");
				task.status = 1;
                this.taskList.push(task);
				this.Notify(task);
                break;
        }

	}

	getTaskByCustomRole(rule: Function, Id: string): Task {
		return rule(this.taskList, Id);

	}
	checkTaskRules(task: Task, npcId: string, NPCtalkpanel: NPCTalkPanel) {
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
    }

}
function taskSearch(taskList: Task[], id: string): Task {
	for (var i = 0; i <= taskList.length - 1; i++) {
		if (taskList[i].id == id) {
			return taskList[i];
		}
		else {
			console.log("task named" + id + "can not be found");
		}
	}

}

enum ErrorCode {

    TASK_ERROR_NULL,
    TASK_ERROR_UNFIND

}
class ObserverType {

	observer: Observer;
	type: string;

	constructor(observer: Observer, type: string) {
		this.observer = observer;
		this.type = type;
	}

}
