class KillMonsterPanel {
    panel: egret.DisplayObjectContainer;

    stage: egret.DisplayObjectContainer;

    private taskService: TaskService;
    private currentTaskId: string;
    private currentTaskStatus: number;

    private button: egret.DisplayObjectContainer;
    private buttonBack: egret.Shape;
    private buttonColor = 0x802A2A;
    private buttonX = 50;
    private buttonY = 300;
    private buttonWidth = 220;
    private buttonHeight = 70;


private backColor = 0x40E0D0;
    private backGround: egret.Shape;
    private panelX = 0;
    private panelY = 0;
    private panelWidth = 200;
    private panelHeight = 300;


    private buttonTextField: egret.TextField;
    private buttonTextFieldText = "Kill a Monster";
    private buttonTextFieldX = this.buttonX + 5;
    private buttonTextFieldY = this.buttonY + 10;
    private buttonTextFieldWidth = 220;
    private buttonTextFieldColor = 0xFFFAFA;
    public monsterValue = 0;


    public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "KillMonsterPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    private drawButtonBack() {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();

    }
    private setButtonText() {
        this.buttonTextField.fontFamily = "KaiTi";
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
        this.panel.addChild(this.button);

        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    }
    private onButtonClick(e: egret.TouchEvent) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;

            case TaskStatus.DURING:
                this.monsterValue++;
                console.log(this.monsterValue);
                if(this.monsterValue==10){
                    this.taskService.canFinish(this.currentTaskId);
                }
                break;


            case TaskStatus.CAN_SUBMIT:
                this.monsterValue = 0;
                break;

            default:

        }

    }
    public onChange(task: Task) {
        this.currentTaskId = task.id;
        this.currentTaskStatus = task.status;

    }
}