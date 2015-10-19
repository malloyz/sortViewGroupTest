/**
 * Created by malloyzhu on 2015/7/23.
 */

var UIHelper = {
    /**
     * 排序多个 view 的位置
     * @param views ：view 列表
     * @param viewHorizontalSpacing ：两个 view 之间的水平间距
     */
    sortViewsPosition: function (views, viewHorizontalSpacing, midX, sortDirection) {
        if (!Util.isArray(views)) {
            return;
        }

        sortDirection = sortDirection || SortDirection.left;

        var firstIndex = (sortDirection == SortDirection.left ? 0 : views.length - 1);
        if (1 == views.length) {
            return;
        }

        var parent = views[0].getParent();
        if (null == parent) {
            console.log("parent is null");
            return;
        }

        for (var i = 1; i < views.length; i++) {
            if (views[i].getParent() !== parent) {
                console.log("parent not same");
                return;
            }
        }

        viewHorizontalSpacing = viewHorizontalSpacing || 0;

        var nextPositionX = 0;
        nextPositionX = _updateNextPositionX(views[firstIndex], nextPositionX, sortDirection);

        var viewsCount = views.length;
        if (SortDirection.left == sortDirection) {
            for (var i = 1; i < viewsCount; i++) {
                _setViewPosition(views[i], nextPositionX, sortDirection);
                nextPositionX = _updateNextPositionX(views[i], nextPositionX, sortDirection);
            }
        } else if (SortDirection.right == sortDirection) {
            for (var i = viewsCount - 2; i >= 0; i--) {
                _setViewPosition(views[i], nextPositionX, sortDirection);
                nextPositionX = _updateNextPositionX(views[i], nextPositionX, sortDirection);
            }
        }

        if (null != midX) {
            var totalWidth = 0;
            for (var i in views) {
                totalWidth += (views[i].getContentSize().width + viewHorizontalSpacing);
            }
            totalWidth -= viewHorizontalSpacing;

            var firstView = views[0];
            var firstViewWorldPoint = firstView.getParent().convertToWorldSpace(firstView.getPosition());
            var firstViewLeftPositionX = firstViewWorldPoint.x - (firstView.getContentSize().width * firstView.getAnchorPoint().x);
            var offsetX = midX - (firstViewLeftPositionX + totalWidth / 2);
            for (var i in views) {
                views[i].setPositionX(views[i].getPositionX() + offsetX);
            }
        }

        function _updateNextPositionX(view, nextPositionX, sortDirection) {
            var viewPosition = view.getPosition();
            var viewContentSize = view.getContentSize();
            var viewAnchorPoint = view.getAnchorPoint();
            if (SortDirection.left == sortDirection) {
                nextPositionX = viewPosition.x + viewContentSize.width * (1 - viewAnchorPoint.x) + viewHorizontalSpacing;
            } else if (SortDirection.right == sortDirection) {
                nextPositionX = viewPosition.x - (viewContentSize.width * viewAnchorPoint.x) - viewHorizontalSpacing;
            }
            return nextPositionX;
        }

        function _setViewPosition(view, nextPositionX, sortDirection) {
            var viewContentSize = view.getContentSize();
            var viewAnchorPoint = view.getAnchorPoint();
            var positionX = 0;
            if (SortDirection.left == sortDirection) {
                positionX = nextPositionX + viewContentSize.width * viewAnchorPoint.x;
            } else if (SortDirection.right == sortDirection) {
                positionX = nextPositionX - viewContentSize.width * (1 - viewAnchorPoint.x);
            }
            view.setPositionX(positionX);
        }
    },

    ignoreUITextContentAdaptWithSize: function (object) {
        if (this.isUITextObject(object) || this.isUITextFieldObject(object)) {
            object.ignoreContentAdaptWithSize(true);
        }
    },

    loadUI: function (filePath) {
        var rootJson = ccs.load(filePath);
        var rootNode = rootJson.node;
        return rootNode;
    },

    isNodeObject: function (object) {
        return (object instanceof cc.Node);
    },

    isUISliderObject: function (object) {
        return (object instanceof ccui.Slider);
    },

    isWidgetObject: function (object) {
        return (object instanceof ccui.Widget);
    },

    isUITextObject: function (object) {
        return (object instanceof ccui.Text);
    },

    isUITextFieldObject: function (object) {
        return (object instanceof ccui.TextField);
    },

    isUIButtonObject: function (object) {
        return (object instanceof ccui.Button);
    },

    isUIPanelObject: function (object) {
        return (object instanceof ccui.Layout);
    },

    isUIListViewObject: function (object) {
        return (object instanceof ccui.ListView);
    },

    isUIPageViewObject: function (object) {
        return (object instanceof ccui.PageView);
    },

    isUIScrollViewObject: function (object) {
        return (object instanceof ccui.ScrollView);
    },

    /**
     * 绑定 UI 控件
     * @param object：被绑定的对象
     * @param uiFilePath：ui 文件路径
     *
     * eg：ui 文件中的所有控件都绑定到 object 中，命名规则为 下划线 + 控件名字（控件名以下划线开头的才会被绑定到 object 上）
     * 如 ui 中有个名字为 _backBtn 的按钮，则通过 object._backBtn 可得到对应名字的对象
     * 注册事件：只需要在 object 中定义函数名，事件函数名命名规则为 下划线 + 控件名字 + Touched
     * 如有个名字为 _backBtn 的按钮要注册事件，如果在 object 中定义了 _onBackBtnTouched，
     * 则会将事件函数绑定到 _backBtn 上，如没有则不会绑定，绑定事件的控件有
     * Button, ListView, PageView, ScrollView 4种类型的控件，代码详见 bindUIWidgetTouchListener
     */
    bindUIWidget: function (object, uiFilePath) {
        var uiRoot = this.loadUI(uiFilePath);
        this.bindUIWidgetToObject(object, uiRoot);
        return uiRoot;
    },

    /**
     * 绑定 UI 控件
     * @param object：被绑定的对象
     * @param uiRoot：ui 根
     */
    bindUIWidgetToObject: function (object, uiRoot) {
        if (!Util.isObject(object)) {
            console.log("object is not object type");
            return;
        }

        if (!this.isNodeObject(uiRoot)) {
            console.log("uiRoot is not node type");
            return;
        }

        var uiWidgetChildren = uiRoot.getChildren();
        for (var i = 0; i < uiWidgetChildren.length; i++) {
            var uiWidget = uiWidgetChildren[i];
            this._ignoreContentSize(uiWidget);
            this._handleUIWidget(object, uiWidget);
            this._handleSortViewGroup(object, uiWidget);
            this.bindUIWidgetToObject(object, uiWidget);
        }
    },

    _handleUIWidget: function (object, uiWidget) {
        var uiWidgetName = uiWidget.getName();
        //只绑定命名以下划线开头的控件
        if (Util.startsWithString(uiWidgetName, '_')) {
            object[uiWidgetName] = uiWidget;
            this.bindUIWidgetTouchListener(object, uiWidget);
        }
    },

    _handleSortViewGroup: function (object, uiWidget) {
        var uiWidgetName = uiWidget.getName();
        if (Util.endsWithString(uiWidgetName, '_')) {
            uiWidget.setBackGroundColorType(ccui.Layout.BG_COLOR_NONE);
            uiWidget.setTouchEnabled(false);

            var uiWidgets = uiWidget.getChildren();
            var sortViews = [];
            for (var i in uiWidgets) {
                sortViews.push(uiWidgets[i]);
            }

            sortViews.sort(function (a, b) {
                return (a.getPositionX() - b.getPositionX());
            });

            var sortViewGroup = new SortViewGroup();
            for (var j = 0; j < sortViews.length; j++) {
                var sortView = sortViews[j];
                sortViewGroup.addView(sortView);
            }
            var memberName = '_' + uiWidgetName.substring(0, uiWidgetName.length - 1);
            object[memberName] = sortViewGroup;

            if (object._sortViewGroupList == null) {
                object._sortViewGroupList = [];
            }
            object._sortViewGroupList.push(sortViewGroup);

            if (object.sortViewGroups == null) {
                object.sortViewGroups = function () {
                    for (var i in object._sortViewGroupList) {
                        object._sortViewGroupList[i].sort();
                    }
                }
            }
        }
    },

    _ignoreContentSize: function (uiWidget) {
        if (this.isUITextObject(uiWidget)) {
            uiWidget.ignoreContentAdaptWithSize(true);
            var originalStr = uiWidget.getString();
            uiWidget.setString("");
            uiWidget.setString(originalStr);
        }
    },

    bindUIWidgetTouchListener: function (object, uiWidget) {
        if (!Util.isObject(object)) {
            console.log("object is not object type");
            return;
        }

        if (!this.isWidgetObject(uiWidget)) {
            console.log("uiWidget is not widget type");
            return;
        }

        var uiWidgetName = uiWidget.getName();
        if (!Util.startsWithString(uiWidgetName, '_')) {
            return;
        }

        //删除下划线
        uiWidgetName = uiWidgetName.substring(1);
        //将首字母转换为大写
        uiWidgetName = Util.upperFirstLetter(uiWidgetName);

        var touchListenerName = "_on" + uiWidgetName + "Touched";
        if (typeof object[touchListenerName] !== 'function') {
            return;
        }

        if (this.isUIButtonObject(uiWidget)) {
            uiWidget.addTouchEventListener(object[touchListenerName], object);
            return;
        }

        if (this.isUIListViewObject(uiWidget)) {
            uiWidget.addEventListener(object[touchListenerName], object);
            return;
        }

        if (this.isUIPanelObject(uiWidget)) {
            uiWidget.addTouchEventListener(object[touchListenerName], object);
            return;
        }

        if (this.isUIPageViewObject(uiWidget)) {
            uiWidget.addEventListener(object[touchListenerName], object);
            return;
        }

        if (this.isUIScrollViewObject(uiWidget)) {
            uiWidget.addEventListener(object[touchListenerName], object);
            return;
        }

        if (this.isUISliderObject(uiWidget)) {
            uiWidget.addEventListener(object[touchListenerName], object);
            return;
        }
    }
};
