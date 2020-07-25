// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
/**
 * 搜索框动效
 */
var $searchButton = $('.searchForm>button');
$('.searchForm>input').on({
  click: function click() {
    $searchButton.css('opacity', '1');
  },
  mouseout: function mouseout() {
    $searchButton.css('opacity', '0');
  }
});
/**
 * 弹窗参数
 *
 */

var $inputName = $('.input-name');
var $inputUrl = $('.input-url');
var $titleName = $('.title-name');
var $titleUrl = $('.title-url');
var addButton = document.querySelector('.addButton');
var favDialog = document.querySelector('#favDialog'); // const editButtonOne = document.querySelectorAll('.editButton')

var favDialogEdit = document.querySelector('#favDialog-edit');
var $favDialogEdit = $('#favDialog-edit');
var cancel = document.querySelector('#cancel');
var cancelEdit = document.querySelector('#cancel-edit');
var $inputNameEdit = $('#title-field-edit');
var $inputUrlEdit = $('#url-field-edit');
var $doneEdit = $('#done-edit');
var $done = $('#done');
var $deleteEdit = $('#delete-edit');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = [{
  name: 'stackoverflow',
  url: 'https://stackoverflow.com'
}, {
  name: 'github',
  url: 'https://github.com'
}, {
  name: '新浪微博',
  url: 'https://weibo.com'
}, {
  name: '豆瓣',
  url: 'https://www.douban.com'
}];
var $itemBox = $('.itemBox');
var $lastLi = $('.addItem');
/**
 * 首次登陆渲染页面
 */

reload('async');
/**
 * 弹窗动效
 */
//输入框focus效果

$inputName.focus(function () {
  $titleName.addClass('focused');
});
$inputName.blur(function () {
  $titleName.removeClass('focused');
});
$inputUrl.focus(function () {
  $titleUrl.addClass('focused');
});
$inputUrl.blur(function () {
  $titleUrl.removeClass('focused');
});
$inputNameEdit.focus(function () {
  $titleName.addClass('focused');
});
$inputNameEdit.blur(function () {
  $titleName.removeClass('focused');
});
$inputUrlEdit.focus(function () {
  $titleUrl.addClass('focused');
});
$inputUrlEdit.blur(function () {
  $titleUrl.removeClass('focused');
}); //点击添加按钮出现dialog

addButton.addEventListener('click', function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    alert("The dialog API is not supported by this browser");
  }

  ;
}); //创建弹窗：点击取消关闭窗口

cancel.addEventListener('click', function (e) {
  favDialog.close();
}); //编辑弹窗：点击取消关闭窗口

cancelEdit.addEventListener('click', function (e) {
  favDialogEdit.close();
}); //创建弹窗：点击完成动效

$inputUrl.change(function () {
  if ($inputUrl.val().length > 0) {
    $done.removeAttr('disabled');
  } else if ($inputUrl.val().length === 0) {
    $done.attr('disabled', 'disabled');
  }
}); //编辑弹窗：点击完成动效

$inputUrlEdit.change(function () {
  if ($inputUrlEdit.val().length > 0) {
    $doneEdit.removeAttr('disabled');
  } else if ($inputUrlEdit.val().length === 0) {
    $doneEdit.attr('disabled', 'disabled');
  }
}); //创建弹窗： 点击完成重新渲染节点

$done.on('click', function () {
  reload('create');
}); //编辑弹窗： 点击完成重新渲染节点

$doneEdit.on('click', function (e) {
  hashMap.splice(i, 1);
  asyncLocalStorage(true);
}); //编辑弹窗： 点击删除重新渲染

$deleteEdit.on('click', function (e) {
  console.log(e);
  console.log('删除:' + i);
  reload('remove', i);
  favDialogEdit.close();
});
/**
 *
 *  获取localstorage中的值
 */

function getLocalStorage() {
  if (x) {
    return xObject;
  } else {
    return hashMap;
  }
}
/**
 * 设置localstorage的值
 * @param {Boolean} positive true:  内存 -> 本地（localstorage）
 *                           false: 本地 -> 内存
 */


function asyncLocalStorage(positive) {
  if (positive) {
    var string = JSON.stringify(hashMap);
    window.localStorage.setItem('x', string);
  } else {
    hashMap = getLocalStorage();
  }
}
/**
 *  获取历史记录
 */


var getHistoryValue = function getHistoryValue(index) {
  var content = hashMap[index];
  var url = content.url;
  var name = content.name;
  document.querySelector('#title-field-edit').value = name;

  if (url.indexOf('http') !== 0 && url.length !== 0) {
    url = 'https://' + url;
  }

  document.querySelector('#url-field-edit').value = url;
};
/**
 * 重置
 * ---
 * @param {String} type   类型
 * @param {Number} index  索引
 * ---
 */


var i = null;

function reload(type, index) {
  if (type === 'async') {
    asyncLocalStorage(false);
  }

  if (type === 'remove') {
    hashMap.splice(index, 1);
    asyncLocalStorage(true);
  }

  if (type === 'create') {
    var url = $inputUrl.val();
    var name = $inputName.val();

    if (url.indexOf('http') !== 0 && url.length !== 0) {
      url = 'https://' + url;
    }

    hashMap.push({
      name: name,
      url: url
    });
    asyncLocalStorage(true);
  }

  if (type === 'edit') {
    var _url = $inputUrlEdit.val();

    var _name = $inputNameEdit.val();

    if (_url.indexOf('http') !== 0 && _url.length !== 0) {
      _url = 'https://' + _url;
    }

    hashMap.splice(index, 1);
    console.log(hashMap.splice(index, 1));
    hashMap.splice(index, 0, {
      name: _name,
      url: _url
    });
    console.log(hashMap);
    asyncLocalStorage(true);
  }

  createLi();
}
/**
 *
 * 创建节点
 */


function createLi() {
  $itemBox.find('.item').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n                <div class=\"itemContainer item\" draggable=\"true\" >\n                    <div class=\"itemLinkBox\">\n                        <div class=\"itemWrapper\">\n                            <div class=\"itemLogo\">\n                                <svg class=\"icon\">\n                                    <use xlink:href=\"#icon-valentine_-cupid-love-heart-god\"></use>\n                                </svg>\n                            </div>\n                            <div class=\"itemTitle\">".concat(node.name, "</div>\n                        </div>\n                    </div>\n                    <button class=\"editButton\" id=\"").concat(index, "\"  type=\"button\"\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-point\"></use>\n                        </svg>\n                    </button>\n                </div>\n        ")).insertBefore($lastLi); //item点击动效

    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.editButton', function (e) {
      console.log(e);
      e.stopPropagation(); // 阻止冒泡

      $favDialogEdit[0].showModal();
      console.log(index);
      console.log('clicked div:' + index);
      getHistoryValue(index);
      i = index;
    });
  });
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1e8b960d.js.map