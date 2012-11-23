/*
* jQuery Dice Plugin
*
* Copyright (c) 2010 itassist.info
*
*   http://www.itassist.info
*/
(function($) {
    $.fn.dice = function(options) {
		options = jQuery.extend(
			{
				dice1: "img/dice_1.png", // ダイスの１の目の画像
				dice2: "img/dice_2.png", // ダイスの2の目の画像
				dice3: "img/dice_3.png", // ダイスの3の目の画像
				dice4: "img/dice_4.png", // ダイスの4の目の画像
				dice5: "img/dice_5.png", // ダイスの5の目の画像
				dice6: "img/dice_6.png", // ダイスの6の目の画像
				maxdice: 6,  // ダイスの目の数
				onclick: true,  // クリックイベントをセットするかどうか
				//callback: // コールバック関数
				oneDuration: 10,  // 一回の変化の秒数
				duration: 500,	// ダイスが廻っている時間
				dataKey: "dice" // jQuery.dataのキー
			},
			options
		);
		
		
		
		$(this).bind("throwDice",function (event, datas, callback) {
			var diceWithDuration = datas['diceWithDuration'];
			var callback = datas['callback'];
			
			if (diceWithDuration == undefined) {
				diceWithDuration = options['duration'];
			}
			
			var target = $(this);
		
			var diceValue = Math.floor(Math.random() * 6) + 1;
			var throwingDice = true;
			
			$.timer(diceWithDuration, function (timer) {
				throwingDice = false;
				timer.stop();
				
			});
			
			var i=0;
			$.timer(options['oneDuration'], function(timer){
				i++;
				var tmpDice = i % options["maxdice"] +1;
				target.attr("src", options["dice" + tmpDice]);
				
				if(i>10000) {
					throwingDice = false;
				}
				
				if (throwingDice == false) {
					target.attr("src", options["dice" + diceValue]);
					timer.stop();
					// ターゲットにデータ保持
					jQuery.data(target.get(0), options['dataKey'], diceValue);
					if(callback != undefined)
						callback(diceValue);
				}
			});
		
		});
		
		if (options['onclick']) {
			// clickイベントセット
			$(this).bind("click", function(){
				$(this).triggerHandler("throwDice", {duration: options['duration'], callback: options['callback']});
				// $(this).triggerHandler("throwDice", {duration: options['duration'], callback: function (diceValue) {alert(diceValue);}});
			});
		}
	};
})(jQuery);