/**
 * Created by hanmiao on 2017/3/11.
 */
;(function () {
   'use strict';

   $(function () {
       var $form_add_list=$('.add-list');
       var $delete_task;
       var task_list=[];
       init();
       //添加新task
       $form_add_list.on('submit',function (e) {
           e.preventDefault();
           var new_list={};
           var $input=$(this).find('input[name=content]');
           //获取新content值
           new_list.content=$input.val();
           //如果add-list-content为空，则直接返回，否则继续执行
           if(!new_list.content) return;
           //存入新的content
           add_list(new_list);
           $input.val('');
       })
        function add_list(new_list) {
            task_list.push(new_list); //将新的content推入task_list
            refresh_localstorage();
            return true;
        }
        /*刷新localstorage并更新模板*/
        function refresh_localstorage(){
            store.set('task_list',task_list);//更新task_list
            render_task_list();
        }
        //监听并查找需要删除的task
        function listen_delete_task() {
            $delete_task.on('click',function () {
                var $item = $(this).parent().parent();
                var index=$item.data('index');
                var tmp=confirm('确定删除？');
                tmp ? delete_task(index):null;
            })
        }
        //删除task
        function delete_task(index) {
            //如果没有index或者index不存在则直接返回
            if(index==undefined||!task_list[index]) return;
            delete task_list[index];
            refresh_localstorage();
        }
        function  init() {
            task_list=store.get('task_list')||[];
            if(task_list.length){
                render_task_list();
            }
        }
        //渲染所有task
        function render_task_list() {
           var  $task_list=$('.task-list');
           $task_list.html('');
           for (var i=0;i<task_list.length;i++){
              var $task=render_task_item(task_list[i],i);
               $task_list.append($task);
          }
          $delete_task=$('.action.delete');
            listen_delete_task();
        }
        //渲染单个task
        function render_task_item(data,index) {
            if(!data||!index) return;
            var list_item_tpl=
                '<div class="task-item" data-index="' + index + '">'+
                '<span><input type="checkbox"></span>'+
                '<span class="content">'+data.content+'</span>'+
                '<span class="fr">'+
                '<span class="action delete">删除</span>'+
                '<span class="action">详细</span>'+
                '</span>'+
                '</div>'
            return $(list_item_tpl);
        }
   })

})();
