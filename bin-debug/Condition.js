var TaskCondition = (function () {
    function TaskCondition() {
    }
    var d = __define,c=TaskCondition,p=c.prototype;
    p.onAccept = function (task) {
    };
    p.onSubmit = function (task) {
    };
    return TaskCondition;
}());
egret.registerClass(TaskCondition,'TaskCondition');
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
    };
    p.onSubmit = function (task) {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition');
var TaskConditionContext = (function () {
    function TaskConditionContext() {
    }
    var d = __define,c=TaskConditionContext,p=c.prototype;
    d(p, "current"
        ,function () {
            return status;
        }
        ,function (task) {
        }
    );
    return TaskConditionContext;
}());
egret.registerClass(TaskConditionContext,'TaskConditionContext');
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
    };
    p._onSubmit = function (task) {
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition');
//# sourceMappingURL=Condition.js.map