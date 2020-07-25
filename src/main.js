/**
 * 搜索框动效
 */
const $searchButton = $('.searchForm>button')
$('.searchForm>input').on({
    click: () => {
        $searchButton.css('opacity', '1')
    },
    mouseout: () => {
        $searchButton.css('opacity', '0')
    }
})

/**
 * 弹窗参数
 *
 */

const $inputName = $('.input-name')
const $inputUrl = $('.input-url')
const $titleName = $('.title-name')
const $titleUrl = $('.title-url')

const addButton = document.querySelector('.addButton')
const favDialog = document.querySelector('#favDialog')

// const editButtonOne = document.querySelectorAll('.editButton')
const favDialogEdit = document.querySelector('#favDialog-edit')
const $favDialogEdit = $('#favDialog-edit')

const cancel = document.querySelector('#cancel')
const cancelEdit = document.querySelector('#cancel-edit')

const $inputNameEdit = $('#title-field-edit')
const $inputUrlEdit = $('#url-field-edit')
const $doneEdit = $('#done-edit')

const $done = $('#done')
const $deleteEdit = $('#delete-edit')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
var hashMap = [{
        name: 'stackoverflow',
        url: 'https://stackoverflow.com'
    },
    {
        name: 'github',
        url: 'https://github.com'
    },
    {
        name: '新浪微博',
        url: 'https://weibo.com'
    },
    {
        name: '豆瓣',
        url: 'https://www.douban.com'
    }
]

const $itemBox = $('.itemBox')
const $lastLi = $('.addItem')

/**
 * 首次登陆渲染页面
 */

reload('async')


/**
 * 弹窗动效
 */
//输入框focus效果
$inputName.focus(() => {
    $titleName.addClass('focused')
})

$inputName.blur(() => {
    $titleName.removeClass('focused')
})

$inputUrl.focus(() => {
    $titleUrl.addClass('focused')
})

$inputUrl.blur(() => {
    $titleUrl.removeClass('focused')
})

$inputNameEdit.focus(() => {
    $titleName.addClass('focused')
})

$inputNameEdit.blur(() => {
    $titleName.removeClass('focused')
})

$inputUrlEdit.focus(() => {
    $titleUrl.addClass('focused')
})

$inputUrlEdit.blur(() => {
    $titleUrl.removeClass('focused')
})

//点击添加按钮出现dialog
addButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        alert("The dialog API is not supported by this browser");
    };
});


//创建弹窗：点击取消关闭窗口
cancel.addEventListener('click', (e) => {
    favDialog.close();
})

//编辑弹窗：点击取消关闭窗口
cancelEdit.addEventListener('click', (e) => {
    favDialogEdit.close();
})

//创建弹窗：点击完成动效
$inputUrl.keydown(() => {
    console.log('111')
    if ($inputUrl.val().length > 0) {
        $done.removeAttr('disabled')
    } else if ($inputUrl.val().length === 0) {
        $done.attr('disabled', 'disabled')
    }
})

//编辑弹窗：点击完成动效
$inputUrlEdit.keydown(() => {
    if ($inputUrlEdit.val().length > 0) {
        $doneEdit.removeAttr('disabled')
    } else if ($inputUrlEdit.val().length === 0) {
        $doneEdit.attr('disabled', 'disabled')
    }
})


//创建弹窗： 点击完成重新渲染节点
$done.on('click', () => {
    reload('create')
})

//编辑弹窗： 点击完成重新渲染节点
$doneEdit.on('click', (e) => {

    hashMap.splice(i, 1)
    asyncLocalStorage(true)
})

//编辑弹窗： 点击删除重新渲染
$deleteEdit.on('click', (e) => {
    console.log(e)
    console.log('删除:' + i)
    reload('remove', i)
    favDialogEdit.close();
})


/**
 *
 *  获取localstorage中的值
 */
function getLocalStorage() {
    if (x) {
        return xObject
    } else {
        return hashMap
    }
}

/**
 * 设置localstorage的值
 * @param {Boolean} positive true:  内存 -> 本地（localstorage）
 *                           false: 本地 -> 内存
 */

function asyncLocalStorage(positive) {
    if (positive) {
        const string = JSON.stringify(hashMap)
        window.localStorage.setItem('x', string)
    } else {
        hashMap = getLocalStorage()
    }
}

/**
 *  获取历史记录
 */
const getHistoryValue = (index) => {
    let content = hashMap[index]
    let url = content.url
    let name = content.name
    document.querySelector('#title-field-edit').value = name
    if (url.indexOf('http') !== 0 && url.length !== 0) {
        url = 'https://' + url
    }
    document.querySelector('#url-field-edit').value = url
}


/**
 * 重置
 * ---
 * @param {String} type   类型
 * @param {Number} index  索引
 * ---
 */

let i = null

function reload(type, index) {
    if (type === 'async') {
        asyncLocalStorage(false)
    }
    if (type === 'remove') {
        hashMap.splice(index, 1)
        asyncLocalStorage(true)
    }
    if (type === 'create') {
        let url = $inputUrl.val()
        let name = $inputName.val()
        if (url.indexOf('http') !== 0 && url.length !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            name: name,
            url: url
        })
        asyncLocalStorage(true)
    }
    if (type === 'edit') {
        let url = $inputUrlEdit.val()
        let name = $inputNameEdit.val()
        if (url.indexOf('http') !== 0 && url.length !== 0) {
            url = 'https://' + url
        }
        hashMap.splice(index, 1)
        console.log(hashMap.splice(index, 1));
        hashMap.splice(index, 0, {
            name: name,
            url: url
        })
        console.log(hashMap);
        asyncLocalStorage(true)
    }
    createLi()
}

/**
 *
 * 创建节点
 */

function createLi() {
    $itemBox.find('.item').remove()
    hashMap.forEach((node, index) => {

        const $li = $(`
                <div class="itemContainer item" draggable="true" >
                    <div class="itemLinkBox">
                        <div class="itemWrapper">
                            <div class="itemLogo">
                                <svg class="icon">
                                    <use xlink:href="#icon-valentine_-cupid-love-heart-god"></use>
                                </svg>
                            </div>
                            <div class="itemTitle">${node.name}</div>
                        </div>
                    </div>
                    <button class="editButton" id="${index}"  type="button"">
                        <svg class="icon">
                            <use xlink:href="#icon-point"></use>
                        </svg>
                    </button>
                </div>
        `).insertBefore($lastLi)

        //item点击动效
        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.editButton', (e) => {
            console.log(e)
            e.stopPropagation() // 阻止冒泡
            $favDialogEdit[0].showModal()
            console.log(index);
            console.log('clicked div:' + index);
            getHistoryValue(index)
            i = index
        })

    })


}