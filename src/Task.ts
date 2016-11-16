class Task {
    id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    fromNpcId: string;
    toNpcId: string;
    public constructor(id, name, desc, status, fromNpcID, toNpcId) {
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.status=status;
        this.fromNpcId=fromNpcID;
        this.toNpcId=toNpcId;
    }
}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED,
}