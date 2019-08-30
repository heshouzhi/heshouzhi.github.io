
var id = ''
function creatForm(data, list_data) {


  creat(data)

  creatList(list_data)





  // $('.add_line').click(function(){
  //
  // })
  $('#save_group_data').click(function() {
    $('#exampleModal').modal('hide')
    var type = $("#field_type").find("option:selected").val();
    var label = $("#field_name").val();
    var placeholder = $("#field_placeholder").val()
    var required = true
    var disabled = true

    var str = "";
    $("#exampleModal input[name='checkbox']:checked").each(function (index, item) {

        if ($("input[name='checkbox']:checked").length-1==index) {
            str += $(this).val();
        } else {
            str += $(this).val() + ",";
        }
    });

    if(str.indexOf('必填')>-1) {
      required = false
    }
    var one_input = {}
    one_input.id = 'a';
    one_input.type = type;
    one_input.label = label;
    one_input.placeholder = placeholder;
    one_input.required = required;
    one_input.disabled = disabled;
    for (var i = 0; i < data.length; i++) {
      if(data[i].id == id) {
        data[i].list.push(one_input)
      }
    }
    creat(data)
  })

  $('#myButton').click(function (){
    var obj = {
      id: 'new',
      title: 'C表单',
      list: []
    }
    data.push(obj)
    creat(data)
  })
}

function creat(data) {
  var node = $('#container_box')
  node.empty()
  for (var i = 0; i < data.length; i++) {
    var wrap_child = "<div class='box_style'><h5>"+data[i].title+"<span class='add_line add_line_style' data-id="+data[i].id+">添加字段</span></h5><hr/><div id="+data[i].id+"></div></div>"

    $("#container_box").append(wrap_child)
    appendForm(data[i])
  }

   function appendForm(data){
     var list = data.list
     var id = data.id
    for (var i = 0; i < list.length; i++) {
      var node = ''
      var red_point = ''
      if(list[i].required) {
        red_point = "<em style='color: red;'>*</em>"
      }
      if(list[i].type == 'text') {
        node = "<div class='form-group hover_here'><label for='inputEmail3' class='col-sm-2 control-label'>"+list[i].label+""+red_point+"</label><div class='col-sm-8'><input type="+list[i].type+" class='form-control' id="+list[i].id+" placeholder="+list[i].placeholder+"></div><div class='col-sm-2 control_wrap'><div class='display_none control'><span class='glyphicon glyphicon-pencil control_edit' aria-hidden='true'></span><span class='glyphicon glyphicon-trash control_delete' aria-hidden='true' data-id="+id+" data-thisid="+list[i].id+"></span></div></div></div></div>"
      } else if(list[i].type == 'select') {
        var select = JSON.stringify(list[i])
        node = "<div class='form-group hover_here'><label for='inputEmail3' class='col-sm-2 control-label'>"+list[i].label+""+red_point+"</label><div class='col-sm-8'><select class='form-control' id="+list[i].id+"></select></div><div class='col-sm-2 control_wrap'><div class='display_none control'><span class='glyphicon glyphicon-pencil control_edit' aria-hidden='true'></span><span class='glyphicon glyphicon-trash control_delete' aria-hidden='true' data-id="+id+" data-thisid="+list[i].id+"></span></div></div></div></div></div>"
      }

      $('#'+id).append(node)
    }

  }
  var option= [
    {id: 0,text: '男'},
    {id: 1,text: '女'}
  ]
  $('#sex').select2({
    data: option
  });
  $('#sex1').select2({
    data: option
  });

  $('.hover_here').hover(function(){

    var display = $(this).children('.control_wrap').children('.control').css('display')
    if(display == 'none') {
      $(this).children('.control_wrap').children('.control').css({ 'display': 'flex' })
    } else {
      $(this).children('.control_wrap').children('.control').css('display', 'none')
    }
  })

  $('.add_line').bind("click", addLine)
  $('.control_delete').bind("click", _delete(data))
  var put = []
  for (var j = 0; j < data.length; j++) {
    put.push(data[j].id)
  }
  sortTable(put)
}

function _delete(data) {
  return function (){
    var arr = []
    var id = $(this).data('id')
    var thisid = $(this).data('thisid')
    for (var i = 0; i < data.length; i++) {
      if(data[i].id == id) {
        var list = data[i].list
        for (var j = 0; j < list.length; j++) {
          if(list[j].id!=thisid) {

            arr.push(list[j])
          }

          data[i].list = arr
        }
      }
    }
    creat(data)

  }

}

function addLine() {
  id = $(this).data('id')
  var option= [
    {id: 'text',text: '单行文本'},
    {id: 'textarea',text: '多行文本'},
    {id: 'select',text: '多选'}
  ]
  $('#field_type').select2({
    data: option
  });
  var option= [
    {id: 0,text: '基本信息'},
    {id: 1,text: 'A组'},
    {id: 3,text: 'B组'}
  ]
  $('#field_group').select2({
    data: option
  });
  $('#exampleModal').modal()
}




function sortTable(put){
  for (var i = 0; i < put.length; i++) {
    var id = put[i]

    new Sortable(document.getElementById(id), {
      group: {
        name: id,
        put: put
      },
      animation: 100,
      onEnd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        evt.to;    // target list
        evt.from;  // previous list
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone // the clone element
        evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        alert('拖动结束了')
      },
    });
  }

}

function creatList(list) {
  var select_list = []
  $('#list_box').empty()
  for (var i = 0; i < list.length; i++) {
    var _class = "btn btn-default list_each"
    if(list[i].select) {
      _class = "btn btn-success list_each"
      select_list.push(list[i])
    }
    var node = "<button type='button' data-index='"+i+"' class='"+_class+"'>"+list[i].label+"</button>"
    $('#list_box').append(node)
  }

  $('.list_each').bind("click", _eachClick(list))

  if(select_list.length>0) {
    creatSelectList(select_list)
  } else {
    $('#list_box_choose').empty()
  }
}

function _eachClick (list){
  var new_list = list
  return function() {
    var index = $(this).data(index).index
    for (var i = 0; i < new_list.length; i++) {
      if(i==index) {
        if(new_list[i].select) {
          new_list[i].select = false
        } else {
          new_list[i].select = true
        }
      }
    }
    creatList(new_list)
  }
}

function creatSelectList (select_list){
  $('#list_box_choose').empty()
  for (var i = 0; i < select_list.length; i++) {
    var node = "<button type='button' class='btn btn-default'>"+select_list[i].label+"</button>"
    $('#list_box_choose').append(node)
  }
  var put = ["list_box_choose"]
  sortTable(put)
}
