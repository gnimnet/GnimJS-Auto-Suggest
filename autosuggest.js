/*
 *  This JavaScript file for Auto Suggest
 *  this component works for GnimJS
 *  Version 0.1.2
 *  Write by Ming
 *  Date 2012.03.10
 */
(function(window,$,NULL,undefined){
    var CLASS_AS='autosuggest';
    var CLASS_AS_I='autosuggest-item';
    var CLASS_AS_I_H='autosuggest-item-hover';
    var DEFAULT_LOAD_DOM='<div class="autosuggest-loading">正在加载...</div>';
    var $dom=$('<ul class="'+CLASS_AS+'"></ul>').css({display:'none'}).appendTo('body');
    var _input=NULL;
    var KEY_DOWN=40;
    var KEY_UP=38;
    var KEY_ENTER=13;
    function AutoSuggest(selector,funcData,loadingDom,funcGet,funcSet,funcVal){
        var self=this;
        self.d=funcData;
        self.l=loadingDom||DEFAULT_LOAD_DOM;
        self.g=funcGet||_funcGet;
        self.s=funcSet||_funcSet;
        self.v=funcVal||_funcVal;
        self.i=$(selector).focus(function(){
            _input=self.i;
            _innerDom();
        }).blur(function(){
            if(_input){
                _input=NULL;
                _innerDom();
            }
        }).keyup(function(e){
            e=window.event||e;
            var code=e.keyCode;
            if(code==KEY_UP){
                self.move(0);
            }else if(code==KEY_DOWN){
                self.move(1);
            }else if(code==KEY_ENTER){
                self.s(_input,self.v($dom.find('.'+CLASS_AS_I_H)));
                _innerDom();
            }else if ((code!=8 && code < 32) || (code >= 33 && code <= 46) || (code >= 112 && code <= 123)) {
            //ignore
            }else{
                var value=self.g(_input);
                if($.isFunc(self.d)){
                    _innerDom(self.d(value,self)?self.l:NULL);
                }else if($.isArr(self.d)){
                    _innerDom();
                    self.dom(_fliter(value,self.d));
                }
                return;
            }
        })[0];
    }
    AutoSuggest.prototype={
        dom:function(data){
            var self=this;
            if($.isArr(data) && !$.isStr(data)){
                $dom.empty();
                if(data.length>0){
                    for(var i=0;i<data.length;i++){
                        $('<li class="'+CLASS_AS_I+'">'+data[i]+'</li>').hover(function(){
                            $dom.find('.'+CLASS_AS_I).removeClass(CLASS_AS_I_H);
                            $(this).addClass(CLASS_AS_I_H);
                        },function(){
                            $(this).removeClass(CLASS_AS_I_H);
                        }).mousedown(function(){
                            self.s(_input,self.v($(this)));
                        }).appendTo($dom);
                    }
                    _fixshow();
                }else{
                    _innerDom();
                }
            }else{
                _innerDom(data);
            }
        },
        move:function(next){
            var $items=$dom.find('.'+CLASS_AS_I);
            var len=$items.length;
            var index=NULL;
            for(var i=0;i<len;i++){
                if($($items[i]).hasClass(CLASS_AS_I_H)){
                    index=i;
                    break;
                }
            }
            index=(index==NULL)?(next?0:len-1):(index+(next?1:-1));
            $items.removeClass(CLASS_AS_I_H);
            if(index>=0 && index<len){
                $($items[index]).addClass(CLASS_AS_I_H);
            }
        }
    };
    /* private static functions */
    function _funcGet(input){
        return input.value;
    }
    function _funcSet(input,value){
        if(value){
            input.value=value;
        }
    }
    function _funcVal($dom){
        return $dom.text();
    }
    function _fliter(key,data){
        var rtn=[];
        if(key=='')return rtn;
        for(var i=0;i<data.length;i++){
            if($.isStr(data[i]) && data[i].toLowerCase().indexOf(key.toLowerCase())>=0){
                rtn.push(data[i]);
            }
        }
        return rtn;
    }
    function _fixshow(){
        if(_input){
            var node=_input;
            var x=0,y=node.offsetHeight;
            while(node.offsetParent){
                x+=node.offsetLeft;
                y+=node.offsetTop;
                node=node.offsetParent;
            }
            $dom.css({
                left:x+'px',
                top:y+'px',
                display:'block'
            });
        }
    }
    function _innerDom(dom){
        if(dom){
            $dom.empty();
            $(dom).appendTo($dom);
            _fixshow();
        }else{
            $dom.css({
                display:'none'
            }).empty();
        }
    }
    /* set AutoSuggest to window */
    window.AutoSuggest=AutoSuggest;
})(window,Gnim,null);