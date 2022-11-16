export function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

let notifyHandler = undefined;


export function successMessage(msg) {
    notifyHandler({
        title: '成功',
        message: msg,
        type: 'success'
    });
}

export function warningMessage(msg) {
    notifyHandler({
        title: '警告',
        message: msg,
        type: 'warning'
    });
}

export function infoMessage(msg) {
    notifyHandler({
        title: '提示',
        message: msg,
        type: 'info'
    });
}

export function errorMessage(msg) {
    notifyHandler({
        title: '错误',
        message: msg,
        type: 'error'
    });
}


export function installNotification($vm) {
    notifyHandler = (args) => {
        $vm.$notify(args);
    };
}


