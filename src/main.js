//搜索框
const $searchButton = $('.searchForm>button')
$('.searchForm>input').on({
    click: () => {
        $searchButton.css('opacity', '1')
    },
    mouseout: () => {
        $searchButton.css('opacity', '0')
    }
})


//增加节点
//输入框focus效果
const $inputName = $('.input-name')
const $inputUrl = $('.input-url')
const $titleName = $('.title-name')
const $titleUrl = $('.title-url')

$inputName.focus(() =>{
    $titleName.addClass('focused')
})

$inputName.blur(() =>{
    $titleName.removeClass('focused')
})

$inputUrl.focus(() =>{
    $titleUrl.addClass('focused')
})

$inputUrl.blur(() =>{
    $titleUrl.removeClass('focused')
})


//添加快捷方式
const addButton = document.querySelector('.addButton')
const favDialog = document.querySelector('#favDialog')

addButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        alert("The dialog API is not supported by this browser");
    };
});

//取消
const cancel = document.querySelector('#cancel')
cancel.addEventListener('click',(e)=>{
    favDialog.close();
})

//完成动效
const $done = $('#done')
$inputUrl.change(()=>{
    if ($inputUrl.val().length > 0 ){
        $done.removeAttr('disabled')
    }else if ($inputUrl.val().length === 0){
        $done.attr('disabled','disabled')
    }
})
//点击完成
$done.on('click',()=>{
    render()
})

//添加子节点

const $itemBox = $('.itemBox')
const $lastLi = $('.addItem')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const pic = []
const hashMap = xObject || [
    {name: 'acfun', url: 'https://www.acfun.cn'},
    {name: 'BiliBili', url: 'https://www.bilibili.com'}
]
const $titleFieldEdit = $('#title-field-edit')
const $urlFieldEdit = $('#url-field-edit')
const render = () => {
    $itemBox.find('.item').remove()
    hashMap.forEach((node,index) => {
        const $li =  $(`
                <div  class="itemContainer item" draggable="true" >
                    <div class="itemLinkBox">
                        <div class="itemWrapper">
                            <div class="itemLogo">
                                <svg class="icon">
                                    <use xlink:href="#icon-Addto"></use>
                                </svg>
                            </div>
                            <div class="itemTitle">${node.name}</div>
                        </div>
                    </div>
                    <button class="editButton">
                        <svg class="icon">
                            <use xlink:href="#icon-point"></use>
                        </svg>
                    </button>
                </div>
        `).insertBefore($lastLi)

        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.editButton', (e) => {
            e.stopPropagation() // 阻止冒泡
        })
        $titleFieldEdit.val() === node.name;
        console.log($titleFieldEdit.val());
        $urlFieldEdit.val() === node.url

    })


    //取消
    const cancelEdit = document.querySelector('#cancel-edit')
    cancelEdit.addEventListener('click',(e)=>{
        favDialogEdit.close();
    })

    //打开编辑dialog
    const editButton = document.querySelectorAll('.editButton')
    const favDialogEdit = document.querySelector('#favDialog-edit')
    const itemBox = document.querySelector('.itemBox')
    const deleteEdit = document.querySelector('#delete-edit')
    editButton.forEach((item,index)=>{
        item.addEventListener('click', function onOpen() {
            console.log('第一次'+index);
            if (typeof favDialogEdit.showModal === "function") {
                favDialogEdit.showModal();
            } else {
                alert("The dialog API is not supported by this browser");
            }

            //删除节点
            deleteEdit.addEventListener('click',()=>{

                console.log('第二次'+index)
                console.log(hashMap);
                const a = itemBox.removeChild(itemBox.children[index])
                console.log(a);
                const b = a.querySelector('.itemTitle')
                console.log(b);
                console.log(b.innerHTML);
                for (let i = 0;i<hashMap.length;i++){
                    if (b.innerHTML ===hashMap[i].name){
                        hashMap.splice(i,1)
                        break
                    }
                }

                // hashMap.forEach(node=>{
                //     if (b.innerHTML ===node.name){
                //         hashMap.splice(index,1)
                //
                //     };
                //
                // })
                // hashMap.splice(index, 1)
                console.log(hashMap);
                render()
                favDialogEdit.close()

            })
            const titleFieldEdit = document.querySelector('#title-field-edit')
            const urlFieldEdit = document.querySelector('#url-field-edit')
            const titleEdit =  item.querySelector('.itemTitle')
            const urlEdit = item.querySelector('.itemTitle')
            titleFieldEdit.value === titleEdit.innerHTML

        })

    })
}

render()

$done.on('click', () => {
    let url = $inputUrl.val()
    let name = $inputName.val()
    if (url.indexOf('http') !== 0 && url.length!==0) {
        url = 'https://' + url
    }
    hashMap.push({
        name: name,
        url: url
    })
    render()
})


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}




//默认名称和地址

//完成
const $inputUrlEdit =$('#url-field-edit')
const $doneEdit = $('#done-edit')
$inputUrlEdit.change(()=>{
    if ($inputUrlEdit.val().length > 0 ){
        $doneEdit.removeAttr('disabled')
    }else if ($inputUrlEdit.val().length === 0){
        $doneEdit.attr('disabled','disabled')
    }
})








