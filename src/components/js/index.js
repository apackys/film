import Vue from 'vue'
import MessageBox from './MessageBox'

export var messagebox = (function(){
    return function(opts){//配置参数
        var defaults ={
            title : '',
            content : '',
            cancel : '',
            ok : '',
            handleCancel : null,
            handleOk : null
        };
        var boxComponent = Vue.extend(MessageBox);

        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
        var vm = new boxComponent({
            el:document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                    //弹窗消失
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });
        document.body.appendChild( vm.$el );
        //弹窗弹出
    }
})();