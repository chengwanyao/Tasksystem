class TaskPanel implements Observer {

	panel: egret.DisplayObjectContainer;

	stage: egret.DisplayObjectContainer;

	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private backColor = 0xFFFAFA;
	private backGround: egret.Shape;
	private panelX = 350;
	private panelY = 100;
	private panelWidth = 200;
	private panelHeight = 300;


	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "任务清单";
	private taskNameTextFieldX = 40;
	private taskNameTextFieldY = 50;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0x800000;

	private taskDescTextField: egret.TextField;
	private taskDescTextFieldText = "";
	private taskDescTextFieldX = 50;
	private taskDescTextFieldY = 100;
	private taskDescTextFieldWidth = 180;
	private taskDescTextFieldColor = 0x800080;

	private button: egret.DisplayObjectContainer;
	private buttonBack: egret.Shape;
	private buttonColor = 0xFFB6C1;
	private buttonX = 50;
	private buttonY = 200;
	private buttonWidth = 130;
	private buttonHeight = 70;

	private buttonTextField: egret.TextField;
	private buttonTextFieldText = "没有任务";
	private buttonTextFieldX = this.buttonX + 5;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 130;
	private buttonTextFieldColor = 0x191970;


	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
		this.stage = stage;
		this.taskService = taskService;
		this.taskService.Attach(this, "TaskPanel");
		this.panel = new egret.DisplayObjectContainer();
		this.taskNameTextField = new egret.TextField();
		this.taskDescTextField = new egret.TextField();
		this.backGround = new egret.Shape();
		this.button = new egret.DisplayObjectContainer();
		this.buttonBack = new egret.Shape();
		this.buttonTextField = new egret.TextField();
		this.stage.addChild(this.panel);
		this.drawPanel();
	}

	private setText() {
		this.taskNameTextField.text = this.taskNameTextFieldText;
		this.taskNameTextField.x = this.taskNameTextFieldX;
		this.taskNameTextField.y = this.taskNameTextFieldY;
		this.taskNameTextField.width = this.taskNameTextFieldWidth;
		this.taskNameTextField.bold = true;
		this.taskNameTextField.textColor = this.taskNameTextFieldColor;

		this.taskDescTextField.text = this.taskDescTextFieldText;
		this.taskDescTextField.x = this.taskDescTextFieldX;
		this.taskDescTextField.y = this.taskDescTextFieldY;
		this.taskDescTextField.width = this.taskDescTextFieldWidth;
		this.taskDescTextField.bold = false;
		this.taskDescTextField.textColor = this.taskDescTextFieldColor;
		this.taskDescTextField.textAlign = egret.HorizontalAlign.LEFT;


	}

	private drawBackGround() {
		this.backGround.graphics.beginFill(this.backColor, 1);
		this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
		this.backGround.graphics.endFill();

	}

	private drawButtonBack() {
		this.buttonBack.graphics.beginFill(this.buttonColor, 1);
		this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.buttonBack.graphics.endFill();

	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonTextFieldText;
		this.buttonTextField.x = this.buttonTextFieldX;
		this.buttonTextField.y = this.buttonTextFieldY;
		this.buttonTextField.width = this.buttonTextFieldWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextFieldColor;

	}

	private drawButton() {
		this.drawButtonBack();
		this.setButtonText();
		this.button.addChild(this.buttonBack);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
		this.panel.x = this.panelX;
		this.panel.y = this.panelY;
		this.panel.width = this.panelWidth;
		this.panel.height = this.panelHeight;
		this.drawButton();
		this.drawBackGround();
		this.setText();
		this.panel.addChild(this.backGround);
		this.panel.addChild(this.taskNameTextField);
		this.panel.addChild(this.taskDescTextField);
		this.panel.addChild(this.button);
		this.button.touchEnabled = true;
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

	}

	private onButtonClick(e: egret.TouchEvent) {
		switch (this.currentTaskStatus) {
			case TaskStatus.ACCEPTABLE:
				console.log("Accept Button Click");
				console.log("Current Task Id: " + this.currentTaskId);
				this.taskService.accept(this.currentTaskId);
				break;

			case TaskStatus.DURING:
				console.log("During Button Click");
				this.taskService.during(this.currentTaskId);
				break;


			case TaskStatus.CAN_SUBMIT:
				console.log("Submit Button Click");
				this.taskService.finish(this.currentTaskId);
				break;

			default:

		}

	}

	private onStageClick(e: egret.TouchEvent) {
		console.log("Stage Click");
	}


	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;

	}

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;

	}

	private changeButton(taskStatus: number) {
		switch (taskStatus) {
			case TaskStatus.ACCEPTABLE:
				this.buttonTextField.text = "接受啦";
				break;

			case TaskStatus.DURING:
				this.buttonTextField.text = "没有完成";
				break;

			case TaskStatus.CAN_SUBMIT:
				this.buttonTextField.text = "提交吧";
				break;

			case TaskStatus.SUBMITTED:
				this.taskNameTextField.text= "任务清单";
				this.taskDescTextField.text= "无";
				this.buttonTextField.text = "无任务";
				break;

			default:
				this.buttonTextField.text = "None";
				break;

		}

	}




}
