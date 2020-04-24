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
//搜索框
var $searchButton = $('.searchForm>button');
$('.searchForm>input').on({
  click: function click() {
    $searchButton.css('opacity', '1');
  },
  mouseout: function mouseout() {
    $searchButton.css('opacity', '0');
  }
}); //增加节点
//输入框focus效果

var $inputName = $('.input-name');
var $inputUrl = $('.input-url');
var $titleName = $('.title-name');
var $titleUrl = $('.title-url');
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
}); //添加快捷方式

var addButton = document.querySelector('.addButton');
var favDialog = document.querySelector('#favDialog');
addButton.addEventListener('click', function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    alert("The dialog API is not supported by this browser");
  }

  ;
}); //取消

var cancel = document.querySelector('#cancel');
cancel.addEventListener('click', function (e) {
  favDialog.close();
}); //完成动效

var $done = $('#done');
$inputUrl.change(function () {
  if ($inputUrl.val().length > 0) {
    $done.removeAttr('disabled');
  } else if ($inputUrl.val().length === 0) {
    $done.attr('disabled', 'disabled');
  }
}); //点击完成

$done.on('click', function () {
  render();
}); //添加子节点

var $itemBox = $('.itemBox');
var $lastLi = $('.addItem');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var pic = [];
var hashMap = xObject || [{
  name: 'acfun',
  url: 'https://www.acfun.cn'
}, {
  name: 'BiliBili',
  url: 'https://www.bilibili.com'
}];
var $titleFieldEdit = $('#title-field-edit');
var $urlFieldEdit = $('#url-field-edit');

var render = function render() {
  $itemBox.find('.item').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n                <div  class=\"itemContainer item\" draggable=\"true\" >\n                    <div class=\"itemLinkBox\">\n                        <div class=\"itemWrapper\">\n                            <div class=\"itemLogo\">\n                                <svg class=\"icon\">\n                                    <use xlink:href=\"#icon-Addto\"></use>\n                                </svg>\n                            </div>\n                            <div class=\"itemTitle\">".concat(node.name, "</div>\n                        </div>\n                    </div>\n                    <button class=\"editButton\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-point\"></use>\n                        </svg>\n                    </button>\n                </div>\n        ")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.editButton', function (e) {
      e.stopPropagation(); // 阻止冒泡
    });
    $titleFieldEdit.val() === node.name;
    console.log($titleFieldEdit.val());
    $urlFieldEdit.val() === node.url;
  }); //取消

  var cancelEdit = document.querySelector('#cancel-edit');
  cancelEdit.addEventListener('click', function (e) {
    favDialogEdit.close();
  }); //打开编辑dialog

  var editButton = document.querySelectorAll('.editButton');
  var favDialogEdit = document.querySelector('#favDialog-edit');
  var itemBox = document.querySelector('.itemBox');
  var deleteEdit = document.querySelector('#delete-edit');
  editButton.forEach(function (item, index) {
    item.addEventListener('click', function onOpen() {
      console.log('第一次' + index);

      if (typeof favDialogEdit.showModal === "function") {
        favDialogEdit.showModal();
      } else {
        alert("The dialog API is not supported by this browser");
      } //删除节点


      deleteEdit.addEventListener('click', function () {
        console.log('第二次' + index);
        console.log(hashMap);
        var a = itemBox.removeChild(itemBox.children[index]);
        console.log(a);
        var b = a.querySelector('.itemTitle');
        console.log(b);
        console.log(b.innerHTML);

        for (var i = 0; i < hashMap.length; i++) {
          if (b.innerHTML === hashMap[i].name) {
            hashMap.splice(i, 1);
            break;
          }
        } // hashMap.forEach(node=>{
        //     if (b.innerHTML ===node.name){
        //         hashMap.splice(index,1)
        //
        //     };
        //
        // })
        // hashMap.splice(index, 1)


        console.log(hashMap);
        render();
        favDialogEdit.close();
      });
      var titleFieldEdit = document.querySelector('#title-field-edit');
      var urlFieldEdit = document.querySelector('#url-field-edit');
      var titleEdit = item.querySelector('.itemTitle');
      var urlEdit = item.querySelector('.itemTitle');
      titleFieldEdit.value === titleEdit.innerHTML;
    });
  });
};

render();
$done.on('click', function () {
  var url = $inputUrl.val();
  var name = $inputName.val();

  if (url.indexOf('http') !== 0 && url.length !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    name: name,
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
}; //默认名称和地址
//完成


var $inputUrlEdit = $('#url-field-edit');
var $doneEdit = $('#done-edit');
$inputUrlEdit.change(function () {
  if ($inputUrlEdit.val().length > 0) {
    $doneEdit.removeAttr('disabled');
  } else if ($inputUrlEdit.val().length === 0) {
    $doneEdit.attr('disabled', 'disabled');
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.f3fc7626.js.map