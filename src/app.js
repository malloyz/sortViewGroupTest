var HelloWorldLayer = cc.Layer.extend({
    _explainTextZhText: null,
    _explainTextEnText: "explain:",
    _explainTextOriginalPosition: null,

    _contentTextZhText: null,
    _contentTextEnText: "This is a simple demo!",
    _contentTextOriginalPosition: null,

    _firstViewTextZhText: null,
    _firstViewTextEnText: "This is first view",
    _firstViewTextOriginalPosition: null,

    _secondViewTextZhText: null,
    _secondViewTextEnText: "This is second view",
    _secondViewTextOriginalPosition: null,

    _thirdViewTextZhText: null,
    _thirdViewTextEnText: "This is third view",
    _thirdViewTextOriginalPosition: null,

    _firstGroupView1TextZhText: null,
    _firstGroupView1TextEnText: "First group view1",
    _firstGroupView1TextOriginalPosition: null,

    _firstGroupView2TextZhText: null,
    _firstGroupView2TextEnText: "First group view2",
    _firstGroupView2TextOriginalPosition: null,

    _secondGroupView1TextZhText: null,
    _secondGroupView1TextEnText: "Second group view1",
    _secondGroupView1TextOriginalPosition: null,

    _secondGroupView2TextZhText: null,
    _secondGroupView2TextEnText: "Second group view2",
    _secondGroupView2TextOriginalPosition: null,

    ctor: function () {
        this._super();
        var rootNode = UIHelper.bindUIWidget(this, res.sortViewUI);
        this.addChild(rootNode);

        this._initData();
    },

    _initData: function () {
        this._explainTextZhText = this._explainText.getString();
        this._explainTextOriginalPosition = this._explainText.getPosition();

        this._contentTextZhText = this._contentText.getString();
        this._contentTextOriginalPosition = this._contentText.getPosition();

        this._firstViewTextZhText = this._firstViewText.getString();
        this._firstViewTextOriginalPosition = this._firstViewText.getPosition();

        this._secondViewTextZhText = this._secondViewText.getString();
        this._secondViewTextOriginalPosition = this._secondViewText.getPosition();

        this._thirdViewTextZhText = this._thirdViewText.getString();
        this._thirdViewTextOriginalPosition = this._thirdViewText.getPosition();

        this._firstGroupView1TextZhText = this._firstGroupView1Text.getString();
        this._firstGroupView1TextOriginalPosition = this._firstGroupView1Text.getPosition();

        this._firstGroupView2TextZhText = this._firstGroupView2Text.getString();
        this._firstGroupView2TextOriginalPosition = this._firstGroupView2Text.getPosition();

        this._secondGroupView1TextZhText = this._secondGroupView1Text.getString();
        this._secondGroupView1TextOriginalPosition = this._secondGroupView1Text.getPosition();

        this._secondGroupView2TextZhText = this._secondGroupView2Text.getString();
        this._secondGroupView2TextOriginalPosition = this._secondGroupView2Text.getPosition();

        var midX = cc.winSize.width / 2;
        this._centerModelSortViewGroup.setMidX(midX);
    },

    _updateFirstSecondSortViewGroupDistance: function () {
        var firstGroupSortViewGroupsRightX = this._firstGroupSortViewGroups.getRightX();
        this._secondGroupSortViewGroups.setX(firstGroupSortViewGroupsRightX + 20);
    },

    _toggleToZhText: function () {
        this._explainText.setString(this._explainTextZhText);
        this._contentText.setString(this._contentTextZhText);
        this._firstViewText.setString(this._firstViewTextZhText);
        this._secondViewText.setString(this._secondViewTextZhText);
        this._thirdViewText.setString(this._thirdViewTextZhText);
        this._firstGroupView1Text.setString(this._firstGroupView1TextZhText);
        this._firstGroupView2Text.setString(this._firstGroupView2TextZhText);
        this._secondGroupView1Text.setString(this._secondGroupView1TextZhText);
        this._secondGroupView2Text.setString(this._secondGroupView2TextZhText);
    },

    _toggleToEnText: function () {
        this._explainText.setString(this._explainTextEnText);
        this._contentText.setString(this._contentTextEnText);
        this._firstViewText.setString(this._firstViewTextEnText);
        this._secondViewText.setString(this._secondViewTextEnText);
        this._thirdViewText.setString(this._thirdViewTextEnText);
        this._firstGroupView1Text.setString(this._firstGroupView1TextEnText);
        this._firstGroupView2Text.setString(this._firstGroupView2TextEnText);
        this._secondGroupView1Text.setString(this._secondGroupView1TextEnText);
        this._secondGroupView2Text.setString(this._secondGroupView2TextEnText);
    },

    /**
     * ÷–Œƒ£®≈≈–Ú«–ªª£©
     * @param sender
     * @param type
     * @private
     */
    _onZhSortButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            console.log("_onZhSortButtonTouched");
            this._toggleToZhText();
            this.sortViewGroups();
            this._updateFirstSecondSortViewGroupDistance();
        }
    },

    /**
     * ”¢Œƒ£®≈≈–Ú«–ªª£©
     * @param sender
     * @param type
     * @private
     */
    _onEnSortButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            console.log("_onEnSortButtonTouched");
            this._toggleToEnText();
            this.sortViewGroups();
            this._updateFirstSecondSortViewGroupDistance();
        }
    },

    /**
     * ÷–Œƒ£®≤ª≈≈–Ú«–ªª£©
     * @param sender
     * @param type
     * @private
     */
    _onZhUnSortButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            console.log("_onZhUnSortButtonTouched");
            this._toggleToZhText();
        }
    },

    /**
     * ”¢Œƒ£®≤ª≈≈–Ú«–ªª£©
     * @param sender
     * @param type
     * @private
     */
    _onEnUnSortButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            console.log("_onEnUnSortButtonTouched");
            this._toggleToEnText();
        }
    },

    /**
     * ª÷∏¥≥ı º◊¥Ã¨
     * @param sender
     * @param type
     * @private
     */
    _onDefaultButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            console.log("_onDefaultButtonTouched");
            this._toggleToZhText();
            this._resetPosition();
        }
    },

    _resetPosition: function () {
        this._explainText.setPosition(this._explainTextOriginalPosition);
        this._contentText.setPosition(this._contentTextOriginalPosition);
        this._firstViewText.setPosition(this._firstViewTextOriginalPosition);
        this._secondViewText.setPosition(this._secondViewTextOriginalPosition);
        this._thirdViewText.setPosition(this._thirdViewTextOriginalPosition);
        this._firstGroupView1Text.setPosition(this._firstGroupView1TextOriginalPosition);
        this._firstGroupView2Text.setPosition(this._firstGroupView2TextOriginalPosition);
        this._secondGroupView1Text.setPosition(this._secondGroupView1TextOriginalPosition);
        this._secondGroupView2Text.setPosition(this._secondGroupView2TextOriginalPosition);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

