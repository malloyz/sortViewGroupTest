/**
 * Created by malloyzhu on 2015/10/9.
 */
var Boundary = {left: 1, right: 2};
var SortDirection = {left: 1, right: 2};

var SortViewGroup = cc.Class.extend({
    _viewList: null,
    _sortDirection: null,
    _viewHorizontalSpacing: null,
    _midX: null,

    ctor: function () {
        this._viewList = [];
        this._viewHorizontalSpacing = 0;
        this._sortDirection = SortDirection.left;
    },

    setSortDirection: function (sortDirection) {
        this._sortDirection = sortDirection;
    },

    getSortDirection: function () {
        return this._sortDirection;
    },

    setViewHorizontalSpacing: function (spacing) {
        this._viewHorizontalSpacing = spacing;
    },

    getViewHorizontalSpacing: function () {
        return this._viewHorizontalSpacing;
    },

    setMidX: function (x) {
        this._midX = x;
    },

    getMidX: function () {
        return this._midX;
    },

    addView: function (view) {
        if (!UIHelper.isWidgetObject(view)) {
            return;
        }
        this._viewList.push(view);
    },

    removeAllView: function () {
        this._viewList = [];
    },

    insertView: function (view, index) {
        if (!UIHelper.isWidgetObject(view)) {
            return;
        }
        this._viewList[index] = view;
    },

    sort: function () {
        UIHelper.sortViewsPosition(this._viewList, this._viewHorizontalSpacing, this._midX, this._sortDirection);
    },

    offsetX: function (offsetValue) {
        if (null == offsetValue) {
            return;
        }

        if (typeof(offsetValue) !== 'number') {
            console.log("offsetValue type error");
            return;
        }

        if (offsetValue == 0) {
            return;
        }

        for (var i in this._viewList) {
            var view = this._viewList[i];
            var currentPositionX = view.getPositionX();
            view.setPositionX(currentPositionX + offsetValue);
        }
    },

    setX: function (x) {
        if (null == x) {
            return;
        }

        if (typeof(x) !== 'number') {
            console.log("offsetValue type error");
            return;
        }

        var leftX = this.getLeftX();
        var offsetX = x - leftX;
        this.offsetX(offsetX);
    },

    getWidth : function () {
        var totalWidth = 0;
        for (var i in this._viewList) {
            totalWidth += (this._viewList[i].getContentSize().width + this._viewHorizontalSpacing);
        }
        totalWidth -= this._viewHorizontalSpacing;
        return totalWidth;
    },

    getLeftX: function () {
        var firstView = this._viewList[0];
        return this._getX(Boundary.left, firstView);
    },

    getRightX: function () {
        var lastView = this._viewList[this._viewList.length - 1];
        return this._getX(Boundary.right, lastView);
    },
    
    _getX: function (boundary, view) {
        if (null == view || null == view.getParent()) {
            return null;
        }

        var positionX = view.getParent().convertToWorldSpaceAR(view.getPosition()).x;
        var width = view.getContentSize().width;
        var anchorX = view.getAnchorPoint().x;

        switch (boundary) {
            case Boundary.left:
                return positionX - width * anchorX;
                break;

            case Boundary.right:
                return positionX + width * (1 - anchorX);
            break;
        }

        return null;
    }
})
